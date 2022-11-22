import './App.css';

import {useEffect, useRef, useMemo} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {AsciiEffect} from 'three-stdlib'

function Torusknot(props) {
    const ref = useRef()
    useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta / 2))
    return (<mesh {...props} ref={ref}>
        <torusKnotGeometry args={[2, 0.3, 149, 32]}/>
        <meshStandardMaterial color="orange"/>
    </mesh>)
}


let header, hr, l;
let sorohimm_big = `

░█▀▀▀█ ░█▀▀▀█ ░█▀▀█ ░█▀▀▀█ ░█─░█ ▀█▀ ░█▀▄▀█ ░█▀▄▀█ 
─▀▀▀▄▄ ░█──░█ ░█▄▄▀ ░█──░█ ░█▀▀█ ░█─ ░█░█░█ ░█░█░█ 
░█▄▄▄█ ░█▄▄▄█ ░█─░█ ░█▄▄▄█ ░█─░█ ▄█▄ ░█──░█ ░█──░█

`

let sorohimm_small = '<h1>SOROHIMM</h1>'

function App() {
    if (window.innerWidth >= 450) {
        header = sorohimm_big
        hr = '-'.repeat(60)
        l = ' '.repeat(35)
    } else {
        header = sorohimm_small
        hr = '-'.repeat(window.innerWidth / 15)
        l = ''
    }

    return (<main>
        <section>
            <page>
                <header>
                        <pre><h>{header}</h>
                            {l}</pre>
                    <p><b id="online">This is my CV in free form :)</b></p>
                </header>
                <p className='line'>{hr}</p>
                <main>
                    <b>
                        <h1>Mashir Vladimir Nikolaevich</h1>
                        <b>
                            [<a href="https://t.me/himmzso" target="_blank" rel="noreferrer">Telegram</a>]
                            [<a href="https://github.com/sorohimm" target="_blank" rel="noreferrer">Github</a>]
                            [<a href="mailto:sorohimm@gmail.com">Email</a>]
                        </b>
                    </b>

                    <p>Hi, this page was created so that before our acquaintance you already had a little idea about
                        me and what I was doing or am doing now. Below I briefly described what I used to do and
                        what I am doing now, as well as about the technology stack with which I work.
                        <br/>
                        First of all I want to say that I'm a Golang developer for 2+ years,it's not much, but I
                        really love this! I have been doing production development on Go
                        since 2020, in addition, I have a small background in C++.</p>
                    <p>So let me tell you briefly about my work experience:
                        <p>
                            • Nov 2022 - present
                            <br></br>
                            <a href="https://nexign.com/" target="_blank" rel="noreferrer">Nexign JSC.</a>
                            &nbsp; ⬅️ I'm here now and I'll tell you how things are going a little later :)
                        </p>

                        <p>
                            • Sep 2021 — Nov 2022
                            <br></br>
                            <a href="https://www.digitalms.ru/" target="_blank" rel="noreferrer">Digital Medical
                                Services Ltd.</a>
                            &nbsp; Well, in this company I was engaged in localization of international projects in
                            the field of medicine for users from the Russian Federation, and also developed data
                            processing services from external systems.
                        </p>
                        <p>
                            • Feb 2021 — Sep 2021
                            <br></br>
                            <a href="https://bitop.bmstu.ru/" target="_blank" rel="noreferrer">Bitop BMSTU.</a>
                            &nbsp; It was a small student organization in which I started my journey not only as a
                            Golang developer, but also as a software engineer in general. Here I was developing a
                            backend for a mobile application for Bauman Moscow State
                            Technical University. The application is a service for students with a schedule of
                            classes, viewing grades, homework, university news, and so on.
                        </p>
                    </p>

                    <br></br>
                    <p>Some of my hard skills🦾
                        <pre>{`
                            {
                                "languages":          ["Golang", "C++", "SQL"],
                                "api":                ["REST", "gRPC", "GraphQL"],
                                "tests":              ["gomock, gotest"],
                                "databases":          ["PostgreSQL, MongoDB, Neo4j"],
                                "brokers":            ["Apache Kafka", "NATS Streaming"],
                                "technologies":       ["Docker", "Prometheus", "git"],
                                "ultimate_abilities": ["googling"]
                            }`}
                        </pre>
                    </p>
                </main>
                <p className='line'>{hr}</p>
                <footer>
                    <p> More links:<br/>
                        [<a href="https://github.com/sorohimm/cv" target="_blank" rel="noreferrer">PAGE SOURCES</a>]
                    </p>
                </footer>
                <p className='line'>{hr}</p>
                <footer>
                    <p>Made by <a href="https://github.com/sorohimm" target="_blank" rel="noreferrer">sorohimm</a></p>
                </footer>
            </page>
        </section>
        <Canvas>
            <color attach="background" args={['black']}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
            <pointLight position={[-10, -10, -10]}/>
            <Torusknot/>
            <AsciiRenderer invert/>
        </Canvas>
    </main>);
}

function AsciiRenderer({renderIndex = 2, characters = ' .:-+*=&$@#', ...options}) {
    // Reactive state
    const {size, gl, scene, camera} = useThree()

    // Create effect
    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, options)
        effect.domElement.style.position = 'fixed'
        effect.domElement.style.top = '0px'
        effect.domElement.style.left = '0px'
        effect.domElement.style.right = '0px'
        effect.domElement.style.bottom = '0px'
        effect.domElement.style.color = '#272822'
        effect.domElement.style.backgroundColor = 'black'
        effect.domElement.style.pointerEvents = 'none'
        return effect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characters, options.invert])

    // Append on mount, remove on unmount
    useEffect(() => {
        gl.domElement.parentNode.appendChild(effect.domElement)
        return () => gl.domElement.parentNode.removeChild(effect.domElement)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effect])

    //Set size
    useEffect(() => {
        effect.setSize(size.width, size.height)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effect, size])

    // Take over render-loop (that is what the index is for)
    useFrame((state) => {
        effect.render(scene, camera)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, renderIndex)

    // This component returns nothing, it has no view, it is a purely logical
}

export default App;

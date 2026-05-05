import { utilService } from '../services/util.service.js'
import { useRef } from 'react'

export function About() {
    const titleRef = useRef()

    return (
        <section className="about">
            <h1 ref={titleRef}>About toys and us...</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>
            <button onClick={() => {
                utilService.animateCSS(titleRef.current)
            }}>Animate</button>
        </section>
    )
}
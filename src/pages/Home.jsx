import { ToggleButton } from "../cmps/ToggleButton.jsx"

import { useState } from 'react'

const toyImg = '/Buzz-Lightyear-PNG-File.webp'

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Toy's R Us! 👀</h1>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src={toyImg} alt="" />}
        </section>
    )
}
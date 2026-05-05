import { ToggleButton } from "../cmps/ToggleButton.jsx"

import { useState } from 'react'

const toyURL = 'https://static.wikia.nocookie.net/charactercommunity/images/2/28/Buzz-Lightyear-PNG-File.png/revision/latest?cb=20210602160422'

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home">
            <h1>Toy's R Us! 👀</h1>
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src={toyURL} alt="" />}
        </section>
    )
}
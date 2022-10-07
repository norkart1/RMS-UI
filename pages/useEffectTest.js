import React, { useEffect, useState } from 'react'
import gsap from "gsap";

function UseEffectTest() {
    const [count, setcount] = useState(0)
    useEffect(() => {
        gsap.fromTo('#count', {
            duration: 0,
            opacity: 0,
        }, {
            duration: 1,
            opacity: 1,
        })
        console.log('mounting ' + count);

        return () => {
            console.log('clean up ' + count); //occurs ones

        }
    }, [count])

    return (
        <div style={{ fontSize: '5rem', textAlign: 'center' }}>
            <button onClick={() => setcount(count + 1)}>+</button>
            <h1 id='count'>{count}</h1>

        </div>
    )
}

export default UseEffectTest
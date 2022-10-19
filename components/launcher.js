import React, { useState } from 'react'
import styles from '../styles/component/comp_launcher.module.css'

function Launcher() {
  const [islaunched , setislaunched] = useState(false)
  return (
    <div>
        <div className={`${styles.cover} ${ islaunched && styles.launched}`} 
        onTransitionEnd={(e) => e.target.classList.add(styles.hide)}
        >
          <div>
            <button onClick={()=> setislaunched(true)}>LAUNCH <br /> NOW</button>
          </div>
        </div>
    </div>
  )
}

export default Launcher
import React, { useEffect, useState } from 'react'
import styles from '../styles/portals/showMessage.module.css'


export default function showMessage({ status = 'failed', isShown = false, msgText = ['txt'], msgHead = 'head' }) {
// const [isShow, setIsShow] = useState(isShown)


  return (
    <div className={`${styles.msgBox} ${isShown ? styles.shown : styles.hidden}`} id='msgShower' status={status}>
      <h3 className={styles.msgHead}>{msgHead}</h3>
      {typeof msgText === 'string' ?
        <p>{msgText}</p>
        :
        <ul>
          {msgText.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      }
    </div>
  )
}


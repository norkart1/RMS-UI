import React from 'react'
import styles from '../styles/portals/showMessage.module.css'


export default function showMessage({ status = 'normal', isShown = true, msgText = 'New user added Successfully..!' }) {

    return (
        <div className={`${styles.msgBox} ${isShown ? styles.shown : styles.hidden}`} status={status}>
            <p>{msgText}</p>
        </div>
    )
}


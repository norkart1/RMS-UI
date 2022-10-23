import React from 'react'
import styles from '../styles/portals/showMessage.module.css'


export default function showMessage({ status = 'normal', isShown = true, msgText = 'here is the message'  }) {

    return (
        <div className={`${styles.msgBox} ${isShown ? styles.shown : styles.hidden}`} status={status}>
            <p>{msgText}</p>
        </div>
    )
}


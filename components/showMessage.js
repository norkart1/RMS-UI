import React from 'react'
import styles from '../styles/portals/showMessage.module.css'


export default function showMessage() {
    return (
        <div className={styles.msgBox}>
            <p className={styles.msg}>New user added Successfully..!</p>
        </div>
    )
}


import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/downloads.module.css"
import Filesvg from "../public/assets/files.svg"

function Downloads() {
    return (
        <Layout title='Downloads'>
            <section className={styles.downloads}>
                <div className={`${styles.container} container `}>
                    <div className={styles.hrLine}></div>
                    <h3>General</h3>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.title}>
                                <p>By low<br/> Sibaq '22<br/> Non NIICS</p>
                            </div>
                            <p className={styles.date}>12/07/2022, 02:00 pm</p>
                            <div className={styles.fileImg}>
                                <Filesvg className={styles.svg}/>
                            </div>
                            <p className={styles.fileType}>PDF</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Downloads
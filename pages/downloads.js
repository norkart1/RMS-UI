import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/downloads.module.css"
import Filesvg from "../public/assets/files.svg"
import Link from 'next/link'
import { useRouter } from 'next/router'

function Downloads() {
    const router = useRouter()
    return (
        <Layout title='Downloads'>
            <section className={styles.downloads}>
                <div className={`${styles.container} container `}>
                    <div className={styles.hrLine}></div>
                    <h3>General</h3>
                    <div className={styles.cards}>
                        <a
                            href="/pdf/BY-LAW.pdf"
                            alt="alt text"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Download FIle</a>
                        <div className={styles.card}     >
                            <div className={styles.title}>
                                <p>By low<br/> Sibaq '22<br/> Non NIICS</p>
                            </div>
                            <p className={styles.date}>12/07/2022, 02:00 pm</p>
                            <div className={styles.fileImg}>
                                <Filesvg className={styles.svg}/>
                            </div>
                            <p className={styles.fileType}>PDF</p>
                        </div>
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
                    <div className={styles.hrLine}></div>
                    <h3>NIICS</h3>
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
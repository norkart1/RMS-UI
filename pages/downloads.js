import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/downloads.module.css"
import Filesvg from "../public/assets/svg/files.svg"
import Downloadsvg from "../public/assets/svg/download.svg"
import Link from 'next/link'
import { useRouter } from 'next/router'

function Downloads() {
    const downloads = [
        {
            category: "general",
            files: [
                {
                    name: "Download 1",
                    link: "https://www.google.com",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
                {
                    name: "Download 2",
                    link: "https://www.google.com",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
            ]
        },
        {
            category: "NIICS",
            files: [
                {
                    name: "Download 1 for NIICS",
                    link: "https://www.google.com",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
                {
                    name: "Download 2",
                    link: "https://www.google.com",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
            ]
        }

    ]
    const router = useRouter()
    return (
        <Layout title='Downloads'>
            <section className={styles.downloads}>
                <div className={`${styles.container} container `}>
                    {
                        downloads.map((download, index) => (
                            <div className={styles.download_category} key={index}>
                                <h3>{download.category}</h3>
                                <div className={styles.hrLine}></div>
                                <div className={styles.cards}>
                                    {
                                        download.files.map((file, index) => (
                                            <div className={styles.card} key={index}>
                                                <div className={styles.title}>
                                                    {file.name}
                                                </div>
                                                <p className={styles.date}>{file.date}</p>
                                                <div className={styles.fileImg}>
                                                    <Filesvg className={styles.svg} />
                                                </div>
                                                <p className={styles.fileType}>{file.type}</p>
                                                <Downloadsvg className={styles.dlSvg} />
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>
        </Layout>
    )
}

export default Downloads
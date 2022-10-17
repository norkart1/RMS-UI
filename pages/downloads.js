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
                    name: "BY-LAW SIBĀQ",
                    link: "downloads/BY-LAW SIBĀQ.pdf",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
                {
                    name: "NIICS Bylaw last",
                    link: "downloads/NIICS Bylaw last.pdf",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
                {
                    name: "SIBAQ TIME LINE",
                    link: "downloads/SIBAQ TIME LINE.pdf",
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
                    name: "NIICS Bylaw last",
                    link: "downloads/NIICS Bylaw last.pdf",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
                {
                    name: "NIICS SIBĀQ22 TIME LINE",
                    link: "downloads/NIICS SIBĀQ22 TIME LINE.pdf",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
                {
                    name: "Sibaq NIICS Programme list",
                    link: "downloads/Sibaq NIICS Programme list.pdf",
                    size: "1.5 MB",
                    type: "PDF",
                    date: "2020-01-01",
                },
            ]
        }

    ]
    const router = useRouter();
    const onButtonClick = (url) => {
        // using Java Script method to get PDF file
        fetch(url).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'test.pdf';
                alink.click();
            })
        })
    }
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
                                                <div onClick={() => onButtonClick(file.link)} className={styles.dlBox}>
                                                    <Downloadsvg className={styles.dlSvg} />
                                                </div>
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
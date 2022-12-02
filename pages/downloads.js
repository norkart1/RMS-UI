import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/downloads.module.css"
import Filesvg from "/public/assets/svg/files.svg"
import Downloadsvg from "/public/assets/svg/download.svg"
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

function Downloads() {
    const downloads = [
      {
        category: "general",
        files: [
          {
            name: "SIBĀQ 2022 BY-LAW",
            link: "downloads/BY-LAW SIBĀQ.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-10-18",
          },
          {
            name: "SIBĀQ 2022 PROGRAM LIST",
            link: "downloads/Programme List.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-10-18",
          },
          {
            name: "SIBĀQ 2022 CONCEPT NOTE",
            link: "downloads/SIBĀQ 2022 CONCEPT NOTE.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-11-28",
          },
          {
            name: "SIBĀQ 2022 TIME LINE",
            link: "downloads/SIBAQ TIME LINE.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-10-18",
          },
        ],
      },
      {
        category: "NIICS",
        files: [
          {
            name: "SIBĀQ 2022 BY-LAW NIICS",
            link: "downloads/NIICS SIBAQ22 BY-LAW.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-11-28",
          },
          {
            name: "SIBĀQ 2022 PROGRAM LIST NIICS",
            link: "downloads/NIICS SIBAQ PROGRAM LIST.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-11-28",
          },
          {
            name: "SIBĀQ 2022 CONCEPT NOTE NIICS",
            link: "downloads/NIICS SIBAQ 22 CONCEPT NOTE.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-11-28",
          },
          {
            name: "SIBĀQ 2022 TIME LINE NIICS",
            link: "downloads/NIICS SIBĀQ22 TIME LINE.pdf",
            size: "1.5 MB",
            type: "PDF",
            date: "2022-10-18",
          },
        ],
      },
    ];
    const router = useRouter();
    const onButtonClick = (url, fileName) => {
        // using Java Script method to get PDF file
        fetch(url).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${fileName}.pdf`;
                alink.click();
            })
        })
    }
    return (
        <Layout title='Downloads'>
          <Head>
                <meta name="keywords" content="Sibaq, sibaq, sibaq-22 ,art fest ,sibaq.in , darul huda, " />
                <meta property="" />
                <meta name="author" content="Darul Huda Islamic University" />
                <meta property="og:url" content="https://www.sibaq.in" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="SIBAQ 2022 DOWNLOAD DOCUMENTS" />
                <meta property="og:image" content="/public/assets/sibaq-gears-up.jpg" />
                <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
         <title>SIBAQ 2022 | DOWNLOADS</title>
            </Head>
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
                                                <div onClick={() => onButtonClick(file.link, file.name)} className={styles.dlBox}>
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

// import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/component/comp_layout.module.css'
import Image from 'next/image'
import logo from '/public/assets/images/big_logo_.png'
import HomeMenu from '../components/homeMenu'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
import Navbar from './navbar'
function Layout({ children, title = '', showNavbar = true, showHeader = true, showFooter = true }) {
    const router = useRouter()
    return (
        <div>
            <Head> 
                <title>{"Sibaq " +title}</title>
            </Head>
            <meta name="keywords" content="Sibaq, sibaq, sibaq-22 ,art fest ,sibaq.in , darul huda, " />
            <meta property="" />
            <meta name="author" content="Darul Huda Islamic University" />
            <meta property="og:url" content="https://www.sibaq.in" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Sibaq" />

            <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
        <div className={styles.layout}>
            <header className={styles.header}>

                {showNavbar && <Navbar />}
                {showHeader &&  (
                    <div className={styles.afterNav}>
                        <div className={`${styles.container} container`}>

                            <div className={styles.logoImg}>
                                    <Image src={logo} layout='responsive' alt="sibaq 22 Logo"></Image>
                            </div>
                            <h2>{title}</h2>
                        </div>
                    </div>)}
            </header>
            <div className={styles.main}>
                {children}
            </div>
            {showFooter && <Footer />}

        </div>
        </div>
    )
}

export default Layout
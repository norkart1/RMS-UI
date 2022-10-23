
// import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/component/comp_layout.module.css'
import Image from 'next/image'
import logo from '../public/assets/images/big_logo_.png'
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
            <meta name="sibaq" content="  Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
            <link rel="icon" href="/public/assets/images/logo.png" />
        <div className={styles.layout}>
            <header className={styles.header}>

                {showNavbar && <Navbar />}
                {showHeader &&  (
                    <div className={styles.afterNav}>
                        <div className={`${styles.container} container`}>

                            <div className={styles.logoImg}>
                                    <Image src={logo} layout='responsive' alt="sibaq at 22 darul huda art fest"></Image>
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
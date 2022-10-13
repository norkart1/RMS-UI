import React, { useState } from 'react'
import styles from '../styles/component/comp_layout.module.css'
import ImgHome from '../public/assets/home.svg'
import Image from 'next/image'
import logo from '../public/assets/big_logo_.png'
import HomeMenu from '../components/homeMenu'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
function Layout({ children, title = `CURRENT PROGRAMMES` }) {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.bars} onClick={() => setIsMenuOpen(true)}>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </div>
                    {/* <Image src={imgHome} layout='responsive'></Image> */}
                    <ImgHome className={styles.btnHomeImg} onClick={() => router.push('/')}></ImgHome>
                    <div className='flex-grow'></div>
                    <h1 className={styles.sibaq} onClick={() => router.push('/')}>SIBAQ 2022</h1>
                    <div className='flex-grow'></div>
                    <button className={styles.btnLogin} onClick={() => router.push('/auth/login')}>login</button>
                </nav>
                <div className={styles.afterNav}>
                    <div className={`${styles.container} container`}>
                        <div></div>
                        <div className={styles.logoImg}>
                            <Image src={logo} layout='responsive'></Image>
                        </div>
                        <h2>{title}</h2>
                    </div>
                </div>
            </header>
            <HomeMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {children}
            <Footer />
        </>
    )
}

export default Layout
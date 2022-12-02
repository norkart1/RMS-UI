import React, { useState } from 'react'
import styles from '../styles/component/comp_Navbar.module.css'
import ImgHome from '/public/assets/svg/home.svg'
import HomeMenu from './homeMenu'
import { useRouter } from 'next/router'


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    return (
        <div className={styles.main}>
            <nav className={styles.nav}>
                <div className={styles.bars} onClick={() => setIsMenuOpen(true)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <ImgHome className={styles.btnHomeImg} onClick={() => router.push('/')}></ImgHome>
                <div className='flex-grow'></div>
                <h1 className={styles.sibaq} onClick={() => router.push('/')}>SIBAQ 2022</h1>
                <div className='flex-grow'></div>
                <button className={styles.btnLogin} onClick={() => router.push('/auth/login')}>login</button>

            </nav>
             <HomeMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

    )
}

export default Navbar
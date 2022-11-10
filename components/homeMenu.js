import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from "../styles/component/comp_homeMenu.module.css";
import Angle from '/public/assets/svg/angle-left.svg'
import logo_rounded from '/public/assets/images/logo_rounded.png'
import { useRouter } from 'next/router';


function HomeMenu({ isMenuOpen, setIsMenuOpen }) {
  const menu_items = [
    { name: "Home", link: "/", },
    { name: "Feeds", link: "/feeds", },
    { name: "Explore", link: "/explore", },
    { name: "Downloads", link: "/downloads", },


  ]
  const router = useRouter()
  return (
    <div>
      <menu className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ''}`} >
        <Angle className={styles.BtnMenuClose} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <div className={styles.divSibaq}>
          <div className={styles.divImgSibaq}>
            <Image className={styles.imgSibaqLogo} src={logo_rounded} layout='responsive' alt="sibaq 22 Log"></Image>
          </div>
          <h1>Sibaq 22</h1>
        </div>
        <ul>
          {menu_items.map((item, index) => (
            <li
              key={index}
              className={router.pathname === item.link ? styles.active : ''}
              onClick={() => {
                router.push(item.link);
                setIsMenuOpen(false)
              }}> <p> {item.name}</p></li>
          ))}
        </ul>
        <div className="flex-grow"></div>

        <button onClick={() => router.push('/auth/login')} className={styles.BtnSignIn}>Sign in</button>
      </menu>
      <div className={isMenuOpen ? styles.shadow : ''} onClick={() => setIsMenuOpen(false)}></div>
    </div>
  )
}

export default HomeMenu
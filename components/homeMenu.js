import Image from 'next/image';
import React, { useState } from 'react'
import styles from "../styles/component/comp_homeMenu.module.css";
import Angle from '../public/assets/angle-up.svg'
import { useRouter } from 'next/router';



function HomeMenu({ isMenuOpen, setIsMenuOpen }) {
  const menu_items = [
    { name: "Home", link: "/" },
    { name: "News", link: "/news" },
    { name: "Our hosts", link: "/hosts" },
    { name: "Gallery", link: "/gallery" },
    { name: "downloads", link: "/downloads" },
  ]
  const router = useRouter()

  return (
    <>
      <menu className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ''}`} >
          {/* <Image src={angle} layout='fill'></Image> */}
          <Angle className={styles.BtnMenuClose} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <ul>
          {menu_items.map((item, index) => (
            <li 
            className={router.pathname === item.link ? styles.active : ''}
            onClick={() => {
              router.push(item.link);
              setIsMenuOpen(false)
            }}>{item.name}</li>
          ))}
        </ul>
        <button onClick={() => router.push('/auth/login')} className={styles.BtnSignIn}>Sign in</button>
      </menu>
      <div className={isMenuOpen ? styles.shadow : ''} onClick={() => setIsMenuOpen(false)}></div>
    </>
  )
}

export default HomeMenu
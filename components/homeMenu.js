import Image from 'next/image';
import React, { useState } from 'react'
import styles from "../styles/component/comp_homeMenu.module.css"; 
import angle from '../public/assets/angle-up.svg'
import { useRouter } from 'next/router';



function HomeMenu({ isMenuOpen,  setIsMenuOpen}) {
  const router = useRouter()
  const goto = (url)=> {
    router.push(url); 
    setIsMenuOpen(false)
  }
  return (
    <>
      <menu className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ''}`} >
        <button className={styles.BtnMenuClose} onClick={() => setIsMenuOpen(!isMenuOpen)} >
          <Image src={angle} layout='fill'></Image>
        </button>
        <ul>
          <li onClick={()=> goto('/')}>HOME</li>
          <li onClick={()=> goto('/PROGRAMS')}>PROGRAMS</li>
          <li onClick={()=> goto('/RESULTS')}>RESULTS</li>
          <li onClick={()=> goto('/SCHEDULE')}>SCHEDULE</li>
          <li onClick={()=> goto('/LIVE')}>LIVE</li>
          <li onClick={()=> goto('/ABOUT')}>ABOUT</li>
        </ul>
        <button onClick={()=>router.push('/auth/login')} className={styles.BtnSignIn}>Sign in</button>
      </menu>
      <div className={isMenuOpen ? styles.shadow : ''} onClick={() => setIsMenuOpen(false)}></div>
    </>
  )
}

export default HomeMenu
import React from 'react'
import { useState } from 'react'
import HomeMenu from '../../components/homeMenu'
import ImgHome from '../../public/assets/svg/home.svg'
import ImgClose from '../../public/assets/svg/close.svg'
import Layout from '../../components/layout'
import s from '../../styles/public_portal/layout.module.css'
import { useRouter } from 'next/router'
function PublicPortalLayout({ children, openedTabName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPortalMenuOpen, setIsPortalMenuOpen] = useState(true)
  const menuItems = [
    {
      id: 1,
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      id: 2,
      name: `Elimination \n Results`,
      link: '/dashboard'
    },
    {
      id: 3,
      name: 'Schedule',
      link: '/dashboard'
    }
  ]

  const router = useRouter()
  return (
    <div className={s.portal}>
      <HomeMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <aside className={`${s.sideMenu} ${isPortalMenuOpen ? s.isOpen : ''}`} >
        <div className={s.showMenu} onClick={() => setIsPortalMenuOpen(true)}>
          <div className={s.bar}></div>
          <div className={s.bar}></div>
          <div className={s.bar}></div>
        </div>
        <div className={s.buttons}>
          <div className={s.bars} onClick={() => setIsMenuOpen(true)}>
            <div className={s.bar}></div>
            <div className={s.bar}></div>
            <div className={s.bar}></div>
          </div>
          <ImgHome className={s.btnHomeImg} width={40} onClick={() => router.push('/')}></ImgHome>
          <div className="flex-grow"></div>
          <ImgClose className={s.btnClose} onClick={() => setIsPortalMenuOpen(false)}></ImgClose>

          <div className={s.close}></div>
        </div>
        <p className={s.sibaqShadowText}>SIBAQ 2022</p>


        <div className={s.tabs}>
          <ul>
            {
              menuItems.map((item, index) =>
                <li className={openedTabName.toLowerCase() == item.name.toLowerCase() ? s.active : ''} onClick={() => router.push(item.link)} key={index}>{item.name}</li>
              )
            }
          </ul>

        </div>
      </aside>
      <div className={s.container}>
        {children}
      </div>
    </div>
  )
}

export default PublicPortalLayout
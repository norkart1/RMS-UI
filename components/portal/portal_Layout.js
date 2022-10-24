import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import styles from '../../styles/portals/layout.module.css'
import pageStyles from '../../styles/portals/page_global.module.css'
import Image from 'next/image'
import Angle from '../../public/assets/svg/angle-up.svg'
import Lock from '../../public/assets/svg/lock.svg'
import logoRounded from '../../public/assets/images/logo_rounded.png'
import userType_Tabs from '../../helpers/userType_Tabs';
import { logout } from '../../helpers/auth'
import {logout ,refreshTokens} from '../../helpers/auth'
import ShowMessage from '../showMessage';
import { useLocalStorage } from '../../helpers/functions'

function Portal_Layout({ children, activeTabName, activeChildTabName = '', userType = '' }) {
  refreshTokens()

  const tabs = userType_Tabs.find(user => user.name.toLowerCase() === userType.toLowerCase()).tabs;
  const [userName, setUserName] = useState('')
  const handleCatChange = async (e) => {
    if (localStorage.getItem('sessionID') != e.target.value) {
      window.localStorage.setItem('sessionID', e.target.value)
      window.location.reload()
    }
  }

  // const [showMessage, setShowMessage] = useLocalStorage('showMessage', { status: 'normal', isShown: false, msgText: 'here is the message' })

  let [expandedTabName, setExpandedTabName] = useState(activeTabName)
  const router = useRouter()
  useEffect(() => {
    //get userName from local storage
    localStorage.setItem('userName', 'NRIC Chamakkala')
    setUserName(localStorage.getItem('userName'));
  }, [])

  // console.log('Angle');
  return (
    <main className={styles.background} >
      {/* <ShowMessage msgText=  /> */}
      <div className={styles.container}>
        <div className={styles.sidebar}>
          {/* <div > */}
          <select name="sessionID" id="sessionIDChanger" className={styles.sessionSelect} onChange={(e) => handleCatChange(e)}>
            <option value='1'>GENERAL</option>
            <option value='2'>NIICS</option>
          </select>
          {/* </div> */}
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.logoDiv}>
              <Image src={logoRounded} layout='responsive'></Image>
            </div>
            <h1>Sibaq '22</h1>
            <h2>{userType.toUpperCase()} PANEL</h2>
            {userType.toLowerCase() != 'admin' && <h3>{userName}</h3>}
          </div>
          {/* TABS */}
          <div className={styles.tabs}>
            {tabs.map((tab,index) => (
              // TAB
              tab.isVisible && <div className={styles.wrapper} key={index}>
                <div
                  className={`${styles.tab} ${activeTabName.toLowerCase() === tab.name.toLowerCase() ? styles.active : ''} `}
                  key={tab.id}
                  onClick={() => {
                    expandedTabName != tab.name ? setExpandedTabName(tab.name) : setExpandedTabName('')
                    tab.children || router.push(tab.link)
                  }}
                >
                  <div className={styles.tabIcon}>
                    <Image src={tab.icon} height={20} width={20} />
                  </div>
                  <div className={styles.tabName}>{tab.name}</div>
                  {tab.children &&
                    <Angle className={`${expandedTabName === tab.name ? styles.btnCollapse : styles.btnExpand} ${styles.btnAngle}`}
                      onClick={() => expandedTabName != tab.name ? setExpandedTabName(tab.name) : setExpandedTabName('')}
                    />
                  }
                </div>
                {
                  // CHILDREN
                  tab.children && <div className={`${styles.children} ${expandedTabName == tab.name ? styles.isExpanded : styles.isCollapsed}`}>
                    {tab.children.map((child) => (
                      // CHILD
                      <div className={`${styles.child}  ${activeChildTabName.toLowerCase() === child.name.toLowerCase() && activeTabName.toLowerCase() === tab.name.toLowerCase() ? styles.active : ''}`}
                        onClick={() => router.push(child.link)}
                        key={child.id}
                      >
                        <Angle className={styles.angle} />
                        <div className={styles.childName}>{child.name}</div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            ))}
          </div>
          {/* LOGOUT */}
          <div className={styles.logout}
            onClick={() => logout()}  //add logout functionality here
          >
            <Lock className={styles.lock} height={23} width={23} />
            <p>LOGOUT</p>
          </div>
          {/* PAGE */}
        </div>
        <div className={pageStyles.page}>
          {children}
        </div>
      </div>
    </main >
  )
}

export default Portal_Layout
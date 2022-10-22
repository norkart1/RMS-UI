import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import styles from '../../styles/portals/layout.module.css'
import pageStyles from '../../styles/portals/page_global.module.css'
import Image from 'next/image'
import Angle from '../../public/assets/svg/angle-up.svg'
import Lock from '../../public/assets/svg/lock.svg'
import logoRounded from '../../public/assets/images/logo_rounded.png'
import showMessage from '../showMessage';

function Portal_Layout({ children, activeTabName, activeChildTabName = '', userType = '' }) {
  const iconUrl = '/assets/png/dashboard.png'
  const userTypes = [
    {
      id: 1,
      name: 'Admin',
      path: '/admin',
      tabs: [
        {
          id: 1,
          name: 'Dashboard',
          icon: '/assets/png/dashboard.png',
          link: '/admin/dashboard',
          isVisible: true,
        },
        {
          id: 2,
          name: 'Institutes',
          icon: '/assets/png/institutes.png',
          link: '/admin/institutes',
          isVisible: true,
          children: [
            {
              id: 1,
              name: 'Manage insitutes',
              link: '/admin/institute/manage',
              isVisible: true,
            },
            {
              id: 2,
              name: 'Coordinators',
              link: '/admin/institute/coordinators',
              isVisible: true,
            },
            {
              id: 3,
              name: 'Candidates',
              link: '/admin/institute/candidates',
              isVisible: true,
            },
          ]
        },
        {
          id: 3,
          name: 'Programs',
          icon: '/assets/png/programs.png',
          link: '/admin/programs',
          isVisible: true,
          children: [
            {
              id: 1,
              name: 'Program registration',
              link: '/admin/institute/Coordinators',
              isVisible: true,
            },
            {
              id: 2,
              name: 'Candidates',
              link: '/admin/institute/candidates',
              isVisible: true,
            },
          ]
        },
        {
          id: 4,
          name: 'Scoreboard',
          icon: '/assets/png/scoreboard.png',
          link: '/admin/scoreboard',
          isVisible: true,
        },
        {
          id: 5,
          name: 'Utilities',
          icon: '/assets/png/utilities.png',
          link: '/admin/utilities',
          isVisible: true,
        },
        {
          id: 6,
          name: 'Controllers',
          icon: '/assets/png/controllers.png',
          link: '/admin/controller',
          isVisible: true,
        },
        {
          id: 7,
          name: 'Settings',
          icon: '/assets/png/settings.png',
          link: '/admin/settings',
          isVisible: true,
        },

      ]
    },
    {
      name: 'Institution',
      path: '/institution',
      tabs: [
        {
          id: 1,
          name: 'Dashboard',
          icon: '/assets/png/dashboard.png',
          link: '/institution/dashboard',
          isVisible: true,
        },
        {
          id: 2,
          name: 'Settings',
          icon: '/assets/png/settings.png',
          link: '/institution/settings',
          isVisible: true,
        },
      ]
    }]
  const userType_Tabs = userTypes.find(user => user.name.toLowerCase() === userType.toLowerCase()).tabs;
  const [userName, setUserName] = useState('')

  let [expandedTabName, setExpandedTabName] = useState(activeTabName)
  const router = useRouter()
  useEffect(() => {
    //get userName from local storage
    localStorage.setItem('userName', 'NRIC Chamakkala')
    setUserName(localStorage.getItem('userName'));
  }, [])

  console.log('Angle');
  return (
    <main className={styles.background} >
      <showMessage/>
      <div className={styles.container}>
        <div className={styles.sidebar}>
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
            {userType_Tabs.map((tab, index = tab.id) => (
              // TAB
              tab.isVisible && <div className={styles.wrapper}>
                <div
                  className={`${styles.tab} ${activeTabName.toLowerCase() === tab.name.toLowerCase() ? styles.active : ''} `}
                  key={index}
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
                    {tab.children.map((child, index) => (
                      // CHILD
                      <div className={`${styles.child}  ${activeChildTabName.toLowerCase() === child.name.toLowerCase() && activeTabName.toLowerCase() === tab.name.toLowerCase() ? styles.active : ''}`}
                        onClick={() => router.push(child.link)}
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
            onClick={() => router.push('/login')}  //add logout functionality here
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
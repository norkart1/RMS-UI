import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from '../styles/portals/layout.module.css'
import Image from 'next/image'
import Angle from '../public/assets/svg/angle-up.svg'
import Lock from '../public/assets/svg/lock.svg'
import logoRounded from '../public/assets/images/logo_rounded.png'

function Portal_Layout({ children }) {
  const iconUrl = '/assets/svg/dashboard.svg'
  const userTypes = [
    {
      id: 1,
      name: 'Admin',
      path: '/admin',
      tabs: [
        {
          name: 'Dashboard',
          // icon: require(iconUrl).default,
          link: '/admin/dashboard',
          isVisible: true,
        },
        {
          name: 'Institutes',
          // icon: require(iconUrl).default ,
          link: '/admin/institutes',
          isVisible: true,
          children: [
            {
              name: 'Coordinators',
              link: '/admin/institute/Coordinators',
              isVisible: true,
            },
            {
              name: 'Candidates',
              link: '/admin/institute/candidates',
              isVisible: true,
            },
          ]
        },
        {
          id: 2,
          name: 'Programs',
          // icon: require(iconUrl).default ,
          link: '/admin/programs',
          isVisible: true,
          children: [
            {
              name: 'Register programs for each candidate',
              link: '/admin/institute/Coordinators',
              isVisible: true,
            },
            {
              name: 'Candidates',
              link: '/admin/institute/candidates',
              isVisible: true,
            },
          ]
        },
        {
          id: 3,
          name: 'Scoreboard',
          // icon: require(iconUrl).default ,
          link: '/admin/scoreboard',
          isVisible: true,
        },
        {
          id: 4,
          name: 'Utilities',
          // icon: require(iconUrl).default ,
          link: '/admin/utilities',
          isVisible: true,
        },
        {
          id: 5,
          name: 'Controller',
          // icon: require(iconUrl).default ,
          link: '/admin/controller',
          isVisible: true,
        },
        {
          id: 6,
          name: 'Settings',
          // icon: require(iconUrl).default ,
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
          name: 'Dashboard',
          // icon: require(iconUrl).default ,
          link: '/institution/dashboard',
          isVisible: true,
        },
        {
          name: 'Settings',
          // icon: require(iconUrl).default ,
          link: '/institution/settings',
          isVisible: true,
        },
      ]
    }]
  const current_User = 'admin';
  const current_User_Tabs = userTypes.find(user => user.name.toLowerCase() === current_User.toLowerCase()).tabs;
  const [expandedTabId, setExpandedTabId] = useState(0)
  const [activeTab, setActiveTab] = useState()

  const router = useRouter()

  console.log('Angle');
  console.log(Angle);
  console.log('Angle with require');
  // console.log(require('../../public/assets/svg/angle-up.svg'));
  return (
    <main className={styles.background} >
      <section className={styles.container}>
        <div className={styles.sidebar}>
          {/* HEADER */}
          <div className={styles.header}>
            <div className={styles.logoDiv}>
              <Image src={logoRounded} layout='responsive'></Image>
            </div>
            <h1>Sibaq '22</h1>
            <h2>ADMIN PANEL</h2>
          </div>
          {/* TABS */}
          <div className={styles.tabs}>
            {current_User_Tabs.map((tab, index = tab.id) => (
              // TAB
               tab.isVisible && <div className={styles.wrapper}>
                <div className={`${styles.tab} ${tab.link === router.pathname ? styles.active : ''} ${tab.children ? styles.hasChildren : ''} `}
                  key={index}
                  onClick={() => expandedTabId != tab.id ? setExpandedTabId(tab.id): setExpandedTabId(0) }
                  // onClick={() => tab.children ? setExpandedTabId(tab.id) : router.push(tab.link)}
                  >
                  <div className={styles.tabIcon}>
                    {/* <Image src={tab.icon} alt={tab.name} /> //add svg icons here */}
                  </div>
                  <div className={styles.tabName}>{tab.name}</div>
                  {tab.children &&
                    <Angle className={`${expandedTabId === tab.id ? styles.btnCollapse : styles.btnExpand} ${styles.btnAngle}`}
                      onClick={() => expandedTabId != tab.id ? setExpandedTabId(tab.id): setExpandedTabId(0) }
                    />
                  }
                </div>


                {
                  // CHILDREN
                  tab.children && <div className={`${styles.children} ${expandedTabId === tab.id ? styles.isExpanded : styles.isCollapsed}`}>
                    {tab.children.map((child, index) => (
                      // CHILD
                      <div className={styles.child}>
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
        </div>
        {/* PAGE */}
        <div className={styles.page}>
          {children}
        </div>
      </section>
    </main >
  )
}

export default Portal_Layout
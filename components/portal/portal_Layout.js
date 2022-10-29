import { useRouter } from 'next/router';
import React, { useState, useEffect, createContext } from 'react'
import styles from '../../styles/portals/layout.module.css'
import pageStyles from '../../styles/portals/page_global.module.css'
import Image from 'next/image'
import Angle from '../../public/assets/svg/angle-up.svg'
import Lock from '../../public/assets/svg/lock.svg'
import logoRounded from '../../public/assets/images/logo_rounded.png'
import userType_Tabs from '../../helpers/userType_Tabs';
import baseApi from '../../api/baseApi';
import { logout, refreshToken } from '../../helpers/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGet } from '../../helpers/functions';

const UserContext = createContext();
function Portal_Layout({ children, activeTabName, activeChildTabName = '', userType = '', msgText = '', msgType = '' }) {

    const router = useRouter()
    const [selectedSessionID, setSelectedSessionID] = useState('')
    useEffect(() => {
        refreshToken();

        
    }, [])

    let userDetails
    userDetails = useGet('/coordinator/me', false, false, false, (err) => { }, false)[0]


    useEffect(() => {
        if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
            router.push('/login')

        }
        else {
            //console.log('there is a token')
        }
    }, [router])

    useEffect(() => {
        setExpandedTabName(localStorage.getItem('expandedTabName') || '')
        if(userType.toLowerCase() == 'admin'){
        baseApi.get('/admin/sessions')
            .then((res) => {
                setSessions(res.data.data)
                if (localStorage.getItem('sessionID') === undefined || localStorage.getItem('sessionID') === null || localStorage.getItem('sessionID') === '') localStorage.setItem('sessionID', `${res.data.data[0].id}`)
            })
            .catch((err) => {
               
                if (err.message == "Network Error") toast.error('Check your internet connectivity, or the server is down.')
            })
         
    }
    }, [router])
    const [expandedTabName, setExpandedTabName] = useState(activeTabName)

    useEffect(() => {
        setSelectedSessionID(localStorage.getItem('sessionID'))
        localStorage.setItem('expandedTabName', expandedTabName)
    }, [expandedTabName])



    const tabs = userType_Tabs.find(user => user.name.toLowerCase() === userType.toLowerCase()).tabs;
    const [userName, setUserName] = useState('')
    const [sessions, setSessions] = useState([])
    const handleSessionChange = async (e) => {
        localStorage.setItem('sessionID', e.target.value)
        window.location.reload()
        // }
    }



    useEffect(() => {
        localStorage.getItem('expandedTabName') && setExpandedTabName(localStorage.getItem('expandedTabName'))
        if (userType == 'admin') {
            const getSessions = async () => {
                const res = await baseApi.get('/admin/sessions',
                )
                const data = await res.data.data


                setSessions(data)
            }
            getSessions()
        }
        sessions.map((session) => {
            if (session.id == localStorage.getItem('sessionID')) {
                setUserName(session.name)
            }
        })
    }, [])

    useEffect(() => {
        window.activeTabName = activeTabName
    }, [activeTabName, sessions])



    return (
        <UserContext.Provider value={userDetails}>

            <main className={styles.background} id='totalPage' >
                <ToastContainer style={{ fontSize: '1.5rem' }}
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored" />
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        {/* <div > */}

                        {/* </div> */}
                        {/* HEADER */}
                        <div className={styles.header}>
                            <div className={styles.logoDiv}>
                                <Image src={logoRounded} layout='responsive' alt='sibaq logo'></Image>
                            </div>
                            <h1>Sibaq &apos;22</h1>
                            <h2>{userType.toUpperCase()} PANEL</h2>
                            {userType.toLowerCase() != 'admin' && userDetails != null && <h3>{userDetails.first_name} {userDetails.last_name}</h3>}
                            {userType.toLowerCase() == 'admin' &&
                                <select name="sessionID" id="sessionIDChanger" className={styles.sessionSelect}
                                    onChange={(e) => handleSessionChange(e)} value={selectedSessionID} >
                                    
                                    {sessions.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index} >{item.name} - {item.year}</option>
                                        )
                                    })}
                                </select>
                            }
                        </div>
                        {/* TABS */}
                        <div className={styles.tabs}>
                            {tabs.map((tab, index) => (
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
                                            <Image src={tab.icon} height={20} width={20} alt="tab icon" />
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
                                                    onClick={() => {
                                                        window.expandedTab = tab.name
                                                        router.push(child.link)
                                                    }}
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
        </UserContext.Provider>

    )
}


export default Portal_Layout
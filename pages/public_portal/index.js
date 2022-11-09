import { Router, useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import HomeMenu from '../../components/homeMenu'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/dashboard.module.css'
function PublicDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const instiTypes = [
    {
      id: 1,
      name: 'GENERAL',
      total_institutes: 28,
      total_candidates: 3128,
      total_programs: 216,
      female: 64,
      male: 3064,
    },
    {
      id: 2,
      name: 'NIICS',
      total_institutes: 8,
      total_candidates: 656,
      total_programs: 152,
      female: 0,
      male: 656,
    },
  ]
  const counts = [
    {
      id: 1,
      name: 'Institutes',
      count: 36,
    },
    {
      id: 2,
      name: 'Candidates',
      count: 3784,
    },
    {
      id: 3,
      name: 'Programs',
      count: 368,
    },
  ]
  const quickLinks = [
    {
      id: 1,
      name: 'Elimination Results',
      link: '/public_portal/elimination_results',
    },
    {
      id: 2,
      name: 'Schedules',
      link: '/public_portal/schedules',
    },
  ]
  //MAKE THIS LAYOUT
  return (
    <Layout openedTabName='dashboard'>
      <div className={s.container}>
        <div className={s.counts}>
          {counts.map((count, index) => (
            <div className={s.countItem} key={index}>
              <h2>{count.count}</h2>
              <h3>{count.name}</h3>
            </div>
          ))}
        </div>
        <div className={s.instituteTypes}>
          {instiTypes.map((type, index) => (
            <div className={s.instiItem} key={index}>
              <div className={s.header}>
                <h2>{type.name}</h2>
                <span className={s.line}></span>
              </div>
              <div className={s.body}>
                <h3>Total Institutes</h3>
                <p>{type.total_institutes}</p>
                <h3>Total Programs</h3>
                <p>{type.total_programs}</p>
                <h3>Total Candidates</h3>
                <p>{type.total_candidates}</p>
                <div className={s.genders}>
                  <h4>Male: {type.male}</h4>
                  <h4>Female: {type.female}</h4>
                </div>
                <div className={s.genderStatusBar}>
                  <div className={s.maleStatus} style={{width: `${100 * (type.male / type.total_candidates)}%`  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={s.quicklinkTotal}>
          <h2 className={s.quicklinkHeader}>QUICK LINKS</h2>
          <div className={s.quicklinks}>
            {quickLinks.map((link, index) => (
              <div className={s.quicklinkItem} key={index} onClick={()=> router.push(link.link)}>
                <p>{link.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default PublicDashboard
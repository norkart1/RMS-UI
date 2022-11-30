import React from 'react'
import FinalToppers from '../../components/FinalToppers'
import TopFiveInsti from '../../components/TopFiveInsti'
import s from '../../styles/public_portal/dashboard.module.css'
import Layout from '../../components/public_portal/Layout'


function Leaderboard() {
  return (
    <Layout openedTabName='leaderboard' style={{ background: 'linear-gradient(135deg, rgb(246 236 255) 10%, rgb(253 216 255 / 72%) 100%)' }}>
            <div className={s.box} style={{ paddingBottom: '0' }}>
        <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>LEADING FIVE INSTITUTES<br />GENERAL </h2>
        <TopFiveInsti />
      </div>
      <div className={s.box} style={{ paddingBottom: '0' }}>
        <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>LEADING FIVE INSTITUTES<br />NIICS </h2>
        <TopFiveInsti sessionID='2' />
      </div>
      <div className={s.box} style={{ paddingBottom: '0' }}>
        <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>CATEGORY BASED <br /> TOPPERS OF GENERAL</h2>

        <FinalToppers style={{}} />
      </div>
      <div className={s.box} style={{ paddingBottom: '0' }}>
        <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>CATEGORY BASED <br /> TOPPERS OF NIICS</h2>

        <FinalToppers style={{}} sessionId= '2' />
      </div>




    </Layout>
  )
}

export default Leaderboard

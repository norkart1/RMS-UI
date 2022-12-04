import React from 'react'
import FinalToppers from '../../components/FinalToppers'
import TopFiveInsti from '../../components/TopFiveInsti'
import s from '../../styles/public_portal/dashboard.module.css'
import Layout from '../../components/public_portal/Layout'
import Head from 'next/head'


function Leaderboard() {
  return (
    <div>
      <Head>
        <title>Sibaq</title>
        <meta name="keywords" content="Sibaq results, sibaq final results, sibaq 2022 " />
        <meta property="" />
        <meta name="author" content="Darul Huda Islamic University" />
        <meta property="og:url" content="https://sibaq.in/public_portal/final_results" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Results" />

        <meta name="og:decription" content="Final round results of SIBAQ 2022, National arts fest of Darul Huda Islamic University, Kerala. " />
        <title>SIBAQ 2022 RESULTS | FINAL</title>
        {/* <link rel="icon" href="/assets/images/logo.png" /> */}
      </Head>
      <Layout openedTabName='leaderboard' style={{ background: 'linear-gradient(135deg, rgb(246 236 255) 10%, rgb(253 216 255 / 72%) 100%)' }}>
      <div className={s.box} style={{ paddingBottom: '0' }}>
          <h2 style={{ padding: '1rem', color: '#656565', width: '100%', textAlign: 'center' }}>LEADING CATEGORY BASED <br /> TOPPERS OF GENERAL</h2>

          <FinalToppers style={{}} />
        </div>
        <div className={s.box} style={{ paddingBottom: '0' }}>
          <h2 style={{ padding: '1rem', color: '#656565', width: '100%', textAlign: 'center' }}>LEADING CATEGORY BASED <br /> TOPPERS OF NIICS</h2>

          <FinalToppers style={{}} sessionId='2' />
        </div>
        <div className={s.box} style={{ paddingBottom: '0' }}>
          <h2 style={{ padding: '1rem', color: '#656565', width: '100%', textAlign: 'center' }}>INSTITUTES TOTAL POINTS<br />GENERAL </h2>
          <TopFiveInsti count={30} />
        </div>
        <div className={s.box} style={{ paddingBottom: '0' }}>
          <h2 style={{ padding: '1rem', color: '#656565', width: '100%', textAlign: 'center' }}>INSTITUTES TOTAL POINTS<br />NIICS </h2>
          <TopFiveInsti sessionID='2'  count={30}/>
        </div>
        




      </Layout></div>
  )
}

export default Leaderboard

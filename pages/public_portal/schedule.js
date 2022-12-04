import Head from 'next/head'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/public_portal/Layout'
import Timeline from '../../components/schedule-timeline/timeline'
import { BaseApi, orderInChronologicalOrder } from '../../helpers/functions'
import schedule_sample from '../../helpers/schedule_sample.json'


function Schedule() {
  const days = [
    // { day: 'Day 1', date: '2022-11-30 00:00:00' },
    { day: 'Day 1', date: '2022-12-01 00:00:00' },
    { day: 'Day 2', date: '2022-12-02 00:00:00' },
    { day: 'Day 3', date: '2022-12-03 00:00:00' },
    { day: 'Day 4', date: '2022-12-04 00:00:00' },
    // { day: 'Day 5', date: '2022-12-05 00:00:00' },
  ]

  const venues = [
    { venue: 'Venue 1', name: 'Venue 1', type: 'stage' },
    { venue: 'Venue 2', name: 'Venue 2', type: 'stage' },
    { venue: 'Venue 3', name: 'Venue 3', type: 'stage' },
    { venue: 'Venue 4', name: 'Venue 4', type: 'stage' },
    { venue: 'Venue 5', name: 'Venue 5', type: 'stage' },
    { venue: 'Venue 6', name: 'Venue 6', type: 'stage' },
    { venue: 'Venue 7', name: 'Venue 7', type: 'stage' },
    { venue: 'Venue 8', name: 'Venue 8', type: 'non-stage' },
    { venue: 'Venue 9A', name: 'Venue 9A', type: 'non-stage' },
    { venue: 'Venue 9B', name: 'Venue 9B', type: 'non-stage' },
    { venue: 'Venue 10', name: 'Venue 10', type: 'stage' },
    { venue: 'Venue 11', name: 'Venue 11', type: 'stage' },
    { venue: 'Open', name: 'Open', type: 'non-stage' },
    { venue: 'Close', name: 'Close', type: 'stage' },
  ]
  // const data = [
  //   {
  //     id: 1,
  //     code: "BV1",
  //     category: "BIDAYA",
  //     name: "DICTIONARY MAKING ARB",
  //     date: "03-12-2022",
  //     s_time: "10:00 AM",
  //     e_time: "11:00 AM",
  //     venue: "Venue 1",
  //     duration: 30
  //   },
  //   {
  //     id: 1,
  //     code: "BV2",
  //     category: "BIDAYA",
  //     name: "DICTIONARY MAKING URD",
  //     date: "03-12-2022",
  //     s_time: "10:00 AM",
  //     e_time: "11:00 AM",
  //     venue: "Venue 2",
  //     duration: 30
  //   },
  // ]

  const data = schedule_sample

  const [scheduleData, setScheduleData] = useState([])
  useEffect(() => {
    BaseApi.get('public/programs/schedule').then(res => {
      setScheduleData(orderInChronologicalOrder( res.data.data,'s_time'))
   

    })
  }, [])

  return (
    <Layout openedTabName='schedule' style={{ overflow: 'hidden', background: '#f8f3fc' }}>
      <Head>
        <meta name="keywords" content="Sibaq 2022, program schedule, schedule, sibaq " />
        <meta name="author" content="Darul Huda Islamic University" />
        <meta property="og:url" content="https://sibaq.in/public_portal/schedule" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SIBAQ 2022 PROGRAM SCHEDULE" />
        <meta property="og:image" content="/public/assets/sibaq-gears-up.jpg" />
        <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
      </Head>
      <h1 style={{ margin: '1rem' }}>Program schedule</h1>
      {/* <Timeline data={scheduleData} days={days} venues={venues} /> */}
      <Timeline data={scheduleData} days={days} venues={venues} />
    </Layout>
  )
}

export default Schedule

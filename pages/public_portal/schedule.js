import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/public_portal/Layout'
import Timeline from '../../components/schedule-timeline/timeline'
import { BaseApi } from '../../helpers/functions'


function Schedule() {
  const days = [
    { day: 'Day 1', date: '30-11-2022'  },
    { day: 'Day 2', date: '01-12-2022'  },
    { day: 'Day 3', date: '02-12-2022'  },
    { day: 'Day 4', date: '03-12-2022'  },
    { day: 'Day 5', date: '04-12-2022'  },
    
  ]

  const venues = [
    { venue: 'Venue 1', name: 'Venue 1'  },
    { venue: 'Venue 2', name: 'Venue 2'  },
    { venue: 'Venue 3', name: 'Venue 3'  },
  ]
  const data = [
    {
      id: 1,
      code: "BV1",
      category: "BIDAYA",
      name: "DICTIONARY MAKING ARB",
      date: "03-12-2022",
      s_time: "10:00 AM",
      e_time: "11:00 AM",
      venue: "Venue 1",
      duration: 30
    },
    {
      id: 1,
      code: "BV2",
      category: "BIDAYA",
      name: "DICTIONARY MAKING URD",
      date: "03-12-2022",
      s_time: "10:00 AM",
      e_time: "11:00 AM",
      venue: "Venue 2",
      duration: 30
    },
  ]

  const [scheduleData, setScheduleData] = useState([])
  useEffect(() => {
    BaseApi.get('public/programs/schedule').then( res => {
      setScheduleData(res.data.data)
      console.log(res.data.data)
    } )
  }, [])
  
  return (
    <Layout openedTabName='schedule' style={{  overflow: 'hidden' }}>
      <h1>Program schedule</h1>
      <Timeline  data={data} days={days} venues={venues} />
      {/* <Timeline data={scheduleData} days={days} venues={venues} /> */}
    </Layout>
  )
}

export default Schedule

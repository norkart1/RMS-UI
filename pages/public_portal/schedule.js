import React from 'react'
import Layout from '../../components/public_portal/Layout'
import Timeline from '../../components/schedule-timeline/timeline'


function Schedule() {
  const data = [
    {
      id: 1,
      code: "BV1",
      name: "DICTIONARY MAKING ARB",
      date: "03-12-2022",
      time: "10:00 AM",
      venue: "Venue 1",
      duration: 30
    }
  ]
  return (
    <Layout openedTabName='schedule' style={{  overflow: 'hidden' }}>
      <h1>Program schedule</h1>
      <Timeline  data={data} />
    </Layout>
  )
}

export default Schedule

import React from 'react'
import { useEffect } from 'react'
import ChartElement from '../components/ChartElement'
import { addHourToDate, BaseApi, LoadBarChart } from '../helpers/functions'


//TODO have to replace time a to now time
function test() {
  useEffect(() => {
    BaseApi.get('public/programs/schedule').then(res => {

      const data = res?.data?.data
       
      const timeA = new Date('Fri Dec 02 2022 21:16:00 GMT+0530 (India Standard Time)')
      const startTime = new Date(data[0].date.replace(' 00:00:00', '') + ' ' + data[0].s_time)
      const endTime = new Date(data[0].date.replace(' 00:00:00', '') + ' ' + data[0].e_time)
      const isOngoing = timeA >= startTime && timeA <= endTime

       
    })
  }, [])

  return (
    <div>
      <canvas id='chartTest'></canvas>
      <canvas id='chartTest2'></canvas>
    </div>
  )
}

export default test

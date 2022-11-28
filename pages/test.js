import React from 'react'
import { useEffect } from 'react'
import ChartElement from '../components/ChartElement'
import { LoadBarChart } from '../helpers/functions'

function test() {
  useEffect(() => {
    LoadBarChart('chartTest', ['name1', 'name1', 'name1', 'name1', 'name1'], [1,2,3,4,5],'test','test','test')
    LoadBarChart('chartTest2', ['name2', 'name2', 'name2', 'name2', 'name2'], [1,2,3,4,5],'test','test','test')
  }, [])
  
  return (
    <div>
      <canvas id='chartTest'></canvas>
      <canvas id='chartTest2'></canvas>
    </div>
  )
}

export default test

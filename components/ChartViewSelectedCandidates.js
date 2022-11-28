// import { Chart } from 'chart.js'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import s from '../styles/chart.module.css'
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';
import { BaseApi } from '../helpers/functions';

function ChartViewSelectedCandidates() {


  const [catID, setCatID] = useState('')
  const [categoryOpts, setCategoryOpts] = useState([])


  useEffect(() => {
    BaseApi.get(`/public/elimination-result/categories?session_id=1`).then(res => {
      setCategoryOpts([{ value: null, label: 'ALL' }])
      res.data.data.map(category => {
        setCategoryOpts(prev => [...prev, { value: category.id, label: category.name, category }])
      })
    })
  }, [])
  Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);
  useEffect(() => {
    loadChart()
  }, [catID])

  const loadChart = () => {
    let instis = []
    let count = []

    const chart_colors = {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }
    BaseApi.get(`/public/elimination-result/institutes/count/${catID}`).then((res) => {
      setInstituteCounts(res.data.data)
      instis = sortArrayOfObjectsByProperty(res.data.data, 'count', 'desc').map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
      count = sortArrayOfObjectsByProperty(res.data.data, 'count', 'desc').map((item) => item.count)
    })
      .then(() => {
        Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: instis,
            datasets: [{
              label: '# of Selected Candidates',
              data: count,
              ...chart_colors
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }).catch((err) => {
      }
      )
  }
  return (
    <div className={`${s.xScrollable}`}>
      <div className={s.chart} id='chartContainer'>
        <canvas className={s.chartCanvas} id="myChart" width="400" height={'200'}></canvas>
      </div>
    </div>
  )
}

export default ChartViewSelectedCandidates

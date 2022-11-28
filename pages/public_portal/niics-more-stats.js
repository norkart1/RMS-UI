import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../../components/public_portal/Layout'
import { BaseApi, LoadBarChart, removeSpacesAndSpecialChars } from '../../helpers/functions'
import s from '../../styles/public_portal/more_stats.module.css'
import Back from '../../public/assets/svg/back2.svg'


function NiicsMoreStats() {
  const [NiicsCatBasedData, setNiicsCatBasedData] = useState()
  const niicsAllCats = [
    {
      "id": 7,
      "name": "BIDAYA",
      "chest_no_series": 6500
    },
    {
      "id": 8,
      "name": "ULA",
      "chest_no_series": 7001
    },
    {
      "id": 9,
      "name": "THANIYA",
      "chest_no_series": 7501
    },
    {
      "id": 10,
      "name": "THANAWIYYA",
      "chest_no_series": 8001
    },
    {
      "id": 11,
      "name": "ALIYA",
      "chest_no_series": 8501
    },
    {
      "id": 12,
      "name": "KULLIYYA",
      "chest_no_series": 0
    }
  ]
  useEffect(() => {
    let catbaseData = []
    BaseApi.get(`public/final-result/institutions/published/category?sessionID=2`).then((res) => {
      setNiicsCatBasedData(res.data.data)
      console.log(res.data.data)
      catbaseData = res.data.data
      // console.log(res.data.data)
    })
      .then(() => {
        niicsAllCats.map(async (category) => {
          const labels = catbaseData.filter((data) => data.categoryID == category.id).map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
          const counts = catbaseData.filter((data) => data.categoryID == category.id).map((item) => item.total)
          console.log(labels)
          const chart = LoadBarChart("_" + category.id.toString(), labels, counts, 'TOTAL POINTS')
          console.log('id is ', "_" + category.id.toString())
          console.log(window.myChart)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    BaseApi.get(`public/final-result/categories?sessionID=2`).then((res) => {
      // setGenAllCats(res.data.data)
      console.log(catbaseData)
      console.log(res.data.data)
      res.data.data.map(async (category) => {

      })
    }).then((err) => {
      console.log(err)
    })
  }, [])


  return (
    <div>
      <Layout openedTabName='dashboard' style={{ background: 'linear-gradient(135deg, rgb(246 236 255) 10%, rgb(253 216 255 / 72%) 100%)' }}>
        <div className={s.headerDiv} style={{ display: 'flex' }}>
          <button style={{flex:'0', margin:'auto 1rem'}} >
            <Back width='100' height='200'  />
          </button>
          <h1 className={s.header}>NIICS SESSION DETAILS STATS</h1>
        </div>
        {
          niicsAllCats.map((cat, index) =>
            <div className={`${s.box}`}>
              <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>FINAL STATS OF<br />{cat.name}</h2>
              <div className={`${s.xScrollable}  `}>
                <div className={`${s.chart} `} id='chartContainer'>
                  <canvas className={`${s.chartCanvas} `} id={"_" + cat.id.toString()} width="400" height={'300'}></canvas>

                </div>
              </div>
            </div>
          )
        }
      </Layout>
    </div>
  )
}

export default NiicsMoreStats

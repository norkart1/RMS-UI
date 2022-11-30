import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../../components/public_portal/Layout'
import { BaseApi, LoadBarChart, removeSpacesAndSpecialChars } from '../../helpers/functions'
import s from '../../styles/public_portal/more_stats.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function GeneralMoreStats() {
  const [genCatBasedData, setGenCatBasedData] = useState()
  // const [genAllCats, setGenAllCats] = useState([])
  const [niicsCatBasedData, setNiicsCatBasedData] = useState([])
  const [niicsAllCats, setNiicsAllCats] = useState([])

  const   router = useRouter()
  // get general data
  const genAllCats = [
    {
      "id": 1,
      "name": "BIDĀYAH",
      "chest_no_series": 1001
    },
    {
      "id": 2,
      "name": "ŪLĀ",
      "chest_no_series": 2001
    },
    {
      "id": 3,
      "name": "THĀNIYAH",
      "chest_no_series": 3001
    },
    {
      "id": 4,
      "name": "THĀNAWIYYAH",
      "chest_no_series": 4001
    },
    {
      "id": 5,
      "name": "ᾹLIYAH",
      "chest_no_series": 5001
    },
    {
      "id": 6,
      "name": "KULLIYAH ",
      "chest_no_series": 0
    }
  ]
  //  
  useEffect(() => {
    let catbaseData = []
    BaseApi.get(`public/final-result/institutions/published/category?sessionID=1`).then((res) => {
      setGenCatBasedData(res.data.data)
       
      catbaseData = res.data.data
      //  
    })
      .then(() => {
        genAllCats.map(async (category) => {
          const labels = catbaseData.filter((data) => data.categoryID == category.id).map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
          const counts = catbaseData.filter((data) => data.categoryID == category.id).map((item) => item.total)
           
          LoadBarChart("_" + category.id.toString(), labels, counts, 'TOTAL POINTS')
        })
      })
      .catch((err) => {
         
      })
  }, [router])


  return (
    <div>
      <Layout openedTabName='dashboard' style={{ background: 'linear-gradient(135deg, rgb(246 236 255) 10%, rgb(253 216 255 / 72%) 100%)' }}>
        <div style={{ display: 'flex' }}>
          <ArrowBackIcon className={s.btnBack} fontWeight={'bold'} onClick={()=> router.back()} />
          <h1 className={s.header}>GENERAL SESSION DETAILS STATS</h1>
        </div>        {
          genAllCats.map((cat, index) =>
            <div className={`${s.box}`}>
              <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>FINAL STATS OF<br />{cat.name}</h2>
              <div className={`${s.xScrollable}  `}>
                <div className={s.chart} id='chartContainer'>
                  <canvas className={s.chartCanvas} id={"_" + cat.id.toString()} width="400" height={'100'}></canvas>

                </div>
              </div>
            </div>
          )
        }
      </Layout>
    </div>
  )
}

export default GeneralMoreStats

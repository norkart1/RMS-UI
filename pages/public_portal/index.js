import { Router, useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import HomeMenu from '../../components/homeMenu'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/dashboard.module.css'
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';
import baseApi from '../../api/baseApi'
import { BaseApi, LoadBarChart, sortArrayOfObjectsByProperty } from '../../helpers/functions'
import Select from 'react-select'
import ChartView from '../../components/ChartViewSelectedCandidates'
import ChartViewSelectedCandidates from '../../components/ChartViewSelectedCandidates'
import ChartViewFinal from '../../components/ChartViewFinal'
import FinalToppers from '../../components/FinalToppers'
import TopFiveInsti from '../../components/TopFiveInsti'
import SearchIcon from '@mui/icons-material/Search';


function PublicDashboard() {
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const [instituteCounts, setInstituteCounts] = useState([])
 const [catID, setCatID] = useState('')
 const [categoryOpts, setCategoryOpts] = useState([])
 const [totalPublishedCountsBySession, setTotalPublishedCountsBySession] = useState([])
 const [finalSessionId, setFinalSessionId] = useState('1')
 const [finalInstis, setFinalInstis] = useState([])
 const [finalTotals, setFinalTotals] = useState([])


 useEffect(() => {
  BaseApi.get(`public/final-result/programs/status/published`).then(res => {
   setTotalPublishedCountsBySession(res.data.data)
  })
 }, [])


 useEffect(() => {
  baseApi.get(`/public/elimination-result/categories?session_id=1`).then(res => {
   setCategoryOpts([{ value: null, label: 'ALL' }])
   res.data.data.map(category => {
    setCategoryOpts(prev => [...prev, { value: category.id, label: category.name, category }])
   })
  })
 }, [])



 const handleCategorySelectChange = (category) => {

  setCatID(category?.id)

 }


 const router = useRouter()
 const instiTypes = [
  {
   id: 1,
   name: 'GENERAL',
   total_institutes: 28,
   total_candidates: 3128,
   total_programs: 216,
   female: 64,
   male: 3064,
  },
  {
   id: 2,
   name: 'NIICS',
   total_institutes: 8,
   total_candidates: 656,
   total_programs: 152,
   female: 0,
   male: 656,
  },
 ]
 const counts = [
  {
   id: 1,
   name: 'Institutes',
   count: 36,
  },
  {
   id: 2,
   name: 'Candidates',
   count: 3784,
  },
  {
   id: 3,
   name: 'Programs',
   count: 368,
  },
  {
   id: 3,
   name: 'Programs',
   count: 368,
  },

 ]
 const quickLinks = [
  {
   id: 1,
   name: 'Elimination Results',
   link: '/public_portal/elimination_results',
  },
  {
   id: 2,
   name: 'Schedules',
   link: '/public_portal/schedules',
  },
 ]




 useEffect(() => {
  loadChart()
  loadFinalChart()
 }, [catID])
 // let instis = []
 // let count = []

 const chart_colors = {
  backgroundColor: [
   '#8e548f'
  ],
  borderColor: [
   '#8e548f'
  ],
  borderWidth: 1
 }
 const loadChart = () => {
  let instis = []
  let count = []
  baseApi.get(`/public/elimination-result/institutes/count/${catID}`).then((res) => {
   // setInstituteCounts(res.data.data)
   instis = sortArrayOfObjectsByProperty(res.data.data, 'count', 'desc').map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
   count = sortArrayOfObjectsByProperty(res.data.data, 'count', 'desc').map((item) => item.count)
  })
   .then(() => {
    LoadBarChart('myChart', instis, count, 'SELECTED PROGRAMS')
    // LoadBarChart('myChart2', instis, count, chart_colors)
   }).catch((err) => {
   }
   )
 }
 let finalChart
 useEffect(() => {

  // Load General Final bars
  let instis = []
  let count = []
  baseApi.get(`/public/final-result/institutions/published/all?sessionID=1`).then((res) => {
    console.log(res.data.data)
   instis = sortArrayOfObjectsByProperty(res.data.data, 'total', 'desc').map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
   count = sortArrayOfObjectsByProperty(res.data.data, 'total', 'desc').map((item) => parseFloat(item.total))
  })
   .then(() => {
    console.log(instis)
    LoadBarChart('final_chart', instis, count, 'TOTAL POINTS')

   })

  // Load NIICS Final bars
  let instis2 = []
  let count2 = []
  baseApi.get(`/public/final-result/institutions/published/all?sessionID=2`).then((res) => {
   const fillArray = ['', '', '', '', '', '', '', '', '', '', '',]
   instis2 = sortArrayOfObjectsByProperty(res.data.data, 'total', 'desc').map((item, index) => item.instituteShortName + ' -- ' + (index + 1))
   instis2.push(...fillArray)

   count2 = sortArrayOfObjectsByProperty(res.data.data, 'total', 'desc').map((item) => parseFloat(item.total))
  }
  )
   .then(() => {
    LoadBarChart('final_chart_niics', instis2, count2, 'TOTAL POINTS')
   })
 }, [])

 const loadFinalChart = () => {



 }




 return (
  <Layout openedTabName='dashboard' style={{ background: 'linear-gradient(135deg, rgb(246 236 255) 10%, rgb(253 216 255 / 72%) 100%)' }}>
   <div className={s.container}>
    {/* <div className={s.mainContent_}> */}

    <div className={`${s.counts} ${s.box}`}>
     {counts.map((count, index) => (
      <div className={s.countItem} key={index}>
       <h2>{count.count}</h2>
       <h3>{count.name}</h3>
      </div>
     ))}
     {totalPublishedCountsBySession.map((session, index) => {
      const totalPrograms = parseInt(instiTypes.find((type) => type.id == parseInt(session.sessionID))?.total_programs)
      const publishedPrograms = parseInt(session.totalProgramPublished)
      // const publishedPrograms = 108
      return (
       <div className={`${s.instiItem} ${s.statusPublished}`}
        key={index}
        style={{ marginTop: '0', }}>
        <div className={s.status}
         style={{
          width: `${Math.round((publishedPrograms / totalPrograms) * 100)}%`,
          color: 'white',
          textAlign: 'left',
          padding: '2px 5px 0',
          fontSize: '12px',
          fontWeight: 'bold'
         }}
        >
         {`${Math.round((publishedPrograms / totalPrograms) * 100).toFixed(2)}%`}
        </div>
        <p style={{ zIndex: 2, position: 'relative' }}>
         {session.sessionName.toUpperCase()}: {publishedPrograms} / {totalPrograms} PUBLISHED
        </p>

       </div>
      )
     })}
    </div>

    {/* LINKS */}
    <div className={s.links} style={{ marginTop: '-2rem', marginBottom: '-2rem' }}>
     <div className={`${s.box}`}
      onClick={() => router.push('/public_portal/final_results')}
     >
      <p><SearchIcon style={{ fontSize: '2.5rem', margin: '0 1rem -8px 0' }} />  PROGRAM BASED RESULTS</p>
     </div>
     <div className={`${s.box}`}
      onClick={() => router.push('/public_portal/final_results_of_institutes')}
     >
      <p><SearchIcon style={{ fontSize: '2.5rem', margin: '0 1rem -8px 0' }} />  INSTITUTION BASED RESULTS</p>
     </div>

    </div>


    {/* Final */}
    <div className={`${s.box}`}>
     <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>FINAL ROUND STATUS <br /> OF GENERAL INSTITUTES</h2>
     <div className={`${s.xScrollable}`}>
      <div className={s.chart} id='chartContainer'>
       <canvas className={s.chartCanvas} id="final_chart" width="400" height={'200'}></canvas>
      </div>
     </div>
     <button className={s.btnShowMore} onClick={() => router.push('public_portal/general-more-stats')}>SHOW MORE</button>
    </div>

    <div className={`${s.box}`}>

     <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>FINAL ROUND STATUS <br /> OF NIICS INSTITUTES</h2>
     <div className={`${s.xScrollable}`}>
      <div className={s.chart} id='chartContainer'>
       <canvas className={s.chartCanvas} id="final_chart_niics" width="400" height={'200'}></canvas>
      </div>
     </div>
     <button className={s.btnShowMore} onClick={() => router.push('public_portal/niics-more-stats')}>SHOW MORE</button>

        </div>


    {/* </div>
    {/* Selected Candidates */}
    <div className={`${s.box}`}>
     <h2 style={{ padding: '1rem', color: 'rgb(142 140 140)', width: '100%', textAlign: 'center' }}>SELECTED CANDIDATES <br /> TO FINAL</h2>
     <div className={`${s.xScrollable}  `}>
      <div className={s.chart} id='chartContainer'>
       <canvas className={s.chartCanvas} id="myChart" width="400" height={'200'}></canvas>
      </div>
     </div>
    </div>


    <div className={s.quicklinkTotal}>
     <h2 className={s.quicklinkHeader}>QUICK LINKS</h2>
     <div className={s.quicklinks}>
      {quickLinks.map((link, index) => (
       <div className={s.quicklinkItem} key={index} onClick={() => router.push(link.link)}>
        <p>{link.name}</p>
       </div>
      ))}
     </div>
    </div>
    {/* </div> */}

    {/* <div className={s.right_}>
          <div className={s.box}>
            <div className={s.header}>
              <h2>Latest News</h2>
            </div>
          </div>
        </div> */}

   </div>
  </Layout >
 )

}

export default PublicDashboard
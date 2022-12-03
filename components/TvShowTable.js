import React, { useEffect, useState } from 'react'
import { BaseApi, timeToAgo } from '../helpers/functions'
import s from '../styles/TvShowTable.module.css'

export default function TvShowTable({ sessionID = 1, maxCount = 10 }) {

  const [data, setData] = useState(null)
  const [time, setTime] = useState(null)
  const [categories, setCategories] = useState(null)

  const use_sample = false

  useEffect(() => {
    BaseApi.get(`public/final-result/scoreboard/all`).then((res) => {
      use_sample ? setData(sampleData.slice(0, maxCount)) : setData(res.data.data.filter((item) => item.sessionID === sessionID).slice(0, maxCount))
      // console.log(res.data.data?.[0].categoryTotal.map((item) => item))
    })
    BaseApi.get(`public/final-result/updated-at-time`).then((res) => {
      setTime(res.data.data)
    })
  }, [data])


  useEffect(() => {
    BaseApi.get(`public/final-result/categories?sessionID=${sessionID}`).then((res) => {
      setCategories(res.data.data)
      console.log(res.data.data)
    })
  }, [])



  return (
    <div className={s.page} >
      <div className={s.container}>
        <div className={s.header}>
          <h1>SIBAQ SCOREBOARD - {sessionID == 1 ? 'GENERAL':'NIICS'}</h1>

        </div>
        <table className={s.table}>
          <tbody>

            <tr className={`${s.rotate} ${s.tr}`}>
              <th className={`${s.rotate} ${s.th}`}> INSTITUTES </th>
              {
                data?.map((insti, index) => {
                  return (
                    // INSTITUTION NAMES
                    <th className={`${s.rotate} ${s.th}`}>
                    
                    
                    <div>{index+1}<span>{insti.instituteShortName.replace('-',' ')}</span></div></th>
                  )
                })
              }
              <th className={`${s.th} ${s.last}`} > </th>

            </tr>
            {
              categories?.map((cat, index) => {

                return (

                  <tr className={`${s.rotate} ${s.tr}`}>

                    <th className={`${s.th} ${s.categories}`}>{cat.name}</th>
                    {
                      data?.map((insti, index) => {
                        return (
                          // INSTITUTION SCORES
                          <td className={s.td}>{insti.categoryTotal.find((item) => item.categoryID == cat.id)?.totalPoint??'_'}</td>
                        )
                      })
                    }

                    <th className={`${s.th} ${s.last}`} ></th>

                  </tr>
                )
              })
            }
            <tr className={`${s.tr}`}>
              <th className={`${s.th}`}>TOTAL</th>
              {
                data?.map((insti, index) => {
                  return (
                    // TOTAL SCORES
                    <th className={`${s.th} ${s.foot}`}>{insti?.totalPoint}</th>

                  )
                })
              }
              <th className={`${s.th} ${s.last}`} ></th>
            </tr>
            <tr className={`${s.tr}`}>
              <th className={`${s.th}`}>PERCENTAGE</th>
              {
                data?.map((insti, index) => {
                  return (
                    // TOTAL SCORES
                    <th className={`${s.th} ${s.foot}`}>{insti?.percentage.toFixed(2)} <small style={{ opacity: '.5' }}>%</small> </th>
                  )
                })
              }
              <th className={`${s.th} ${s.last}`} ></th>
            </tr>
          </tbody>
        </table>
        <div className={s.ad}>
          <div className={s.marquee} behavior="smooth" direction="">
            <p>LAST RESULT PUBLISHED   </p>
            <p><b>{timeToAgo(time).toUpperCase()}</b></p>
            {/* <p>{formatDate(time, false, true)}</p> */}

            <p>  SEE PUBLISHED RESULTS INSTANTLY ON <br /> <b style={{fontSize:'3rem'}}>www.sibaq.in</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}

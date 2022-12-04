import React, { useEffect, useState } from 'react'
import { addZero, BaseApi, formatDate, timeToAgo } from '../helpers/functions'
import s from '../styles/pointtable.module.css'

export default function PointTable({ sessionID , categoryID }) {

  const [institutes, setInstitutes] = useState(null)
  const [time, setTime] = useState(null)
  const [programs, setPrograms] = useState(null)
  console.log(programs);

let category = null
      if (categoryID = 1){

          category ="BIDAYA"
        } 
    else if (categoryID = 2){

         category="ULA"
        } 
      else if(categoryID = 3){

           category ="THANIYA"
        }
      else if(categoryID = 4){

           category="THANAWIYYA"
        }
       else if(categoryID = 5){   
           category="ALIYA"
        }
    
console.log(sessionID);
console.log(categoryID,category);

  useEffect(() => {
    BaseApi.get(`public/final-result/pointtable/?categoryID=${categoryID}&?sessionID=${sessionID}`).then((res) => {
    //    setData(res.data.data.filter((item) => item.sessionID === sessionID).slice(0, maxCount))
    // setPrograms(res.data.data.programs.filter((item)=> item.sessionID === sessionID))
    // setInstitutes(res.data.data.institutes.filter((item)=> item.sessionID === sessionID))
    })
    BaseApi.get(`public/final-result/updated-at-time`).then((res) => {
      setTime(res.data.data)
    })
  }, [programs])


//   useEffect(() => {
//     BaseApi.get(`public/final-result/categories?sessionID=${sessionID}`).then((res) => {
//       setCategories(res.data.data)
//       console.log(res.data.data)
//     })
//   }, [])


  return (
    <div className={s.page} >
      <div className={s.container}>
        <div className={s.header}>
          <h1>SIBAQ SCOREBOARD - {sessionID == 1 ? 'GENERAL':'NIICS'}-{category}
           </h1>

        </div>
        <table className={s.table}>
          <tbody>

            <tr>
              <th className={` ${s.th}`}> Institutions </th>
              {
                programs?.map((pro, index) => {
                  return (
                    // Program NAMES
                    <th className={`${s.rotate} ${s.th}`}><div>{index+1}
                    
                    
                    <span>{pro.name.replace('-',' ')}</span></div></th>
                  )
                })
              }
              <th className={`${s.th} ${s.last}`} > </th>

            </tr>
            {
              institutes?.map((insti, index) => {

                return (

                  <tr className={`${s.rotate} ${s.tr}`}>

                    <th className={`${s.th} ${s.categories}`}>{insti.instituteShortName}</th>
                    {
                      programs?.map((points, index) => {
                        return (
                          // INSTITUTION SCORES
                          <td className={s.td}>{points.results.find((item)=> item.instituteID == insti.id)?.point ??'_'}</td>
                        )
                      })
                    }

                    <th className={`${s.th} ${s.last}`} ></th>

                  </tr>
                )
              })
            }
            
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

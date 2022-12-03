import React, { useEffect, useState } from 'react'
import { BaseApi, getFirstFive, sortArrayOfObjectsByProperty } from '../helpers/functions';
import s from "../styles/top_five.module.css";
import Bubble from './bubble';

function TopFiveInsti({ style = {}, sessionID = '1', cardsStyle = {}, title, count = 5, titleStyle = {}, cardStyle = {} }) {
  const [topfives, setTopfives] = useState([]);
  useEffect(() => {
    BaseApi.get(`/public/final-result/institutions/published/all?sessionID=${sessionID}`).then((res) => {
      const nonNull = res.data.data.filter((item) => item.total != null && item.total != 0)
      console.log(nonNull);
      setTopfives(getFirstFive(res.data.data.filter((item) => item.total != null && item.total != 0), count))
    })



  }, [])

  // const data = [
  //   {
  //     "instituteShortName": "MDIA-THALANGARA",
  //     "candidateName": "AHAMED ADIL. A",
  //     "chestNO": 1001,
  //     "candidatePhoto": "{\"key\": \"candidate-11.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-11.jpg\", \"eTag\": \"\\\"a04ce47728f63466b4826853b6a3b17e\\\"\"}",
  //     "categoryID": 1,
  //     "categoryName": "BIDĀYAH",
  //     "sessionID": 1,
  //     "sessionName": "General",
  //     "score": 10
  //   },
  //   {
  //     "instituteShortName": "MDIA-THALANGARA",
  //     "candidateName": "Mohammed Baqir T S ",
  //     "chestNO": 2062,
  //     "candidatePhoto": "{\"key\": \"candidate-221.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-221.jpg\", \"eTag\": \"\\\"339462f0de43df46d678734348573955\\\"\"}",
  //     "categoryID": 2,
  //     "categoryName": "ŪLĀ",
  //     "sessionID": 1,
  //     "sessionName": "General",
  //     "score": 2
  //   },
  //   {
  //     "instituteShortName": "MDIA-THALANGARA",
  //     "candidateName": "MOHAMMED KUNHI TK",
  //     "chestNO": 3001,
  //     "candidatePhoto": "{\"key\": \"candidate-72.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-72.jpg\", \"eTag\": \"\\\"f69c239bcaf7f6a05ec8bb65babb8c7c\\\"\"}",
  //     "categoryID": 3,
  //     "categoryName": "THĀNIYAH",
  //     "sessionID": 1,
  //     "sessionName": "General",
  //     "score": 5
  //   },
  //   {
  //     "instituteShortName": "MDIA-THALANGARA",
  //     "candidateName": "MOHAMMED HASHIR",
  //     "chestNO": 4035,
  //     "candidatePhoto": "{\"key\": \"candidate-380.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-380.jpg\", \"eTag\": \"\\\"f63addd359a18537e810b3f98f283df3\\\"\"}",
  //     "categoryID": 4,
  //     "categoryName": "THĀNAWIYYAH",
  //     "sessionID": 1,
  //     "sessionName": "General",
  //     "score": 10
  //   },
  //   {
  //     "instituteShortName": "MDIA-THALANGARA",
  //     "candidateName": "MUBARACK ABDULLA",
  //     "chestNO": 5028,
  //     "candidatePhoto": "{\"key\": \"candidate-621.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-621.jpg\", \"eTag\": \"\\\"3c8205d12b2aa665a9fb313f2cfec832\\\"\"}",
  //     "categoryID": 5,
  //     "categoryName": "ᾹLIYAH",
  //     "sessionID": 1,
  //     "sessionName": "General",
  //     "score": null
  //   },
  //   {
  //     "instituteShortName": "DNEC-KASHIPATNA",
  //     "candidateName": "Ihsan Hussain",
  //     "chestNO": 6504,
  //     "candidatePhoto": "{\"key\": \"candidate-3428.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3428.JPG\", \"eTag\": \"\\\"41a1ded5a131460cc4c958b44e53ec2e\\\"\"}",
  //     "categoryID": 7,
  //     "categoryName": "BIDAYA",
  //     "sessionID": 2,
  //     "sessionName": "NIICS",
  //     "score": null
  //   },
  //   {
  //     "instituteShortName": "DNEC-KASHIPATNA",
  //     "candidateName": "Muhammad SaziM",
  //     "chestNO": 7003,
  //     "candidatePhoto": "{\"key\": \"candidate-3442.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3442.JPG\", \"eTag\": \"\\\"230a4f34295e57490323231f68f10073\\\"\"}",
  //     "categoryID": 8,
  //     "categoryName": "ULA",
  //     "sessionID": 2,
  //     "sessionName": "NIICS",
  //     "score": null
  //   },
  //   {
  //     "instituteShortName": "DHHC HANGAL",
  //     "candidateName": "Muhammed Mahin Shaikh",
  //     "chestNO": 7502,
  //     "candidatePhoto": "{\"key\": \"candidate-3484.jpeg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3484.jpeg\", \"eTag\": \"\\\"30711f6511cefe35065afea5b5d7a205\\\"\"}",
  //     "categoryID": 9,
  //     "categoryName": "THANIYA",
  //     "sessionID": 2,
  //     "sessionName": "NIICS",
  //     "score": null
  //   },
  //   {
  //     "instituteShortName": "DH-NIICS",
  //     "candidateName": "Muhammed Abdal",
  //     "chestNO": 8017,
  //     "candidatePhoto": "{\"key\": \"candidate-3519.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3519.jpg\", \"eTag\": \"\\\"088f87c434e5ab02e823ad579a0215ef\\\"\"}",
  //     "categoryID": 10,
  //     "categoryName": "THANAWIYYA",
  //     "sessionID": 2,
  //     "sessionName": "NIICS",
  //     "score": null
  //   },
  //   {
  //     "instituteShortName": "DH-NIICS",
  //     "candidateName": "Nairul Sk",
  //     "chestNO": 8503,
  //     "candidatePhoto": "{\"key\": \"candidate-3494.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3494.jpg\", \"eTag\": \"\\\"526e3243342781de82ee92f7b4b3c1e3\\\"\"}",
  //     "categoryID": 11,
  //     "categoryName": "ALIYA",
  //     "sessionID": 2,
  //     "sessionName": "NIICS",
  //     "score": null
  //   }
  // ]
  return (
    <div>
      {
        topfives.length != 0 &&
        <div className={s.container} style={style}>
          {title && <h4 className={s.title} style={titleStyle}>{title}</h4>}
          <div className={s.cards} id='cards' style={cardsStyle}>
            {
              topfives.map((item, index) => {
                // if (item.score == null) return
                return (
                  <div className={s.card} id='card'
                    data-position={index + 1}
                    style={cardStyle}
                    key={index}
                  >
                    {/* <Bubble/> */}
                    <div style={{display:'flex', margin:'auto', textAlign:'center', justifyContent:'center'}}>
                      <p className={s.total}>{item.total} <small>Points</small> </p>
                      {/* <p className={s.s} style={{ fontSize: '2rem',marginTop:'2.5rem  ', marginBottom:'0' }}>POINTS</p> */}
                    </div>
                    <div style={{display:'flex', margin:'auto', textAlign:'center', justifyContent:'center'}}>
                      <p className={s.total}>{item.percentage.toFixed(2)} <small>%</small>  </p>
                      {/* <p className={s.s} style={{ fontSize: '2rem',marginTop:'2rem', marginBottom:'0' }}> %</p> */}
                    </div>

                    <p className={s.shortName}>{item.instituteShortName.toUpperCase()}</p>
                    {/* <p className={s.name}>{item.instituteName.toUpperCase()}</p> */}
                  </div>
                )
              }
              )
            }

          </div>
        </div>}
    </div>
  )
}

export default TopFiveInsti

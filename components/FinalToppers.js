import React, { useEffect, useState } from 'react'
import { BaseApi, sortArrayOfObjectsByProperty } from '../helpers/functions';
import s from "../styles/final_toppers.module.css";

function FinalToppers({style={}, sessionId = '1'}) {
  const [toppers, setToppers] = useState([]);
  useEffect(() => {
    let sortted;
    BaseApi.get(`public/final-result/toppers/all`).then((res)=>{
      sortted = sortArrayOfObjectsByProperty(res.data.data.filter(item=> item.id == sessionId), 'score', 'desc')
    }).then(()=>{
      
      setToppers(sortted)
    })

  }, [])

  const data = [
    {
      "instituteShortName": "MDIA-THALANGARA",
      "candidateName": "AHAMED ADIL. A",
      "chestNO": 1001,
      "candidatePhoto": "{\"key\": \"candidate-11.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-11.jpg\", \"eTag\": \"\\\"a04ce47728f63466b4826853b6a3b17e\\\"\"}",
      "categoryID": 1,
      "categoryName": "BIDĀYAH",
      "sessionID": 1,
      "sessionName": "General",
      "score": 10
    },
    {
      "instituteShortName": "MDIA-THALANGARA",
      "candidateName": "Mohammed Baqir T S ",
      "chestNO": 2062,
      "candidatePhoto": "{\"key\": \"candidate-221.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-221.jpg\", \"eTag\": \"\\\"339462f0de43df46d678734348573955\\\"\"}",
      "categoryID": 2,
      "categoryName": "ŪLĀ",
      "sessionID": 1,
      "sessionName": "General",
      "score": 2
    },
    {
      "instituteShortName": "MDIA-THALANGARA",
      "candidateName": "MOHAMMED KUNHI TK",
      "chestNO": 3001,
      "candidatePhoto": "{\"key\": \"candidate-72.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-72.jpg\", \"eTag\": \"\\\"f69c239bcaf7f6a05ec8bb65babb8c7c\\\"\"}",
      "categoryID": 3,
      "categoryName": "THĀNIYAH",
      "sessionID": 1,
      "sessionName": "General",
      "score": 5
    },
    {
      "instituteShortName": "MDIA-THALANGARA",
      "candidateName": "MOHAMMED HASHIR",
      "chestNO": 4035,
      "candidatePhoto": "{\"key\": \"candidate-380.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-380.jpg\", \"eTag\": \"\\\"f63addd359a18537e810b3f98f283df3\\\"\"}",
      "categoryID": 4,
      "categoryName": "THĀNAWIYYAH",
      "sessionID": 1,
      "sessionName": "General",
      "score": 10
    },
    {
      "instituteShortName": "MDIA-THALANGARA",
      "candidateName": "MUBARACK ABDULLA",
      "chestNO": 5028,
      "candidatePhoto": "{\"key\": \"candidate-621.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-621.jpg\", \"eTag\": \"\\\"3c8205d12b2aa665a9fb313f2cfec832\\\"\"}",
      "categoryID": 5,
      "categoryName": "ᾹLIYAH",
      "sessionID": 1,
      "sessionName": "General",
      "score": null
    },
    {
      "instituteShortName": "DNEC-KASHIPATNA",
      "candidateName": "Ihsan Hussain",
      "chestNO": 6504,
      "candidatePhoto": "{\"key\": \"candidate-3428.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3428.JPG\", \"eTag\": \"\\\"41a1ded5a131460cc4c958b44e53ec2e\\\"\"}",
      "categoryID": 7,
      "categoryName": "BIDAYA",
      "sessionID": 2,
      "sessionName": "NIICS",
      "score": null
    },
    {
      "instituteShortName": "DNEC-KASHIPATNA",
      "candidateName": "Muhammad SaziM",
      "chestNO": 7003,
      "candidatePhoto": "{\"key\": \"candidate-3442.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3442.JPG\", \"eTag\": \"\\\"230a4f34295e57490323231f68f10073\\\"\"}",
      "categoryID": 8,
      "categoryName": "ULA",
      "sessionID": 2,
      "sessionName": "NIICS",
      "score": null
    },
    {
      "instituteShortName": "DHHC HANGAL",
      "candidateName": "Muhammed Mahin Shaikh",
      "chestNO": 7502,
      "candidatePhoto": "{\"key\": \"candidate-3484.jpeg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3484.jpeg\", \"eTag\": \"\\\"30711f6511cefe35065afea5b5d7a205\\\"\"}",
      "categoryID": 9,
      "categoryName": "THANIYA",
      "sessionID": 2,
      "sessionName": "NIICS",
      "score": null
    },
    {
      "instituteShortName": "DH-NIICS",
      "candidateName": "Muhammed Abdal",
      "chestNO": 8017,
      "candidatePhoto": "{\"key\": \"candidate-3519.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3519.jpg\", \"eTag\": \"\\\"088f87c434e5ab02e823ad579a0215ef\\\"\"}",
      "categoryID": 10,
      "categoryName": "THANAWIYYA",
      "sessionID": 2,
      "sessionName": "NIICS",
      "score": null
    },
    {
      "instituteShortName": "DH-NIICS",
      "candidateName": "Nairul Sk",
      "chestNO": 8503,
      "candidatePhoto": "{\"key\": \"candidate-3494.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3494.jpg\", \"eTag\": \"\\\"526e3243342781de82ee92f7b4b3c1e3\\\"\"}",
      "categoryID": 11,
      "categoryName": "ALIYA",
      "sessionID": 2,
      "sessionName": "NIICS",
      "score": null
    }
  ]
  return (
    <div>
      <div className={s.container} style={style}>
        <div className={s.cards}>


          {
            toppers.map((item, index) => {
              if (item.score == null) return

              else return (
                <div className={s.card}>
                  <h5>{item.categoryName}</h5>
                  <div className={s.content}>
                    <div className={s.cardHeader}>
                      <div className={s.divCandImg} style={{ backgroundImage: `url(${JSON.parse(item.photo)?.url})` }}></div>
                    </div>
                    <div className={s.cardBody}>
                      <h3 style={{ color:'#5d5c5c', marginBottom:'0'}}>{item.candidateName?.toUpperCase()} {item.chest_no}</h3>
                      <h4 style={{color:'gray', margin:'0'}} >{item.short_name}</h4>
                      {/* <h4></h4> */}
                    
                    </div>
                    <div className={s.cardHeaderRight}>
                      <h3>{item.score}</h3>
                    </div>

                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default FinalToppers

import { useSpring } from 'framer-motion'
import gsap from 'gsap'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import  from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import TopFiveInsti from '../components/TopFiveInsti'
import { BaseApi, convertLongPosToShort, replaceHyphenWithBreak, reverseArray } from '../helpers/functions'
import s from '../styles/tvshow.module.css'

function Tvshow() {


  const [data, setData] = useState([])
  const router = useRouter()

  const use_sample = false

  const structure_data =
  [
    {
      "programID": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "categoryName": "BIDĀYAH",
      "programResult": [
        {
          "position": "First",
          "grade": null,
          "point": 10,
          "updatedAt": "2022-11-29T10:51:25.000Z",
          "id": 1,
          "programCode": "BV1",
          "programName": "DICTIONARY MAKING ARB",
          "instituteShortName": "NRIC-CHAMAKKALA",
          "candidateName": "Jasim Ismayil K P",
          "chestNO": 1178,
          "photo": "{\"key\": \"candidate-889.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-889.jpg\", \"eTag\": \"\\\"62bced356827d82e96d6a76f1e801d1f\\\"\"}"
        },
        {
          "position": "Second",
          "grade": null,
          "point": 8,
          "updatedAt": "2022-11-29T10:49:40.000Z",
          "id": 1,
          "programCode": "BV1",
          "programName": "DICTIONARY MAKING ARB",
          "instituteShortName": "SHIC-PARAPPUR",
          "candidateName": "IRFAN RAZIM",
          "chestNO": 1080,
          "photo": "{\"key\": \"candidate-205.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-205.jpg\", \"eTag\": \"\\\"8e29237b3ed29d4aba904d87519d7c5d\\\"\"}"
        },
        {
          "position": "Third",
          "grade": null,
          "point": 6,
          "updatedAt": "2022-11-29T10:49:45.000Z",
          "id": 1,
          "programCode": "BV1",
          "programName": "DICTIONARY MAKING ARB",
          "instituteShortName": "DIIA-PANDIKKAD",
          "candidateName": "MUHAMMED SHAKKIR K",
          "chestNO": 1422,
          "photo": "{\"key\": \"candidate-2075.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-2075.jpg\", \"eTag\": \"\\\"33f47ff8b7f6b02596ec475f98abe7b2\\\"\"}"
        },
        {
          "position": null,
          "grade": "A",
          "point": 5,
          "updatedAt": "2022-11-29T10:48:27.000Z",
          "id": 1,
          "programCode": "BV1",
          "programName": "DICTIONARY MAKING ARB",
          "instituteShortName": "DHIC-KANNADIPPARAMBA",
          "candidateName": "MUHAMMAD FAYIZ B",
          "chestNO": 1310,
          "photo": "{\"key\": \"candidate-1554.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-1554.jpg\", \"eTag\": \"\\\"b67bbcf7340882a42ac47066c4032e16\\\"\"}"
        },
        {
          "position": null,
          "grade": "B",
          "point": 3,
          "updatedAt": "2022-11-29T10:48:27.000Z",
          "id": 1,
          "programCode": "BV1",
          "programName": "DICTIONARY MAKING ARB",
          "instituteShortName": "NHIA-PATTAMBI",
          "candidateName": "Shebin",
          "chestNO": 1598,
          "photo": "{\"key\": \"candidate-3137.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3137.jpg\", \"eTag\": \"\\\"42d28c03dece6be870999a7bd7b96d06\\\"\"}"
        }
      ]
    },
    {
      "programID": 17,
      "programCode": "BW17",
      "programName": "SPEECH ENG",
      "categoryName": "BIDĀYAH",
      "programResult": [
        {
          "position": "First",
          "grade": "A",
          "point": 10,
          "updatedAt": "2022-11-30T12:59:33.000Z",
          "id": 17,
          "programCode": "BW17",
          "programName": "SPEECH ENG",
          "instituteShortName": "MDIA-THALANGARA",
          "candidateName": "MUHAMMED NAIEEM",
          "chestNO": 1008,
          "photo": "{\"key\": \"candidate-19.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-19.jpg\", \"eTag\": \"\\\"f4916a95e8ef247ec85479bef67c442e\\\"\"}"
        },
        {
          "position": "Second",
          "grade": "A",
          "point": 8,
          "updatedAt": "2022-11-30T12:59:34.000Z",
          "id": 17,
          "programCode": "BW17",
          "programName": "SPEECH ENG",
          "instituteShortName": "MU-ARATTUPUZHA",
          "candidateName": "Afnan MahfooZ",
          "chestNO": 1025,
          "photo": "{\"key\": \"candidate-69.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-69.JPG\", \"eTag\": \"\\\"9593f870a40b07af51eb6b092115cc64\\\"\"}"
        },
        {
          "position": "Third",
          "grade": "B",
          "point": 4,
          "updatedAt": "2022-11-30T12:59:35.000Z",
          "id": 17,
          "programCode": "BW17",
          "programName": "SPEECH ENG",
          "instituteShortName": "NRIC-CHAMAKKALA",
          "candidateName": "Rezin Muhammed",
          "chestNO": 1187,
          "photo": "{\"key\": \"candidate-974.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-974.jpg\", \"eTag\": \"\\\"ea9ac5a731e4a2811a178a75bc0fe50c\\\"\"}"
        }
      ]
    },
    // {
    //   "programID": 41,
    //   "programCode": "UV1",
    //   "programName": "MEMORY TEST",
    //   "categoryName": "ŪLĀ",
    //   "programResult": [
    //     {
    //       "position": "First",
    //       "grade": "A",
    //       "point": 10,
    //       "updatedAt": "2022-11-26T22:27:07.000Z",
    //       "id": 41,
    //       "programCode": "UV1",
    //       "programName": "MEMORY TEST",
    //       "instituteShortName": "MDIA-THALANGARA",
    //       "candidateName": "Mohammed Baqir T S ",
    //       "chestNO": 2062,
    //       "photo": "{\"key\": \"candidate-221.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-221.jpg\", \"eTag\": \"\\\"339462f0de43df46d678734348573955\\\"\"}"
    //     },
    //     {
    //       "position": "Second",
    //       "grade": "A",
    //       "point": 8,
    //       "updatedAt": "2022-11-26T22:27:08.000Z",
    //       "id": 41,
    //       "programCode": "UV1",
    //       "programName": "MEMORY TEST",
    //       "instituteShortName": "DSIA-THALASSERY",
    //       "candidateName": "Muhammed Sanah p",
    //       "chestNO": 2023,
    //       "photo": "{\"key\": \"candidate-57.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-57.jpg\", \"eTag\": \"\\\"51c3cac5f3a4444be619cbdd779a9aaf\\\"\"}"
    //     },
    //     {
    //       "position": "Third",
    //       "grade": "B",
    //       "point": 4,
    //       "updatedAt": "2022-11-26T22:27:08.000Z",
    //       "id": 41,
    //       "programCode": "UV1",
    //       "programName": "MEMORY TEST",
    //       "instituteShortName": "DUDC-THOOTHA",
    //       "candidateName": "FAISAL SABITH CH",
    //       "chestNO": 2277,
    //       "photo": "{\"key\": \"candidate-1327.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-1327.JPG\", \"eTag\": \"\\\"800d35e899a9e087e87f19704e81cabc\\\"\"}"
    //     }
    //   ]
    // },
    // {
    //   "programID": 42,
    //   "programCode": "UV2",
    //   "programName": "PENCIL DRAWING",
    //   "categoryName": "ŪLĀ",
    //   "programResult": [
    //     {
    //       "position": "First",
    //       "grade": "A",
    //       "point": 10,
    //       "updatedAt": "2022-11-29T19:58:18.000Z",
    //       "id": 42,
    //       "programCode": "UV2",
    //       "programName": "PENCIL DRAWING",
    //       "instituteShortName": "MRIC-CHELEMBRA",
    //       "candidateName": "Sanoojal ",
    //       "chestNO": 2061,
    //       "photo": "{\"key\": \"candidate-207.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-207.jpg\", \"eTag\": \"\\\"97ae726fdb4f6948653339ca3579f0e4\\\"\"}"
    //     },
    //     {
    //       "position": "Second",
    //       "grade": "A",
    //       "point": 8,
    //       "updatedAt": "2022-11-29T19:58:17.000Z",
    //       "id": 42,
    //       "programCode": "UV2",
    //       "programName": "PENCIL DRAWING",
    //       "instituteShortName": "SHIC-PARAPPUR",
    //       "candidateName": "MUHAMMED UVAIS.EK",
    //       "chestNO": 2175,
    //       "photo": "{\"key\": \"candidate-598.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-598.jpg\", \"eTag\": \"\\\"2417d9d1b3eb1eb340b9c121ccc20698\\\"\"}"
    //     },
    //     {
    //       "position": "Third",
    //       "grade": "A",
    //       "point": 6,
    //       "updatedAt": "2022-11-29T19:58:18.000Z",
    //       "id": 42,
    //       "programCode": "UV2",
    //       "programName": "PENCIL DRAWING",
    //       "instituteShortName": "DSIA-THALASSERY",
    //       "candidateName": "Muhammed Mublij I p",
    //       "chestNO": 2004,
    //       "photo": "{\"key\": \"candidate-9.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-9.jpg\", \"eTag\": \"\\\"97fa5d580340f2a0598a663bf91a8092\\\"\"}"
    //     },
    //     {
    //       "position": null,
    //       "grade": "B",
    //       "point": 3,
    //       "updatedAt": "2022-11-29T19:58:17.000Z",
    //       "id": 42,
    //       "programCode": "UV2",
    //       "programName": "PENCIL DRAWING",
    //       "instituteShortName": "MIC-UDUMA",
    //       "candidateName": "ABUBBAKKAR NAWAVI",
    //       "chestNO": 2106,
    //       "photo": "{\"key\": \"candidate-392.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-392.jpg\", \"eTag\": \"\\\"b6c7cb886b864e86cd86ca4c550c92a6\\\"\"}"
    //     }
    //   ]
    // },
    // {
    //   "programID": 217,
    //   "programCode": "NBX1",
    //   "programName": "HAND WRITING ARB",
    //   "categoryName": "BIDAYA",
    //   "programResult": [
    //     {
    //       "position": "First",
    //       "grade": "A",
    //       "point": 10,
    //       "updatedAt": "2022-11-26T22:00:27.000Z",
    //       "id": 217,
    //       "programCode": "NBX1",
    //       "programName": "HAND WRITING ARB",
    //       "instituteShortName": "DNEC-KASHIPATNA",
    //       "candidateName": "Ihsan Hussain",
    //       "chestNO": 6504,
    //       "photo": "{\"key\": \"candidate-3428.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3428.JPG\", \"eTag\": \"\\\"41a1ded5a131460cc4c958b44e53ec2e\\\"\"}"
    //     },
    //     {
    //       "position": "Second",
    //       "grade": "A",
    //       "point": 8,
    //       "updatedAt": "2022-11-26T22:00:28.000Z",
    //       "id": 217,
    //       "programCode": "NBX1",
    //       "programName": "HAND WRITING ARB",
    //       "instituteShortName": "DHHC HANGAL",
    //       "candidateName": "Muhammad Jamal",
    //       "chestNO": 6517,
    //       "photo": "{\"key\": \"candidate-3536.jpeg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3536.jpeg\", \"eTag\": \"\\\"c4b42969c862ab3b35802f07f23f3748\\\"\"}"
    //     },
    //     {
    //       "position": "Third",
    //       "grade": "A",
    //       "point": 6,
    //       "updatedAt": "2022-11-26T22:00:29.000Z",
    //       "id": 217,
    //       "programCode": "NBX1",
    //       "programName": "HAND WRITING ARB",
    //       "instituteShortName": "DHPC-PUNGANOOR",
    //       "candidateName": "MD ADIL RAIN",
    //       "chestNO": 6538,
    //       "photo": "{\"key\": \"candidate-3558.png\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3558.png\", \"eTag\": \"\\\"99094f270bc32b1b230bf6d0a7b9bfd9\\\"\"}"
    //     }
    //   ]
    // }
  ]

  let currentIdIndex = 0;
  // let idArray = []
  useEffect(() => {
    BaseApi.get(`public/final-result/programs/all`).then((res) => {

      let resData = res.data.data.filter((item) => item.programResult.length != 0)
      use_sample ? setData(structure_data.filter((item) => item.programResult.length != 0)) : setData(res.data.data.filter((item) => item.programResult.length != 0))
      console.log(res.data.data.filter((item) => item.programResult.length != 0))
      // resData.map((pr) => pr.programResult.map((item) => idArray.push(pr.programCode + item.chestNO)))
      // console.log(idArray)

      let elementTotalWidth = document.querySelector('#xscrollable').clientWidth - window.innerWidth
      console.log(elementTotalWidth)
      gsap.fromTo('#xscrollable', { x: 0 }, { x: elementTotalWidth * -1 , duration: 10 , repeat: -1, ease: 'none', yoyo: true })


      // const interval = setInterval(() => {
      //   if (currentIdIndex == idArray.length) {
      //     idArray = reverseArray(idArray)
      //     currentIdIndex = 0;
      //     return;
      //   }
      //   currentIdIndex++
      //   router.push(`#${idArray[currentIdIndex]}`)
      // }
      //   , 1000);
      // return () => clearInterval(interval);
    })
  }, [])














  return (
    <div>
      <div className={s.total_display}>
        <div className={s.header}>
          <div className={s.colored}>
            SIBAQ 2022 UPDATES
          </div>
          <div className={s.program_name}>
            <p>HERE COMES PROGRAM NAME  -  BIDAYA</p>
          </div>
        </div>
        <div className={s.grid}>
          <div className={`${s.xscrollable} 'xscrollable'`} id='xscrollable' >
            {/* <div className={s.wide} id='wide'> */}
            {
              data.map((program, index) => (
                <div className={`${s.program_results} ${s.main_card}`}>
                  <>
                    <h2 className={s.slide_program_name}>{program.programName}  -  {program.categoryName}</h2>
                    <div className={s.cards}>

                      {
                        program.programResult.map((item, index) =>
                          <div className={s.card_container}>
                            <div className={s.card}
                              id={program.programCode + item.chestNO}
                              data-pos={item.position}
                            >
                              <div className={s.photo_div}
                                style={{ backgroundImage: `url(${JSON.parse(item.photo).url})` }}
                              ></div>
                              <div className={s.texts}>
                                <p className={s.chest}>{item.chestNO}</p>
                                <div>

                                  <p className={s.name}>{item.candidateName}</p>
                                  <p className={s.insti}>{replaceHyphenWithBreak(item.instituteShortName)}</p>
                                </div>
                                <p className={s.pos}>{convertLongPosToShort(item.position)}</p>
                                <p className={s.grade}>{item.grade}</p>
                                <p className={s.grade_label}>{item.grade ? 'GRADE' : `WITHOUT \n GRADE`} </p>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </>
                </div>
              ))
            }
            {/* </div> */}
          </div>
          <div className={`${s.institution_toppers} ${s.main_card}`}>

            <div className={s.container}>
              <TopFiveInsti title='GENERAL'
                titleStyle={{ textAlign: 'left', margin: '0 1rem', background: 'none', color: 'black', fontSize: '2rem' }}
                count={3}
                cardStyle={{ background: 'white' }}
                cardsStyle={{ margin: 'auto', marginRight: '3rem', paddingBottom: '0' }} />
              <TopFiveInsti title='NIICS'
                titleStyle={{ textAlign: 'left', margin: '0 1rem', background: 'none', color: 'black', fontSize: '2rem' }}
                count={3}
                cardStyle={{ background: 'white' }}
                cardsStyle={{ margin: 'auto', marginRight: '3rem', paddingBottom: '0' }}
                sessionID='2' />
            </div>


          </div>
        </div>
      </div>
    </div >
  )
}

export default Tvshow
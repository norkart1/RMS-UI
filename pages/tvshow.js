import React from 'react'
import { convertLongPosToShort, replaceHyphenWithBreak } from '../helpers/functions'
import s from '../styles/tvshow.module.css'

function Tvshow() {

  const programResultsData = [
    {
      "position": "First",
      "grade": null,
      "point": 10,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "NRIC-CHAMAKKALA",
      "candidateName": "Jasim Ismayil K P",
      "chestNO": 1178,
      "photo": "{\"key\": \"candidate-889.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-889.jpg\", \"eTag\": \"\\\"62bced356827d82e96d6a76f1e801d1f\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    {
      "position": "Second",
      "grade": null,
      "point": 8,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "SHIC-PARAPPUR",
      "candidateName": "IRFAN RAZIM",
      "chestNO": 1080,
      "photo": "{\"key\": \"candidate-205.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-205.jpg\", \"eTag\": \"\\\"8e29237b3ed29d4aba904d87519d7c5d\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    {
      "position": "Third",
      "grade": null,
      "point": 6,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "DIIA-PANDIKKAD",
      "candidateName": "MUHAMMED SHAKKIR K",
      "chestNO": 1422,
      "photo": "{\"key\": \"candidate-2075.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-2075.jpg\", \"eTag\": \"\\\"33f47ff8b7f6b02596ec475f98abe7b2\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    {
      "position": null,
      "grade": "A",
      "point": 5,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "DHIC-KANNADIPPARAMBA",
      "candidateName": "MUHAMMAD FAYIZ B",
      "chestNO": 1310,
      "photo": "{\"key\": \"candidate-1554.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-1554.jpg\", \"eTag\": \"\\\"b67bbcf7340882a42ac47066c4032e16\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    {
      "position": null,
      "grade": "B",
      "point": 3,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "NHIA-PATTAMBI",
      "candidateName": "Shebin",
      "chestNO": 1598,
      "photo": "{\"key\": \"candidate-3137.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3137.jpg\", \"eTag\": \"\\\"42d28c03dece6be870999a7bd7b96d06\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    {
      "position": null,
      "grade": "B",
      "point": 3,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "NHIA-PATTAMBI",
      "candidateName": "Shebin",
      "chestNO": 1598,
      "photo": "{\"key\": \"candidate-3137.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3137.jpg\", \"eTag\": \"\\\"42d28c03dece6be870999a7bd7b96d06\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    {
      "position": null,
      "grade": "B",
      "point": 3,
      "id": 1,
      "programCode": "BV1",
      "programName": "DICTIONARY MAKING ARB",
      "instituteShortName": "NHIA-PATTAMBI",
      "candidateName": "Shebin",
      "chestNO": 1598,
      "photo": "{\"key\": \"candidate-3137.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3137.jpg\", \"eTag\": \"\\\"42d28c03dece6be870999a7bd7b96d06\\\"\"}",
      "categoryName": "BIDĀYAH"
    },
    // {
    //   "position": "First",
    //   "grade": "A",
    //   "point": 10,
    //   "id": 217,
    //   "programCode": "NBX1",
    //   "programName": "HAND WRITING ARB",
    //   "instituteShortName": "DNEC-KASHIPATNA",
    //   "candidateName": "Ihsan Hussain",
    //   "chestNO": 6504,
    //   "photo": "{\"key\": \"candidate-3428.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3428.JPG\", \"eTag\": \"\\\"41a1ded5a131460cc4c958b44e53ec2e\\\"\"}",
    //   "categoryName": "BIDAYA"
    // },
    // {
    //   "position": "Second",
    //   "grade": "A",
    //   "point": 8,
    //   "id": 217,
    //   "programCode": "NBX1",
    //   "programName": "HAND WRITING ARB",
    //   "instituteShortName": "DHHC HANGAL",
    //   "candidateName": "Muhammad Jamal",
    //   "chestNO": 6517,
    //   "photo": "{\"key\": \"candidate-3536.jpeg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3536.jpeg\", \"eTag\": \"\\\"c4b42969c862ab3b35802f07f23f3748\\\"\"}",
    //   "categoryName": "BIDAYA"
    // },
    // {
    //   "position": "Third",
    //   "grade": "A",
    //   "point": 6,
    //   "id": 217,
    //   "programCode": "NBX1",
    //   "programName": "HAND WRITING ARB",
    //   "instituteShortName": "DHPC-PUNGANOOR",
    //   "candidateName": "MD ADIL RAIN",
    //   "chestNO": 6538,
    //   "photo": "{\"key\": \"candidate-3558.png\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-3558.png\", \"eTag\": \"\\\"99094f270bc32b1b230bf6d0a7b9bfd9\\\"\"}",
    //   "categoryName": "BIDAYA"
    // },
    // {
    //   "position": "First",
    //   "grade": "A",
    //   "point": 10,
    //   "id": 41,
    //   "programCode": "UV1",
    //   "programName": "MEMORY TEST",
    //   "instituteShortName": "MDIA-THALANGARA",
    //   "candidateName": "Mohammed Baqir T S ",
    //   "chestNO": 2062,
    //   "photo": "{\"key\": \"candidate-221.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-221.jpg\", \"eTag\": \"\\\"339462f0de43df46d678734348573955\\\"\"}",
    //   "categoryName": "ŪLĀ"
    // },
    // {
    //   "position": "Second",
    //   "grade": "A",
    //   "point": 8,
    //   "id": 41,
    //   "programCode": "UV1",
    //   "programName": "MEMORY TEST",
    //   "instituteShortName": "DSIA-THALASSERY",
    //   "candidateName": "Muhammed Sanah p",
    //   "chestNO": 2023,
    //   "photo": "{\"key\": \"candidate-57.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-57.jpg\", \"eTag\": \"\\\"51c3cac5f3a4444be619cbdd779a9aaf\\\"\"}",
    //   "categoryName": "ŪLĀ"
    // },
    // {
    //   "position": "Third",
    //   "grade": "B",
    //   "point": 4,
    //   "id": 41,
    //   "programCode": "UV1",
    //   "programName": "MEMORY TEST",
    //   "instituteShortName": "DUDC-THOOTHA",
    //   "candidateName": "FAISAL SABITH CH",
    //   "chestNO": 2277,
    //   "photo": "{\"key\": \"candidate-1327.JPG\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-1327.JPG\", \"eTag\": \"\\\"800d35e899a9e087e87f19704e81cabc\\\"\"}",
    //   "categoryName": "ŪLĀ"
    // },
  ]
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

          <div className={`${s.program_results} ${s.main_card}`}>
            {
              programResultsData.map((item, index) =>
                <div className={s.card_container}>
                  <div className={s.card}
                    data-pos={item.position}
                  >
                    <div className={s.photo_div}
                      style={{ backgroundImage: `url('https://last-db.s3.amazonaws.com/candidate-889.jpg')` }}
                    ></div>
                    <div className={s.texts}>
                      <p className={s.chest}>{item.chestNO}</p>
                      <p className={s.name}>{item.candidateName}</p>
                      <p className={s.insti}>{replaceHyphenWithBreak(item.instituteShortName)}</p>
                      <p className={s.pos}>{convertLongPosToShort(item.position)}</p>
                      <p className={s.grade}>{item.grade}</p>
                      <p className={s.grade_label}>{item.grade ? 'GRADE': `WITHOUT \n GRADE`} </p>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
          <div className={`${s.institution_toppers} ${s.main_card}`}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Tvshow
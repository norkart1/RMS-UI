import React, { useEffect, useState } from 'react'
import { BaseApi, formatDate, timeToAgo } from '../helpers/functions'
import s from '../styles/TvShowTable.module.css'

export default function TvShowTable({ sessionID = 1, maxCount = 10, categories = [] }) {

  const [data, setData] = useState(null)
  const [time, setTime] = useState(null)

  const use_sample = false

  useEffect(() => {
    BaseApi.get(`public/final-result/scoreboard/all`).then((res) => {
      use_sample ? setData(sampleData.slice(0, maxCount)) : setData(res.data.data.slice(0, maxCount))
      console.log(res.data.data?.[0].categoryTotal.map((item) => item))
    })
    BaseApi.get(`public/final-result/updated-at-time`).then((res) => {
      setTime(res.data.data)
    })
  }, [data])




  const sampleData = [
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DHIU-CHEMMAD",
      "totalPoint": "113",
      "categoryTotal": [
        {
          "instituteID": 40,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "14"
        },
        {
          "instituteID": 40,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "20"
        },
        {
          "instituteID": 40,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "8"
        },
        {
          "instituteID": 40,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "34"
        },
        {
          "instituteID": 40,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "37"
        },
        {
          "instituteID": 40,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DHIC-KANNADIPPARAMBA",
      "totalPoint": "67",
      "categoryTotal": [
        {
          "instituteID": 8,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "8"
        },
        {
          "instituteID": 8,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 8,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "7"
        },
        {
          "instituteID": 8,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "30"
        },
        {
          "instituteID": 8,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "19"
        },
        {
          "instituteID": 8,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "MDIA-THALANGARA",
      "totalPoint": "63",
      "categoryTotal": [
        {
          "instituteID": 7,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 7,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "21"
        },
        {
          "instituteID": 7,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "11"
        },
        {
          "instituteID": 7,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "8"
        },
        {
          "instituteID": 7,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "23"
        },
        {
          "instituteID": 7,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "MRIC-CHELEMBRA",
      "totalPoint": "56",
      "categoryTotal": [
        {
          "instituteID": 12,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "10"
        },
        {
          "instituteID": 12,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "16"
        },
        {
          "instituteID": 12,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "5"
        },
        {
          "instituteID": 12,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "9"
        },
        {
          "instituteID": 12,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "16"
        },
        {
          "instituteID": 12,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DUDC-THOOTHA",
      "totalPoint": "43",
      "categoryTotal": [
        {
          "instituteID": 15,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "18"
        },
        {
          "instituteID": 15,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 15,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "4"
        },
        {
          "instituteID": 15,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "11"
        },
        {
          "instituteID": 15,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "10"
        },
        {
          "instituteID": 15,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DIIA-PANDIKKAD",
      "totalPoint": "37",
      "categoryTotal": [
        {
          "instituteID": 18,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "12"
        },
        {
          "instituteID": 18,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        },
        {
          "instituteID": 18,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "11"
        },
        {
          "instituteID": 18,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 18,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "14"
        },
        {
          "instituteID": 18,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DSIA-THALASSERY",
      "totalPoint": "37",
      "categoryTotal": [
        {
          "instituteID": 17,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "8"
        },
        {
          "instituteID": 17,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "6"
        },
        {
          "instituteID": 17,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 17,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "10"
        },
        {
          "instituteID": 17,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "13"
        },
        {
          "instituteID": 17,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DFIA-THALIPPARAMBA",
      "totalPoint": "35",
      "categoryTotal": [
        {
          "instituteID": 16,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "6"
        },
        {
          "instituteID": 16,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "10"
        },
        {
          "instituteID": 16,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 16,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "6"
        },
        {
          "instituteID": 16,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "13"
        },
        {
          "instituteID": 16,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "BUAC-MANIYOOR",
      "totalPoint": "35",
      "categoryTotal": [
        {
          "instituteID": 10,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "12"
        },
        {
          "instituteID": 10,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 10,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "17"
        },
        {
          "instituteID": 10,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 10,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 10,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "SHIC-PARAPPUR",
      "totalPoint": "34",
      "categoryTotal": [
        {
          "instituteID": 3,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "6"
        },
        {
          "instituteID": 3,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "17"
        },
        {
          "instituteID": 3,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "11"
        },
        {
          "instituteID": 3,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 3,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 3,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "IUAC-TANUR",
      "totalPoint": "32",
      "categoryTotal": [
        {
          "instituteID": 2,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 2,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "11"
        },
        {
          "instituteID": 2,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 2,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "4"
        },
        {
          "instituteID": 2,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "11"
        },
        {
          "instituteID": 2,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "SFADC-ODAMALA",
      "totalPoint": "25",
      "categoryTotal": [
        {
          "instituteID": 14,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 14,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "6"
        },
        {
          "instituteID": 14,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "12"
        },
        {
          "instituteID": 14,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 14,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "4"
        },
        {
          "instituteID": 14,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "NRIC-CHAMAKKALA",
      "totalPoint": "17",
      "categoryTotal": [
        {
          "instituteID": 13,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 13,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 13,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 13,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 13,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "11"
        },
        {
          "instituteID": 13,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DNAC-KOONANCHERY",
      "totalPoint": "16",
      "categoryTotal": [
        {
          "instituteID": 9,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "4"
        },
        {
          "instituteID": 9,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 9,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 9,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "6"
        },
        {
          "instituteID": 9,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 9,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "NHIA-PATTAMBI",
      "totalPoint": "14",
      "categoryTotal": [
        {
          "instituteID": 21,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 21,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 21,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "14"
        },
        {
          "instituteID": 21,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DNIC-VALLAPUZHA",
      "totalPoint": "14",
      "categoryTotal": [
        {
          "instituteID": 11,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 11,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "11"
        },
        {
          "instituteID": 11,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 11,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 11,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 11,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DHDC-MANUR",
      "totalPoint": "14",
      "categoryTotal": [
        {
          "instituteID": 5,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 5,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "5"
        },
        {
          "instituteID": 5,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 5,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 5,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "9"
        },
        {
          "instituteID": 5,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "FATHIMA-ZAHRA CHEMMAD",
      "totalPoint": "14",
      "categoryTotal": [
        {
          "instituteID": 41,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "8"
        },
        {
          "instituteID": 41,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 41,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        },
        {
          "instituteID": 41,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 41,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "3"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DH-NEDUMANGAD",
      "totalPoint": "12",
      "categoryTotal": [
        {
          "instituteID": 25,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 25,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 25,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "6"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "KMO-KODUVALLY",
      "totalPoint": "11",
      "categoryTotal": [
        {
          "instituteID": 19,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 19,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        },
        {
          "instituteID": 19,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "11"
        },
        {
          "instituteID": 19,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 19,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 19,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "SHIA-KUTTIKATTUR",
      "totalPoint": "10",
      "categoryTotal": [
        {
          "instituteID": 23,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "4"
        },
        {
          "instituteID": 23,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "6"
        },
        {
          "instituteID": 23,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 23,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "MIAC-PONNANI",
      "totalPoint": "6",
      "categoryTotal": [
        {
          "instituteID": 4,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 4,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 4,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 4,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "3"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "SIA-VAKERY",
      "totalPoint": "6",
      "categoryTotal": [
        {
          "instituteID": 22,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        },
        {
          "instituteID": 22,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 22,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "3"
        },
        {
          "instituteID": 22,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "3"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "MU-ARATTUPUZHA",
      "totalPoint": "3",
      "categoryTotal": [
        {
          "instituteID": 24,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "3"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "AHIA-KALAMASSERY",
      "totalPoint": "3",
      "categoryTotal": [
        {
          "instituteID": 20,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 20,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 20,
          "categoryID": 5,
          "categoryName": "ᾹLIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 20,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 20,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 20,
          "categoryID": 6,
          "categoryName": "KULLIYAH ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "MIC-UDUMA",
      "totalPoint": "3",
      "categoryTotal": [
        {
          "instituteID": 6,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 6,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "3"
        },
        {
          "instituteID": 6,
          "categoryID": 3,
          "categoryName": "THĀNIYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 6,
          "categoryID": 4,
          "categoryName": "THĀNAWIYYAH",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "SMAC-AMINI-DWEEP",
      "totalPoint": "0",
      "categoryTotal": [
        {
          "instituteID": 26,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        },
        {
          "instituteID": 26,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 1,
      "sessionName": "General",
      "instituteShortName": "DARUL BANATH EDAPPALLI",
      "totalPoint": "0",
      "categoryTotal": [
        {
          "instituteID": 42,
          "categoryID": 2,
          "categoryName": "ŪLĀ",
          "totalPoint": "0"
        },
        {
          "instituteID": 42,
          "categoryID": 1,
          "categoryName": "BIDĀYAH",
          "totalPoint": "0"
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "DHBC-WEST-BENGAL",
      "totalPoint": "64",
      "categoryTotal": [
        {
          "instituteID": 46,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "6"
        },
        {
          "instituteID": 46,
          "categoryID": 11,
          "categoryName": "ALIYA",
          "totalPoint": null
        },
        {
          "instituteID": 46,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "22"
        },
        {
          "instituteID": 46,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "33"
        },
        {
          "instituteID": 46,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "3"
        },
        {
          "instituteID": 46,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "DH-NIICS",
      "totalPoint": "63",
      "categoryTotal": [
        {
          "instituteID": 44,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "1"
        },
        {
          "instituteID": 44,
          "categoryID": 11,
          "categoryName": "ALIYA",
          "totalPoint": null
        },
        {
          "instituteID": 44,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        },
        {
          "instituteID": 44,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "15"
        },
        {
          "instituteID": 44,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "29"
        },
        {
          "instituteID": 44,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "18"
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "QIAC-MUMBAI",
      "totalPoint": "39",
      "categoryTotal": [
        {
          "instituteID": 51,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "4"
        },
        {
          "instituteID": 51,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "26"
        },
        {
          "instituteID": 51,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "9"
        },
        {
          "instituteID": 51,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "NHIA-MADANNOOR",
      "totalPoint": "37",
      "categoryTotal": [
        {
          "instituteID": 49,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "8"
        },
        {
          "instituteID": 49,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "21"
        },
        {
          "instituteID": 49,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "3"
        },
        {
          "instituteID": 49,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "5"
        },
        {
          "instituteID": 49,
          "categoryID": 11,
          "categoryName": "ALIYA",
          "totalPoint": null
        },
        {
          "instituteID": 49,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "DHAC-ASSAM",
      "totalPoint": "36",
      "categoryTotal": [
        {
          "instituteID": 47,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "4"
        },
        {
          "instituteID": 47,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "14"
        },
        {
          "instituteID": 47,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "0"
        },
        {
          "instituteID": 47,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        },
        {
          "instituteID": 47,
          "categoryID": 11,
          "categoryName": "ALIYA",
          "totalPoint": null
        },
        {
          "instituteID": 47,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "18"
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "DNEC-KASHIPATNA",
      "totalPoint": "33",
      "categoryTotal": [
        {
          "instituteID": 48,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "24"
        },
        {
          "instituteID": 48,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "6"
        },
        {
          "instituteID": 48,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "0"
        },
        {
          "instituteID": 48,
          "categoryID": 11,
          "categoryName": "ALIYA",
          "totalPoint": null
        },
        {
          "instituteID": 48,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "3"
        },
        {
          "instituteID": 48,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "DHPC-PUNGANOOR",
      "totalPoint": "13",
      "categoryTotal": [
        {
          "instituteID": 45,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "3"
        },
        {
          "instituteID": 45,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "9"
        },
        {
          "instituteID": 45,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "1"
        },
        {
          "instituteID": 45,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "0"
        },
        {
          "instituteID": 45,
          "categoryID": 11,
          "categoryName": "ALIYA",
          "totalPoint": null
        },
        {
          "instituteID": 45,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        }
      ]
    },
    {
      "sessionID": 2,
      "sessionName": "NIICS",
      "instituteShortName": "DHHC HANGAL",
      "totalPoint": "12",
      "categoryTotal": [
        {
          "instituteID": 50,
          "categoryID": 7,
          "categoryName": "BIDAYA",
          "totalPoint": "0"
        },
        {
          "instituteID": 50,
          "categoryID": 8,
          "categoryName": "ULA",
          "totalPoint": "9"
        },
        {
          "instituteID": 50,
          "categoryID": 9,
          "categoryName": "THANIYA",
          "totalPoint": "3"
        },
        {
          "instituteID": 50,
          "categoryID": 10,
          "categoryName": "THANAWIYYA",
          "totalPoint": "0"
        },
        {
          "instituteID": 50,
          "categoryID": 12,
          "categoryName": "KULLIYYA",
          "totalPoint": null
        }
      ]
    }
  ]
  // use mannualy typed, it is in disordered
  const sample_categories = data?.[0].categoryTotal.map((item) => item)
  return (
    <div className={s.page} >
      <div className={s.container}>
        <div className={s.header}>
          <h1>SIBAQ SCOREBOARD </h1>
          <p>{timeToAgo(time).toUpperCase()}</p>

          <p>{formatDate(time, false, true)}</p>

        </div>
        <table className={s.table}>
          <tbody>

            <tr className={`${s.rotate} ${s.tr}`}>
              <th className={`${s.rotate} ${s.th}`}> INSTITUTES </th>
              {
                data?.map((insti, index) => {
                  return (
                    // INSTITUTION NAMES
                    <th className={`${s.rotate} ${s.th}`}><div><span>{insti.instituteShortName}</span></div></th>
                  )
                })
              }
              <th className={`${s.th} ${s.last}`} >......</th>

            </tr>
            {
              sample_categories?.map((cat, index) => {
                return (

                  <tr className={`${s.rotate} ${s.tr}`}>

                    <th className={`${s.th} ${s.categories}`}>{cat.categoryName}</th>
                    {
                      data.map((insti, index) => {
                        return (
                          // INSTITUTION SCORES
                          <td className={s.td}>{insti.categoryTotal.find((item) => item.categoryID == cat.categoryID)?.totalPoint}</td>
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
                    <th className={`${s.th} ${s.foot}`}>{insti?.percentage}</th>
                  )
                })
              }
              <th className={`${s.th} ${s.last}`} ></th>
            </tr>
          </tbody>
        </table>
        <div className={s.ad}>
          <div className={s.marquee} behavior="smooth" direction="">
            <p>VISIT SIBAQ.IN TO SEE PUBLISHED RESULTS INSTANTLY</p>
          </div>
        </div>
      </div>
    </div>
  )
}

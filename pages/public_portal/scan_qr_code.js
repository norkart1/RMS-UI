import React, { useState } from 'react'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/scan_qr.module.css'
import QrScanner from 'qr-scanner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ImageIcon from '../../public/assets/svg/image.svg'
import { BaseApi, convert24hourTo12hour, convertLongPosToShort, timeToAgo } from '../../helpers/functions'
import CandImage from '../../components/CandImage'
import ResultCard from '../../components/ResultCard'


function Scan_qr_code() {

  const [selectedQrImage, setSelectedQrImage] = useState(null)
  const [isDetailsShown, setIsDetailsShown] = useState(false)
  const [scannedChestNo, setScannedChestNo] = useState('')
  const [isTypeShown, setTypeShown] = useState(false)
  const [isResultCardShown, setResultCardShown] = useState(true)

  const [chestInput, setChestInput] = useState('')

  const use_sample = false

  const sampleData = {
    "name": "MOHAMMED WASIM SHAHAD SM",
    "chest_no": "2009",
    "photo": "{\"key\": \"candidate-13.jpg\", \"url\": \"https://last-db.s3.amazonaws.com/candidate-13.jpg\", \"eTag\": \"\\\"634dc6c5a9897dd44a03ea1181055dc2\\\"\"}",
    "gender": "M",
    "institute": "MDIA-THALANGARA",
    "category": "BIDĀYAH",
    "program": [
      {
        "name": "MEMORY TEST",
        "type": "SINGLE",
        "skill": "MEMORY",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": "Venue 1",
        "code": "BV2",
        "entered": "True",
        "published": "True",
        "result": {
          "position": "First",
          "grade": "A",
        }
      },
      {
        "name": "MEMORY TEST",
        "type": "SINGLE",
        "skill": "MEMORY",
        "date": "12/02/2022",
        "time": "02:00:00 AM",
        "venue": "null",
        "code": "BV2",
        "entered": "False",
        "published": "False",

      },
      {
        "name": "MEMORY TEST",
        "type": "SINGLE",
        "skill": "MEMORY",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": "Venue 1",
        "code": "BV2",
        "entered": "True",
        "published": "True",
        "result": {
          "position": "Second",
          "grade": "A",
        }
      },
      {
        "name": "MEMORY TEST",
        "type": "SINGLE",
        "skill": "MEMORY",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": "Venue 1",
        "code": "BV2",
        "entered": "True",
        "published": "True",
        "result": {
          "position": "Third",
          "grade": "A",
        }
      },
      {
        "name": "MEMORY TEST",
        "type": "SINGLE",
        "skill": "MEMORY",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": "Venue 1",
        "code": "BV2",
        "entered": "True",
        "published": "True",
        "result": {
          "position": false,
          "grade": "A",
        }
      },

    ]
  }
  const [candidateData, setCandidateData] = useState([])



  // useEffect(() => {

  // }, [isDetailsShown])



  // CAMERA SCANNER
  let qrScanner
  useEffect(() => {
    let scanResult;
    qrScanner = new QrScanner(document.getElementById('qrVideoEl'), (result) => {
      console.log(result)
      scanResult = result?.data;
      doAfterScanning(result?.data)
    }, {
      highlightScanRegion: true,
      highlightCodeOutline: true,
      maxScansPerSecond: 1,

    });
    qrScanner.setInversionMode('both');
    qrScanner.setGrayscaleWeights(255, 255, 255, true);
    qrScanner.start().then((res) => {
    })
      .catch(err => {
        console.log('error starting', err);
      });

    // qrScanner._updateOverlay()

    // }, [isDetailsShown])
  }, [])


  // FILE SCANNER
  useEffect(() => {
    let scanResult;
    console.log('started scanning image')
    if (selectedQrImage) {
      QrScanner.scanImage(selectedQrImage)
        .then(result => {
          if (scanResult !== result) {
            scanResult = result
            doAfterScanning(result)
          }
        })
        .catch(error => toast.error('No QR code found or there was some error.'))
        .finally(() => {
          document.getElementById('file').value = null
          console.log('finished')
        });
    }
  }, [selectedQrImage])

  useEffect(() => {
    document.getElementById('qrVideoEl').style.display = isDetailsShown ? 'none' : 'block'
    // isDetailsShown ? qrScanner.pause() : qrScanner?.start()
  }, [isDetailsShown])



  const selectFile = async () => {
    document.getElementById('file').click()
  }
  const handleFileSelectionChange = (e) => {
    setSelectedQrImage(e.target.files[0])
  }

  const doAfterScanning = async (scanRes) => {
    console.log('doAfterScanning', scanRes)
    const regCand = /N?[\d]{4}/;
    const regUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/;
    const regTelegram = /t.me\/\w+/;
    console.log(scanRes)

    if (regCand.test(scanRes)) {
      console.log('is candidate')
      const chest = scanRes.replace('N', '').replace('n', '').replace(' ', '').substring(0, 4)
      setScannedChestNo(chest)

      if (chest) {

        BaseApi.get(`public/candidate/details/${chest}`).then(res => {
          if (res.data.success) {
            use_sample ? setCandidateData(sampleData): setCandidateData(res.data.data)
            console.log(res.data.data)
            setIsDetailsShown(true)

          }
        })
          .catch(err => {
            console.log(err)
          }
          )
      }

    }
    else if (regUrl.test(scanRes)) {
      // window.location.href = scanRes

      const newWindow = window.open(undefined, '_blank')
      newWindow.location = scanRes;
    }
    else if (regTelegram.test(scanRes)) {
      window.open(scanRes, '_blank')
    }
    // else {
    //   toast.error('QR code is not valid')
    // }
  }

  return (
    <Layout openedTabName={`SCAN QR \n CODE`} style={{ padding: '0', overflow: 'hidden' }}>
      <div className={s.videoContainer} id='video-container'>
        <video className={s.qrVideoEl} src="" id='qrVideoEl' ></video>
      </div>
      <input type="file" id="file" accept=".jpg, .png, " style={{ display: 'none' }} onChange={handleFileSelectionChange} />
      <div className={s.buttons}>
        <button className={s.btnSelectImage} onClick={selectFile}>SELECT IMAGE</button>
        <button className={s.btnType} onClick={() => setTypeShown(!isTypeShown)}>TYPE CHEST NUMBER</button>
      </div>
      <div className={`${s.detailsShow} ${isDetailsShown ? s.isShown : s.isNotShown}`} id='detailsShow'>
        <div className={s.divCloseBtn} onClick={() => setIsDetailsShown(false)}>
          <img className={s.btnClose} src='/assets/svg/close.svg' />
        </div>
        <div className={s.detailContainer}>
          <div className={s.candDetail}>
            <div className={s.divPhoto}>
              <img className={s.photo} src={candidateData.photo ? JSON.parse(candidateData.photo)?.url : ''} alt="" />
              {/* <CandImage className={s.photo} src={JSON.parse(candidateData.photo)?.url} /> */}
            </div>
            {/* <div className={s.candDetailScrollable}> */}
            <div className={s.divName}>
              <h3 className={s.name}>{candidateData.name}</h3>
              <h4 className={s.chestNo}>{scannedChestNo}</h4>
            </div>
            <div className={s.divInsti}>
              <h5>INSTITUTION</h5>
              <h4>{candidateData.institute}</h4>
            </div>
            <div className={s.divCat}>
              <h5>CATEGORY</h5>
              <h4>{candidateData.category}</h4>
            </div>
            <div className={s.divGender}>
              <h5>GENDER</h5>
              <h4>{candidateData.gender == 'F' ? 'FEMALE' : 'MALE'}</h4>
            </div>
            <div className={s.divPrograms}>
              <h5>PROGRAMS COUNT</h5>
              <h4>0{candidateData.program?.length}</h4>
            </div>
            {/* </div> */}

          </div>
          <div className={s.programDetail}>
            <h3>PROGRAMS</h3>
            <div className={s.divProgramsCards}>
              <div className={s.cards}>
                {
                  candidateData.program?.map((program, index) => (
                    <div className={s.card} data-pos={program.result?.position}
                      data-text={
                        program.entered == "True" ?
                          program.published == "True" ?
                            program.result?.position ?
                              program.result?.grade ?
                                `${convertLongPosToShort(program.result?.position)} with ${program.result?.grade} grade` :
                                `${convertLongPosToShort(program.result?.position)} without any grade` :
                              `${program.result?.grade ? program.result?.grade : 'No'} grade` :
                            "Not published yet" :
                          `Scheduled to be ${timeToAgo(program.date.replace(' 00:00:00', '') + " " + program.time)}`
                      }
                      key={index}
                    >
                      <h4 className={s.cardTitle}>{program.name}</h4>
                      <p className={s.prCode} style={{color:'#684a4a'}}>{program.venue.toUpperCase()}</p>
                      <p className={s.prSkill}>#{program.skill}</p>
                      <p className={s.prSkill} style={{marginBottom:'2rem'}}>{program.type}</p>
                      <p className={s.prLabel}>SCHEDULE:</p>
                      <p className={s.prDate}>{program.date.replace(' 00:00:00', '')}</p>
                      <p className={s.prTime}>{convert24hourTo12hour(program.time)}</p>
                      <p className={s.prDynDate}>{timeToAgo(program.date + " " + program.time)}</p>
                      {/* <p className={s.prPos}>{program.position}</p>
                      <p className={s.prGrade}>{program.grade}</p> */}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        isTypeShown &&
        <div className={s.typeShow}>
          <div className={s.typeContainer}>
            <div className={s.divCloseBtn} style={{ marginBottom: '2rem' }} onClick={() => setTypeShown(false)}>
              <img className={s.btnClose} src='/assets/svg/close.svg' />
            </div>
            <form action="#">

              <input type="text" name="" id="chestInput" onChange={(e) => setChestInput(e.target.value)} />
              {/* <br /> */}
              <button onClick={() => doAfterScanning(chestInput) & setTypeShown(false)}>Submit</button>
            </form>
          </div>
        </div>
      }

      <ResultCard />

      <div id="null"></div>
    </Layout >
  )
}

export default Scan_qr_code

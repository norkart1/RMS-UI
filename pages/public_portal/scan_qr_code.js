import React, { useState } from 'react'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/scan_qr.module.css'
import QrScanner from 'qr-scanner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ImageIcon from '../../public/assets/svg/image.svg'
import { BaseApi, convertLongPosToShort, timeToAgo } from '../../helpers/functions'


function Scan_qr_code() {

  const [selectedQrImage, setSelectedQrImage] = useState(null)
  const [isDetailsShown, setIsDetailsShown] = useState(false)
  const [scannedChestNo, setScannedChestNo] = useState('')
  const [isTypeShown, setTypeShown] = useState('')

  const [chestInput, setChestInput] = useState('')
  const sampleData = {
    "name": "MOHAMMED WASIM SHAHAD SM",
    "chest_no": "2009",
    "photo": "{key: candidate-12.jpg, url: https://last-db.s3.amazonaws.com/candidate-12.jpg, eTag: \\23b3ef264dc06acf0064068def9cedf8\\}",
    "gender": "M",
    "institute": "MDIA-THALANGARA",
    "category": "BIDĀYAH",
    "programs": [
      {
        "name": "MEMORY TEST",
        "type": "SINGLE",
        "skill": "MEMORY",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "position": "First",
        "grade": "A",
        "venue": null,
        "code": "BV2",
        "entered": "True",
        "published": "True"
      },
      {
        "name": "SONG MLM",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "position": "Second",
        "code": "BW13",
        "entered": "True",
        "published": "True"
      },
      {
        "name": "SPEECH & SONG MLM",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "position": "Third",
        "code": "BW15",
        "entered": null,
        "published": "True"
      },
      {
        "name": "GROUP SONG",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "code": "BW8",
        "entered": "True",
        "published": "False"
      },
      {
        "name": "ḤIFẒ",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "code": "BW9",
        "entered": null,
        "published": null
      },
      {
        "name": "SPEECH & SONG MLM",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "code": "BW15",
        "entered": null,
        "published": null
      },
      {
        "name": "GROUP SONG",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "code": "BW8",
        "entered": null,
        "published": null
      },
      {
        "name": "ḤIFẒ",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "code": "BW9",
        "entered": null,
        "published": null
      },
    ]
  }
  const [candidateData, setCandidateData] = useState({})



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

    qrScanner._updateOverlay()

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
    document.getElementById('qrVideoEl').style.display = isDetailsShown ? 'none': 'block'
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
      const chest = scanRes.slice(0, scanRes.indexOf(" "))
      setScannedChestNo(chest)

      if (chest) {
        setIsDetailsShown(true)

        BaseApi.get(`public/candidate/details/${chest}`).then(res => {
          // if (res.data.status) {
          setCandidateData(res.data.data)
          console.log(res.data.data)
        })
          .catch(err => {
            toast.error('Not found!')
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
    <Layout openedTabName='SCAN QR' style={{ padding: '0', overflow: 'hidden' }}>
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
                        program.published == "True" ? `${convertLongPosToShort(program.result?.position)} prize with${program.result?.grade ? " " + program.result?.grade : "out any"} grade` :
                          "Not published yet"}
                      key={index}
                    >
                      <h4 className={s.cardTitle}>{program.name}</h4>
                      <p className={s.prSkill}>#{program.skill}</p>
                      <p className={s.prCode}>{program.code}</p>
                      <p className={s.prType}>{program.type}</p>
                      <p className={s.prLabel}>SCHEDULE:</p>
                      <p className={s.prDate}>{program.date}</p>
                      <p className={s.prTime}>{program.time}</p>
                      <p className={s.prDynDate}>{timeToAgo(program.date + " " + program.time)}</p>
                      <p className={s.prVenue}>{program.venue}</p>
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

      {isTypeShown &&
        <div className={s.typeShow}>
          <div className={s.typeContainer}>
            <div className={s.divCloseBtn} style={{ marginBottom: '2rem' }} onClick={() => setTypeShown(false)}>
              <img className={s.btnClose} src='/assets/svg/close.svg' />
            </div>
            {/* <form action="#"> */}

              <input type="text" name="" id="chestInput" onChange={(e) => setChestInput(e.target.value)} />
              {/* <br /> */}
              <button onClick={() => doAfterScanning(chestInput) & setTypeShown(false)}>Submit</button>
            {/* </form> */}
          </div>
        </div>
      }
      <div id="null"></div>
    </Layout>
  )
}

export default Scan_qr_code

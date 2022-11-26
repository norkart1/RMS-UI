import React, { useState } from 'react'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/scan_qr.module.css'
import QrScanner from 'qr-scanner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ImageIcon from '../../public/assets/svg/image.svg'
import { convertLongPosToShort, timeToAgo } from '../../helpers/functions'


function Scan_qr_code() {

  const [selectedQrImage, setSelectedQrImage] = useState(null)
  const [isDetailsShown, setIsDetailsShown] = useState(true)
  const [scannedChestNo, setScannedChestNo] = useState('')
  const sampleData = {
    "name": "MOHAMMED WASIM SHAHAD SM",
    "chest_no": "2009",
    "photo": "{key: candidate-12.jpg, url: https://last-db.s3.amazonaws.com/candidate-12.jpg, eTag: \\23b3ef264dc06acf0064068def9cedf8\\}",
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
        "position": "First",
        "grade": "A",
        "venue": null,
        "code": "BV2",
        "entered": null,
        "published": "False"
      },
      {
        "name": "SONG MLM",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "position": "Second",
        "code": "BW13",
        "entered": null,
        "published": null
      },
      {
        "name": "SPEECH & SONG MLM",
        "date": "11/30/2022",
        "time": "02:00:00 AM",
        "venue": null,
        "position": "Third",
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
  const [candidateData, setCandidateData] = useState(sampleData)



  useEffect(() => {

  }, [scannedChestNo])



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

  }, [isDetailsShown])


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
    if (isDetailsShown) document.getElementById('qrVideoEl').style.display = 'none'
    else document.getElementById('qrVideoEl').style.display = 'block'
  }, [isDetailsShown])



  const selectFile = async () => {
    document.getElementById('file').click()
  }
  const handleFileSelectionChange = (e) => {
    // console.log(e.target.files[0])
    setSelectedQrImage(e.target.files[0])
  }

  const doAfterScanning = (scanRes) => {
    console.log('doAfterScanning', scanRes)
    const regCand = /N?\d+ [\w\s]+/;
    const regUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/;
    const regTelegram = /t.me\/\w+/;

    if (regCand.test(scanRes)) {
      setIsDetailsShown(true)
      setScannedChestNo(scanRes.slice(0, scanRes.indexOf(" ")))
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
      <div className={s.container}>
        <video className={s.qrVideoEl} src="" id='qrVideoEl' ></video>
      </div>
      <input type="file" id="file" accept=".jpg, .png, " style={{ display: 'none' }} onChange={handleFileSelectionChange} />
      <button className={s.btnSelectImage} onClick={selectFile}><ImageIcon width={20} /></button>
      <div className={`${s.detailsShow} ${isDetailsShown ? s.isShown : s.isNotShown}`} id='detailsShow'>
        <div className={s.divCloseBtn} onClick={() => setIsDetailsShown(false)}>
          <img className={s.btnClose} src='/assets/svg/close.svg' />
        </div>
        <div className={s.detailContainer}>
          <div className={s.candDetail}>
            <div className={s.divPhoto}>
              <img className={s.photo} src={"https://last-db.s3.amazonaws.com/candidate-12.jpg"} alt="" />
            </div>
            <div className={s.divName}>
              <h3 className={s.name}>{candidateData.name}</h3>
              <h4 className={s.chestNo}>{candidateData.chest_no}</h4>
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
              <h5>INSTITUTION</h5>
              <h4>{candidateData.gender == 'M' ? 'MALE' : 'FEMALE'}</h4>
            </div>
            <div className={s.divPrograms}>
              <h5>PROGRAMS COUNT</h5>
              <h4>{candidateData.program.length}</h4>
            </div>
          </div>
          <div className={s.programDetail}>
            <h3>PROGRAMS</h3>
            <div className={s.divProgramsCards}>
              <div className={s.cards}>
                {
                  candidateData.program.map((program, index) => (
                    <div className={s.card} data-pos={program.position}
                      data-text={`${convertLongPosToShort(program.position)} prize with${program.grade ? " "+program.grade: "out any"} grade`}>
                      <h4 className={s.cardTitle}>{program.name}</h4>
                      <p className={s.prCode}>{program.code}</p>
                      <p className={s.prType}>{program.type}</p>
                      <p className={s.prSkill}>#{program.skill}</p>
                      <p className={s.prDate}>{program.date}</p>
                      <p className={s.prTime}>{program.time}</p>
                      <p className={s.prDynDate}>{timeToAgo(program.date + " " + program.time)}</p>
                      <p className={s.prVenue}>{program.venue}</p>
                      <p className={s.prPos}>{program.position}</p>
                      <p className={s.prGrade}>{program.grade}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="null"></div>
    </Layout>
  )
}

export default Scan_qr_code

import React from 'react'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/scan_qr.module.css'
import QrScanner from 'qr-scanner'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ImageIcon from '../../public/assets/svg/image.svg'


function Scan_qr_code() {

  const [selectedQrImage, setSelectedQrImage] = React.useState(null)
  const [isDetailsShown, setIsDetailsShown] = React.useState(false)
  const [scannedChestNo, setScannedChestNo] = React.useState('')


  // CAMERA SCANNER
  useEffect(() => {
    let scanResult;
    const qrScanner = new QrScanner(document.getElementById('qrVideoEl'), (result) => {
      // if (scanResult !== result?.data) {
      scanResult = result?.data;
      doAfterScanning(result?.data)
      // }
    }, {
      highlightScanRegion: true,
      highlightCodeOutline: true,

    });
    qrScanner.start().then(() => {
      console.log('started camera scan');
    }).catch(err => {
      console.log('error starting', err);
    });

    qrScanner._updateOverlay()
    setTimeout(() => {
      scanResult = null;
    }, 2000);
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

    if (regCand.test(scanRes)) {
      setIsDetailsShown(true)
      setScannedChestNo(scanRes.slice(0, scanRes.indexOf(" ")))
    }
    else if (regUrl.test(scanRes)) { 
      window.location.href = scanRes
    } else {
      toast.error('QR code is not valid')
    }
  }

  // useEffect(() => {
  //   document.onkeyup, (e) => {
  //     // on escape press
  //     if (e.keyCode == 'Escape' || e.keyCode == 27) {
  //       setIsDetailsShown(false)
  //       console.log('pressed')
  //     }
  //   }
  // }, [])


  return (
    <Layout openedTabName='SCAN QR' style={{ padding: '0', overflow: 'hidden' }}>
      <div className={s.container}>
        <video className={s.qrVideoEl} src="" id='qrVideoEl' ></video>
      </div>
      <input type="file" id="file" accept=".jpg, .png, " style={{ display: 'none' }} onChange={handleFileSelectionChange} />
      <button className={s.btnSelectImage} onClick={selectFile}><ImageIcon width={20} /></button>
      <div className={`${s.detailsShow} ${isDetailsShown ? s.isShown : s.isNotShown}`} id='detailsShow'>
        <img className={s.btnClose} src='/assets/svg/close.svg' onClick={() => setIsDetailsShown(false)} />
        <h1>showing {scannedChestNo}</h1>
      </div>
    </Layout>
  )
}

export default Scan_qr_code

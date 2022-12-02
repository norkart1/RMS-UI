import React from 'react'
import Select from 'react-select'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/fin_result.module.css'
import baseApi from '../../api/baseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { catIdtoName, checkImage, reverseArray } from '../../helpers/functions'
import Loader from '../../components/loader'
// import printJS from 'print-js'
// import printSvg from '../../public/assets/svg/print.svg'


function FinalResults() {
  const [institutes, setInstitutes] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [isResultShown, setIsResultShown] = useState(false)
  const [selectedInstitutes, setSelectedInstitutes] = useState()
  const [selectedInstiResultCandidates, setSelectedInstiResultCandidates] = useState([])
  const [sessionId, setSessionId] = useState('1')
  const [isListLoading, setIsListLoading] = useState(true)


  const [ppUrl, setPpUrl] = useState('https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png')
  useEffect(() => {
    setIsListLoading(true)
    baseApi.get(`/public/final-result/institutes/?sessionID=${sessionId}`).then(res => {
      setInstitutes(res.data.data)
      setSearchOptions([])
      res.data.data.map(institute => {
        setSearchOptions(prev => [...prev, { value: institute.id, label: institute.shortName, institute }])
      })
    }).finally(() => {
      setIsListLoading(false)
    })

  }, [sessionId])

  const handleProgramClick = (institute) => {
    showResult(institute)

  }
  const handleSearchSelectionChange = (institute) => {
    showResult(institute)
  }
  const showResult = (institute) => {
    setSelectedInstitutes(institute)

    // baseApi.get(`public/final-result/candidates/institutes/${institute.id}`).then((res) => {
    baseApi.get(`public/final-result/institutes/${institute.id}`).then((res) => {
      setSelectedInstiResultCandidates(res.data.data)

    }).then(() => {
      setIsResultShown(true)
    })

    setTimeout(() => {

      const showedElement = document.getElementById('result')
      showedElement.scrollTo({behavior: 'auto', top: 0, left: 0})

    }, 500);

  }
  const printCandidates = () => {
    const printJS = require('print-js')
    printJS('printArea', 'html')
  }
  const sessionOpts = [
    { value: '1', label: ' GENERAL' },
    { value: '2', label: 'NIICS' },
  ]


  return (
    <Layout openedTabName={`Institution based \n Final Results `}>
      <div className={s.pageContainer}>
        <div className={s.header}>
          <h1 style={{ margin: '0' }}>Final Round Results</h1>
          <div className="flex-grow"></div>
          <Select className={s.selectSession} options={sessionOpts} isSearchable={false} onChange={(e) => setSessionId(e.value)} placeholder={' GENERAL'}></Select>
        </div>
        <div className={`${s.searchArea} ${s.stickySearch}`}>
          <img src="/assets/png/search.png" alt="" style={{ padding: '2rem 2rem 2rem 0', width: '4rem', cursor: 'pointer' }} />
          <Select className={s.searchSelect} options={searchOptions} onChange={(e) => handleSearchSelectionChange(e.institute)} placeholder='Search and Select Institutions'></Select>
        </div>
        <div className={s.programCards}>
          {
            isListLoading ?
              <Loader />
              :
              institutes.map((item, index) => {
                const SiNo = index + 1
                return (
                  <div className={s.programItem} key={index} onClick={() => handleProgramClick(item)}>
                    {SiNo}. {item.shortName}
                  </div>
                )
              })}
        </div>

        <div className={`${s.resultShow} ${isResultShown ? s.isShown : ''}`} id='result'>

          {/* <button onClick={() => printCandidates()} style={{ padding: '.5rem 1rem', cursor: 'pointer' }}> <img src="/assets/png/print.png" width='12' alt="" /> Print</button> */}
          <div className={s.divCloseBtn} style={{ marginBottom: '2rem' }} onClick={() => setIsResultShown(false)}>
            <img className={s.btnClose} src='/assets/svg/close.svg' />
          </div>
          {selectedInstiResultCandidates.length !== 0 && <h2 style={{ textAlign: 'left', opacity: '.7', color: '#525a82' }}> {selectedInstiResultCandidates.length} RESULTS </h2>}
          <h1>RESULTS OF <br />
            {selectedInstitutes?.shortName} <br />
            {selectedInstitutes?.name.toUpperCase()} <br />
          </h1>
          <div className={s.resultCards} id='printArea'>
            {selectedInstiResultCandidates.map((item, index) => {
              return (
                <div className={`${s.i_card} ${s.card} ${s.resultContents}`} key={index} data-pos={item?.position}>
                  {/* <img className={s.candImage} src={item.candidate.photo.url} alt="" /> */}
                  <div className={s.candImage} style={{ margin: 'auto', backgroundImage: `url(${item?.candidate?.photo?.url})` }}></div>
                  <div className={s.centeredTexts}>
                    <h2 className={s.pos}>{item?.position}</h2>
                    <h3 className={s.grade}>{item?.grade} GRADE</h3>
                    <p style={{ maxWidth: '15rem' }}><b>{item.candidate.name.toUpperCase()}</b></p>
                    <p><b> {item.program?.type.toLowerCase() == 'group' && 'AND TEAM'}</b></p>
                    <p style={{ marginTop: '0' }}>{item.candidate.chestNO}</p>
                    <h5 style={{ marginBottom: '0' }}>{item.program?.name}</h5>
                    <h5 style={{ margin: '0' }}>{item.candidate?.category.name}</h5>
                  </div>

                </div>)
            }
            )}
          </div>
          <iframe id="ifmcontentstoprint" style={{ height: 0, width: 0, position: 'absolute' }}></iframe>
          {
            selectedInstiResultCandidates.length === 0 && <h3 style={{ margin: 'auto', textAlign: 'center', opacity: '.5' }}>NOTHING TO SHOW HERE YET</h3>
          }
        </div>
      </div>
    </Layout>
  )
}

export default FinalResults
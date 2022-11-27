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
    baseApi.get(`public/final-reuslt/institutes/${institute.id}`).then((res) => {
      setSelectedInstiResultCandidates(res.data.data)
      console.log(reverseArray(res.data.data))
    }).then(() => {
      setIsResultShown(true)
    })

  }
  const printCandidates = () => {
    const printJS = require('print-js')
    printJS('printArea', 'html')
  }
  const sessionOpts = [
    { value: '1', label: 'NON-NIICS' },
    { value: '2', label: 'NIICS' },
  ]


  return (
    <Layout openedTabName={`Final Results \n of Institutions`}>
      <div className={s.pageContainer}>
        <div className={s.header}>
          <h1 style={{ margin: '0' }}>Final Round Results</h1>
          <div className="flex-grow"></div>
          <Select className={s.selectSession} options={sessionOpts} onChange={(e) => setSessionId(e.value)} placeholder={'NON-NIICS'}></Select>
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

          <button onClick={() => printCandidates()} style={{ padding: '.5rem 1rem', cursor: 'pointer' }}> <img src="/assets/png/print.png" width='12' alt="" /> Print</button>
          <div className={s.divCloseBtn} style={{ marginBottom: '2rem' }} onClick={() => setIsResultShown(false)}>
            <img className={s.btnClose} src='/assets/svg/close.svg' />
          </div>
          {selectedInstiResultCandidates.length !== 0 && <h2 style={{ textAlign: 'left', opacity: '.7', color: '#d4bee5' }}> {selectedInstiResultCandidates.length} Results </h2>}
          <h1>RESULTS OF <br /> {selectedInstitutes?.shortName} </h1>
          <div className={s.resultCards} id='printArea'>
            {reverseArray(selectedInstiResultCandidates).map((item, index) => {
              // let photoUrl = '/assets/sample/scholar.webp';
              // if (checkImage(item.candidate.photo.url)) photoUrl = item.candidate.photo.url
              // else photoUrl = '/assets/sample/scholar.webp'
              return (
                <div className={s.card} key={index}>
                  {<img className={s.candImage} src={item.candidate.photo.url} alt="" />}
                  <p style={{ maxWidth: '15rem' }}><b>{item.candidate.name.toUpperCase()}</b></p>
                  <p><b> {item.program?.type.toLowerCase() == 'group' && 'AND TEAM'}</b></p>
                  <p>{item.candidate.chestNO}</p>
                  <p>{item.program?.name}</p>
                  <p>{item.candidate?.category.name}</p>
                </div>)
            }
            )}
          </div>
          <iframe id="ifmcontentstoprint" style={{ height: 0, width: 0, position: 'absolute' }}></iframe>
          {
            selectedInstiResultCandidates.length === 0 && <h3 style={{ margin: 'auto', textAlign: 'center', opacity: '.5' }}>No Candidates are Selected</h3>
          }
        </div>
      </div>
    </Layout>
  )
}

export default FinalResults
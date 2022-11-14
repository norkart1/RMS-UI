import React from 'react'
import Select from 'react-select'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/eli_result.module.css'
import baseApi from '../../api/baseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { catIdtoName, reverseArray } from '../../helpers/functions'
// import printJS from 'print-js'
import printSvg from '../../public/assets/svg/print.svg'


function EliminationResults() {
  const [institutes, setInstitutes] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [isResultShown, setIsResultShown] = useState(false)
  const [selectedInstitutes, setSelectedInstitutes] = useState()
  const [selectedInstiResultCandidates, setSelectedInstiResultCandidates] = useState([])
  useEffect(() => {
    
    baseApi.get(`/public/elimination-result/institutes/?session_id=1`).then(res => {
      setInstitutes(res.data.data)
      setSearchOptions([])
      res.data.data.map(institute => {
        setSearchOptions(prev => [...prev, { value: institute.id, label: institute.shortName, institute }])
      })
    })

  }, [])

  const handleProgramClick = (institute) => {
    showResult(institute)

  }
  const handleSearchSelectionChange = (institute) => {
    showResult(institute)
  }
  const showResult = (institute) => {
    setSelectedInstitutes(institute)

    baseApi.get(`public/elimination-result/candidates/institutes/${institute.id}`).then((res) => {
      setSelectedInstiResultCandidates(res.data.data)
    }).then(() => {
      setIsResultShown(true)
    })

  }
  const printCandidates = ()=>{
    const printJS = require('print-js')
    printJS('printArea', 'html')
  }

  return (
    <Layout openedTabName={`Elimination \n Results \n of Institutions`}>
      <div className={s.pageContainer}>
        <h1>Elimination Round Results</h1>
        <div className={`${s.searchArea} ${s.stickySearch}`}>
          <img src="/assets/png/search.png" alt="" style={{ padding: '2rem 2rem 2rem 0', width: '4rem', cursor: 'pointer' }} />
          <Select className={s.searchSelect} options={searchOptions} onChange={(e) => handleSearchSelectionChange(e.institute)} placeholder='Search and Select Institutions'></Select>
        </div>
        <div className={s.programCards}>
          {
            institutes.map((item, index) => {
              const SiNo = index + 1
              return (
                <div className={s.programItem} key={index} onClick={() => handleProgramClick(item)}>
                  {SiNo}. {item.shortName}
                </div>
              )
            })}
        </div>

        <div className={`${s.resultShow} ${isResultShown ? s.isShown : ''}`}>

          <button onClick={() => printCandidates()}> <img src="/assets/png/print.png" width='12' alt="" /> Print</button>
            <img className={s.btnClose} src='/assets/svg/close.svg' onClick={() => setIsResultShown(false)} />
            <h1>Selected Candidates of <br /> {selectedInstitutes?.shortName} </h1>
          {selectedInstiResultCandidates.length !== 0 && <h2 style={{ textAlign: 'center', opacity: '.7', color:'#d4bee5' }}> {selectedInstiResultCandidates.length} candidates are selected </h2>}
          <div className={s.resultCards} id='printArea'>
            {reverseArray(selectedInstiResultCandidates).map((item, index) =>
              <div className={s.card}>
                <img className={s.candImage} src={item.candidate.photo.url} alt="" />
                <p style={{ maxWidth: '15rem' }}><b>{item.candidate.name.toUpperCase()}</b></p>
                <p><b> {item.program?.type.toLowerCase() == 'group' && 'AND TEAM'}</b></p>
                <p>{item.candidate.chestNO}</p>
                <p>{item.program?.name}</p>
                <p>{item.candidate?.category.name}</p>
              </div>
            )}
          </div>
          {
            selectedInstiResultCandidates.length === 0 && <h3 style={{ margin: 'auto', textAlign: 'center', opacity: '.5' }}>No Candidates are Selected</h3>
          }
        </div>
      </div>
    </Layout>
  )
}

export default EliminationResults
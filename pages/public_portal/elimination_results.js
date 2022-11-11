import React from 'react'
import Select from 'react-select'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/eli_result.module.css'
import baseApi from '../../api/baseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { catIdtoName } from '../../helpers/functions'


function EliminationResults() {
  const [publishedPrograms, setPublishedPrograms] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [isResultShown, setIsResultShown] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState()
  const [selectedProgramResultCandidates, setSelectedProgramResultCandidates] = useState([])
  useEffect(() => {
    baseApi.get(`/public/elimination-result`).then(res => {
      setPublishedPrograms(res.data.data)
      console.log(res.data.data)
      setSearchOptions([])
      res.data.data.map(program => {
        setSearchOptions(prev => [...prev, { value: program.id, label: program.name + ' - ' + catIdtoName(program.categoryID), programCode: program.programCode, program }])
      })
    })


  }, [])

  const handleProgramClick = (program) => {
    showResult(program)

  }
  const handleSearchSelectionChange = (program) => {
    showResult(program)
  }
  const showResult = (program) => {
    setSelectedProgram(program)

    console.log(program)
    baseApi.get(`/public/elimination-result/candidates/${program.programCode}`).then((res) => {
      console.log(res.data.data)
      setSelectedProgramResultCandidates(res.data.data)
    }).then(() => {
      setIsResultShown(true)
    })

  }

  return (
    <Layout openedTabName={`elimination \n results`}>
      <div className={s.pageContainer}>
        <h1>Elimination Round Results</h1>
        <div className={s.searchArea}>
          <img src="/assets/png/search.png" alt="" style={{ padding: '2rem 2rem 2rem 0', width: '4rem', cursor: 'pointer' }} />
          <Select className={s.searchSelect} options={searchOptions} onChange={(e) => handleSearchSelectionChange(e.program)}></Select>
        </div>
        <div className={s.programCards}>
          {
            publishedPrograms.map((item, index) => {
              const SiNo = index + 1
              return (
                <div className={s.programItem} key={index} onClick={() => handleProgramClick(item)}>
                  {SiNo} - {catIdtoName(item.categoryID)} - {item.programCode} - {item.name}
                </div>
              )
            })}
        </div>

        <div className={`${s.resultShow} ${isResultShown ? s.isShown : ''}`}>
          <img className={s.btnClose} src='/assets/svg/close.svg' onClick={() => setIsResultShown(false)} />
          <h1>Selected Candidates For {selectedProgram?.name} ({catIdtoName( selectedProgram?.categoryID)}) </h1>
          <div className={s.resultCards}>
            {selectedProgramResultCandidates.map((item,index)=>
              <div className={s.card}>
                <img className={s.candImage} src={item.candidate.photo.url} alt="" />
                <p>{item.candidate.name}</p>
                <p>{item.candidate.chestNO}</p>
                <p>{item.institute.shortName}</p>

                
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EliminationResults
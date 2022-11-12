import React from 'react'
import Select from 'react-select'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/eli_result.module.css'
import baseApi from '../../api/baseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { catIdtoName, reverseArray } from '../../helpers/functions'


function EliminationResults() {
  const [publishedPrograms, setPublishedPrograms] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [categoryOpts, setCategoryOpts] = useState([])
  const [isResultShown, setIsResultShown] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState()
  const [selectedProgramResultCandidates, setSelectedProgramResultCandidates] = useState([])
  useEffect(() => {
    // getPrograms()
    baseApi.get(`/public/elimination-result`).then(res => {
      setPublishedPrograms(res.data.data)
      // console.log(res.data.data)
      setSearchOptions([])
      res.data.data.map(program => {
        setSearchOptions(prev => [...prev, { value: program.id, label: program.name + ' - ' + catIdtoName(program.categoryID), programCode: program.programCode, program }])
      })
    })
    baseApi.get(`/public/elimination-result/categories?session_id=1`).then(res => {
      setCategoryOpts([])
      res.data.data.map(category => {
        setCategoryOpts(prev => [...prev, { value: category.id, label: category.name , category }])
      })
    })



  }, [])

  const handleProgramClick = (program) => {
    showResult(program)

  }
  const handleSearchSelectionChange = (program) => {
    showResult(program)
  }
  const handleCategorySelectChange = (category) => {
    setPublishedPrograms(publishedPrograms.filter(p => p.categoryID == category.id))

  }
  const getPrograms = (catID) => {
    baseApi.get(`/public/elimination-result/`).then((res) => {
      if (catID) setPublishedPrograms(res.data.data.filter((item => item.categoryID == catID)));
      else setPublishedPrograms(res.data.data)
      console.log('programs', res.data.data.filter((item => item.categoryID == catID)))
    });
  }
  const showResult = (program) => {
    setSelectedProgram(program)

    console.log(program)
    baseApi.get(`/public/elimination-result/candidates/${program.programCode}`).then((res) => {
      console.log('result data',res.data.data)
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
          {/* <Select className={s.searchSelect} options={categoryOpts} onChange={(e) => handleCategorySelectChange(e.category)} placeholder='Select Category' styles={{width:'fit-content'}}></Select> */}
          <Select className={s.searchSelect} options={searchOptions} onChange={(e) => handleSearchSelectionChange(e.program)} placeholder='Search and Select Programs'></Select>
        </div>
        <div className={s.programCards}>
          {
            reverseArray(publishedPrograms).map((item, index) => {
              const SiNo = index + 1
              return (
                <div className={s.programItem} key={index} onClick={() => handleProgramClick(item)}>
                  {SiNo}. {item.name} ({catIdtoName(item.categoryID)})
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
                <p style={{maxWidth:'15rem'}}><b>{ item.candidate.name.toUpperCase()}</b></p>
                <p>{item.candidate.chestNO}</p>
                <p>{item.institute?.shortName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EliminationResults
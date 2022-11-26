import React from 'react'
import Select from 'react-select'
import Layout from '../../components/public_portal/Layout'
import s from '../../styles/public_portal/fin_result.module.css'
import baseApi from '../../api/baseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { catIdtoName, reverseArray } from '../../helpers/functions'


function FinalResults() {
  const [publishedPrograms, setPublishedPrograms] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [categoryOpts, setCategoryOpts] = useState([])
  const [isResultShown, setIsResultShown] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState()
  const [programResults, setProgramResults] = useState([])
  const [sessionId, setSessionId] = useState('1')

  useEffect(() => {
    // getPrograms()
    baseApi.get(`public/final-result/programs/published?sessionID=${sessionId}`).then(res => {
      setPublishedPrograms(res.data.data)
      console.log(res.data.data)
      setSearchOptions([])
      res.data.data.map(program => {
        setSearchOptions(prev => [...prev, { value: program.id, label: program.name + ' - ' + catIdtoName(program.categoryID), programCode: program.programCode, program }])
      })
    })
    baseApi.get(`/public/final-result/categories?sessionID=${sessionId}`).then(res => {
      setCategoryOpts([{ value: null, label: 'ALL' }])
      res.data.data.map(category => {
        setCategoryOpts(prev => [...prev, { value: category.id, label: category.name, category }])
      })
    })
  }, [sessionId])

  const handleProgramClick = (program) => {
    showResult(program)

  }
  const handleSearchSelectionChange = (program) => {
    showResult(program)
  }
  const handleCategorySelectChange = (category) => {
    // setPublishedPrograms(programs => programs.filter(p => p.categoryID == category.id))
    category ? getPrograms(category.id) : getPrograms()
    // 

  }
  const getPrograms = (catID) => {
    baseApi.get(`public/final-result/programs/published?sessionID=${sessionId}`).then((res) => {
      if (catID) setPublishedPrograms(res.data.data.filter((item => item.categoryID == catID)));
      else setPublishedPrograms(res.data.data)
      // console.log(res.data.data)
    });
  }
  const showResult = (program) => {
    setSelectedProgram(program)
    baseApi.get(`public/final-result/program/${program.programCode}`).then((res) => {
      setProgramResults(res.data.data)
      // console.log(res.data.data)
    }).then(() => {
      setIsResultShown(true)
    })
  }

  const sessionOpts = [
    { value: '1', label: 'NON-NIICS' },
    { value: '2', label: 'NIICS' },
  ]

  return (
    <Layout openedTabName={`elimination \n results`}>
      <div className={s.pageContainer}>
        <div className={s.header}>
          <h1 style={{ margin: '0' }}>Final Round Results</h1>
          <div className="flex-grow"></div>
          <Select className={s.selectSession} options={sessionOpts} onChange={(e) => setSessionId(e.value)} placeholder={'NON-NIICS'}></Select>
        </div>
        <div className={`${s.searchAreaIn1} ${s.stickySearch}`} >
          <img className={s.SearchImg} src="/assets/png/search.png" alt="" />
          <Select className={s.searchSelect} options={categoryOpts} onChange={(e) => handleCategorySelectChange(e.category)} placeholder='Select Category' styles={{ width: 'fit-content' }}></Select>
          <Select className={s.searchSelect} options={searchOptions} onChange={(e) => handleSearchSelectionChange(e.program)} placeholder='Search and Select Programs'></Select>
          <h4 style={{ color: '#ba81c4', padding: '1rem', margin: 0 }}>Total results published: {publishedPrograms.length}</h4>
        </div>
        <div className={s.programCards}>
          {
            reverseArray(publishedPrograms).map((item, index) => {
              const SiNo = index + 1
              return (
                <div className={s.programItem} key={index} onClick={() => handleProgramClick(item)}>
                  <p>{SiNo}. {item.name} ({catIdtoName(item.categoryID)})</p>
                  <div className="flex-grow"></div>
                  <p>Just now</p>
                </div>
              )
            })}
        </div>

        <div className={`${s.resultShow} ${isResultShown ? s.isShown : ''}`}>

          <div className={s.divCloseBtn} style={{ marginBottom: '2rem' }} onClick={() => setIsResultShown(false)}>
            <img className={s.btnClose} src='/assets/svg/close.svg' />
          </div>          <h1>Results of <br /> {selectedProgram?.name} {catIdtoName(selectedProgram?.categoryID)} </h1>
          <div className={s.resultCards}>
            {programResults.map((item, index) =>
              <div className={s.card} data-pos={item.position}>
                <div className={s.resultContents} data-pos={item.position}>
                  <h2 className={s.pos}>{item.position?.toUpperCase()}</h2>
                  <h2 className={s.grade}>{item.grade} GRADE</h2>
                  <h3 className={s.instiName}>{item.institute?.shortName}</h3>
                  <h3 className={s.instiShortName}>{item.institute?.name.toUpperCase()}</h3>
                  <div className={s.candDetails} >
                    <div className={s.candImage} style={{backgroundImage:`url(${item.candidate.photo.url})`}}></div>
                    {/* <img className={s.candImage} src={} alt="" /> */}
                    <div>

                    <p style={{ maxWidth: '15rem' }}><b>{item.candidate.name.toUpperCase()}</b></p>
                    <p>{item.candidate.chestNO}</p>
                    </div>
                  </div>

                </div>
                <div className={s.instiPhoto} style={{ backgroundImage: `url(${item.institute?.coverPhoto?.url})` }} 
                
                ></div>

                {/* <p>{item.institute?.shortName}</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FinalResults
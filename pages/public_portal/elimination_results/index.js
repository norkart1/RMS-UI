import React from 'react'
import Select from 'react-select'
import Layout from '../../../components/public_portal/Layout'
import s from '../../../styles/public_portal/eli_result.module.css'
import baseApi from '../../../api/baseApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { catIdtoName } from '../../../helpers/functions'


function EliminationResults() {
  const [publishedPrograms, setPublishedPrograms] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  useEffect(() => {
    baseApi.get(`/public/elimination-result`).then(res => {
      setPublishedPrograms(res.data.data)
      console.log(res.data.data)
      setSearchOptions([])
      res.data.data.map(program => {
        setSearchOptions(prev => [...prev, { value: program.id, label: program.name + ' - ' + catIdtoName(program.categoryID) }])
      })
    })


  }, [])


  return (
    <Layout openedTabName={`elimination \n results`}>
      <h1>Elimination Round Results</h1>
      <div className={s.searchArea}>
        <img src="/assets/png/search.png" alt="" style={{ padding: '2rem', width: '6rem', cursor: 'pointer' }} />
        <Select className={s.searchSelect} options={searchOptions} ></Select>
      </div>
      <div className={s.programCards}>
        {
          publishedPrograms.map((item, index) => {
            const SiNo = index + 1
            return (
              <div className={s.programItem} key={index}>
                {SiNo} - {catIdtoName(item.categoryID)} - {item.programCode} - {item.name}
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

export default EliminationResults
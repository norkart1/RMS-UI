import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { apiDelete, apiPost, useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import Image from 'next/image';
import styles from '../../styles/control/scoreboard.module.css'
import Input from '../../components/portal/inputTheme';
import { useEffect, useState } from 'react';
import Data_table from '../../components/portal/data_table';
import Select from 'react-select'


function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [markedCadidates, setMardedCadidates] = useState([]);
  const [cadidates, setCadidates] = useState([]);

  const [programCode, setProgramCode] = useState('');
  const [seletedcadidates, setSeletedcadidates] = useState([]);



  let userDetails
  userDetails = useGet('/user/me', false, false, false, (err) => { }, false)[0]
  let categories = []
  categories = useGet(`/user/categories/`, true)[0];
  // console.log(categories)


  useEffect(() => {
    baseApi.get(`/user/elimination-result/`)
      .then((res) => {
        setPrograms(res.data.data)
      })

  }, [])

  useEffect(() => {

    baseApi.get(`/user/elimination-result/points/${programCode}`).then((res) => {
      setMardedCadidates(res.data.data)
    })

  }, [programCode])
  const getMarkedCandidates = (code) => {
    setProgramCode(code)
    baseApi.get(`/user/elimination-result/points/${code}`).then((res) => {
      setMardedCadidates(res.data.data)
      console.log('sfe', res.data.data)
    })

  }

  const deleteMark = (id) => {
    apiDelete(`/user/elimination-result/${id}`,'',false,false,()=>{
      getMarkedCandidates(programCode)
      selectedCadidates(programCode)


    })
    // baseApi.delete(`/user/elimination-result/${id}`).then((res) => {
    //   getMarkedCandidates(programCode)
    // })
  }

  const selectedCadidates = (code) => {
    baseApi.get(`/user/elimination-result/selection/${code}`).then((res) => {
      setSeletedcadidates(res.data.data)
    })
  }

  const deleteSelected = (id) => {
    baseApi.delete(`/user/elimination-result/selection/${id}`).then((res) => {
      selectedCadidates(programCode)
    })
  }


  const selectThisCandidate = (id) => {
    apiPost(`/user/elimination-result/selection/${id}`, { null: null }, false, false, false, () => {
      selectedCadidates(programCode)
      // setMardedCadidates()
      getMarkedCandidates(programCode)
    })
  }


  let array = []
  programs?.map((program) => {
    array.push({ value: program.programCode, label: program.programCode + ' ' + program.name })
  })


  const heads = ['SI No', 'Ches No', 'Name', 'Mark', 'Mark', 'Mark', 'Total', 'Action']
  const heads2 = ['SI No', 'Ches No', 'Name', 'Action']
  return (
    <Portal_Layout activeTabName='selection' userType='controller'  >
      <h1>Elimination Result</h1>
      <span data-theme='hr'></span>

      <Select options={array} onChange={(e) => { getMarkedCandidates(e.value) & selectedCadidates(e.value) }} />
      {/* <div className={styles.resultPage}> */}

      <div className={styles.selection}>
      <div>
        <h2>Select Cadidates</h2>
        <div data-theme="table" className={styles.candidatesTable} style={{ width: '100%', height: '70vh' }}>

          <Data_table heads={heads} >
            {
              markedCadidates && markedCadidates?.map((item, index) => {
                return (
                  <tr key={index} >
                    <td style={{ width: 'fit-content' }}>{index + 1}</td>
                    <td style={{ width: 'fit-content' }} >{item.chestNO}</td>
                    <td style={{ width: 'fit-content' }}>{item.candidateName}</td>
                    <td style={{ width: 'fit-content' }}>{item.pointOne}</td>
                    <td style={{ width: 'fit-content' }}>{item.pointTwo}</td>
                    <td style={{ width: 'fit-content' }}>{item.pointThree}</td>
                    <td style={{ width: 'fit-content' }}>{item.totalPoint}</td>
                    <td style={{ width: '50rem' }}>
                      {/* <button style={{margin:'.1rem'}} data-theme='edit' onClick={() => selectThisCandidate(item.candidateProgram.id)}>{item.candidateProgram.is_selected ? 'selected' : 'Select'}</button> */}
                      <button style={{margin:'.1rem'}} data-theme='edit' onClick={() => selectThisCandidate(item.candidateProgram.id)}>{'Select'}</button>
                      <button style={{margin:'.1rem'}} data-theme='delete' onClick={() => deleteMark(item.id)}>Remove marks</button>
                    </td>
                  </tr>
                )
              })
            }
          </Data_table>
        </div>
      </div>
      <div>
            <h2>Selected Cadidates</h2>
            <div data-theme="table" className={styles.candidatesTable} style={{ width: '100%', height: '70vh' }}>

              <Data_table heads={heads2} >
                {
                  seletedcadidates && seletedcadidates?.map((cadidate, index) => {
                    return (
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td >{cadidate.chestNO}</td>
                        <td>{cadidate.candidate.name}</td>
                        <td>
                          <button data-theme='delete' onClick={() => deleteSelected(cadidate.id)}>Unselect</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </Data_table>
            </div>
          </div>
      </div>
      {/* </div> */}
    </Portal_Layout >

  )
}

export default Dashboard
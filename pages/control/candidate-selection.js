import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { apiDelete, apiPost, downloadExcel, useGet } from '../../helpers/functions';
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
  const [categories, setCategories] = useState([])




  let userDetails
  userDetails = useGet('/user/me', false, false, false, (err) => { }, false)[0]
  // let categories = []
  // categories = useGet(`/user/categories/`, true)[0];
  // console.log(categories)

  useEffect(() => {
    baseApi.get(`/user/categories?session_id=${localStorage.getItem('sessionID')}`).then((res) => {
      setCategories(res.data.data);
    });
  }, [])
  useEffect(() => {
    getPrograms()
  }, [])


  useEffect(() => {
    if (programCode != '') {
      baseApi.get(`/user/elimination-result/points/${programCode}`).then((res) => {
        setMardedCadidates(res.data.data)
      })
    }
  }, [programCode]
  )
  const getPrograms = (catID) => {
    baseApi.get(`/user/elimination-result/`).then((res) => {
      if (catID) setPrograms(res.data.data.filter((item => item.categoryID == catID)));
      else setPrograms(res.data.data)
      console.log('programs', res.data.data.filter((item => item.categoryID == catID)))
    });
  }
  const getMarkedCandidates = (code) => {
    setProgramCode(code)
    baseApi.get(`/user/elimination-result/points/${code}`).then((res) => {
      setMardedCadidates(res.data.data)
      console.log('markedcandidates', res.data.data)
    })
  }

  const deleteMark = (id) => {
    apiDelete(`/user/elimination-result/${id}`, '', false, false, () => {
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
      console.log('id', id)
      console.log('selected candidates', seletedcadidates)
      // setMardedCadidates()
      getMarkedCandidates(programCode)
    })
  }

  let categoriesOpts = [];
  categories?.map((category) => {
    categoriesOpts.push({
      value: category.id,
      label: category.name,
    });
  });
  let array = []
  programs?.map((program) => {
    array.push({ value: program.programCode, label: program.programCode + ' ' + program.name })
  })
  const downloadEdittedExcel = (seletedcadidatesData) => {
    console.log('seletedcadidatesData', seletedcadidatesData)
    let edittedArray = []
    seletedcadidatesData.map((item) => {
      edittedArray.push({
        chestNO: item.chestNO,
        name: item.candidate.name,
        institute: item.candidate.institute.shortName,
        programCode: item.programCode,
        programName: item.programName,
        category: item.candidate.category.name,
      })
    })
    downloadExcel(edittedArray)
    console.log('edittedArray', edittedArray)
  }


  const heads = ['SI No', 'Ches No', 'Name', 'Mark', 'Mark', 'Mark', 'Total', 'Action']
  const heads2 = ['SI No', 'Ches No', 'Name', 'Action']
  return (
    <Portal_Layout activeTabName='Candidate Selection' userType='controller'  >
      <h1>Elimination Result</h1>
      <div className={styles.selects}>

        <Select options={categoriesOpts} onChange={(e) => getPrograms(e.value)} />
        <Select options={array} onChange={(e) => { getMarkedCandidates(e.value) & selectedCadidates(e.value) }} />
      </div>
      {/* <div className={styles.resultPage}> */}

      <div className={styles.selection}>
        <div>
          <h2>Select Cadidates</h2>
          <div data-theme="table" className={styles.candidatesTable} style={{ width: '50vw', height: '75vh' }}>

            <Data_table heads={heads} style={{ width: '100%' }}>
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
                        <button style={{ margin: '.1rem' }} data-theme='success' onClick={() => selectThisCandidate(item.candidateProgram?.id)}>{'Mark as Selected'}</button>
                        <button style={{ margin: '.1rem' }} data-theme='delete' onClick={() => deleteMark(item.id)}>Remove marks</button>
                      </td>
                      {/* <td style={{ width: 'fit-content' }}>{item.candidateProgram?.id}</td> */}
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
          <button data-theme={'submit'} onClick={() => downloadEdittedExcel(seletedcadidates)}>DownLoad Excel &darr;</button>

        </div>
      </div>
      {/* </div> */}
    </Portal_Layout >

  )
}

export default Dashboard
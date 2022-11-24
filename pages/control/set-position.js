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
  const [position, setPosition] = useState('');

  const [programCode, setProgramCode] = useState('');
  const [seletedcadidates, setSeletedcadidates] = useState([]);
  const [categories, setCategories] = useState([])




  let userDetails
  userDetails = useGet('/user/me', false, false, false, (err) => { }, false)[0]
  // let categories = []
  // categories = useGet(`/user/categories/`, true)[0];
  // 

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
      baseApi
        .get(`/user/final-result/marks/programs/${programCode}`)
        .then((res) => {
          setMardedCadidates(res.data.data);
        });
    }
  }, [programCode]
  )
  const getPrograms = (catID) => {
    baseApi.get(`/user/final-result/programs/?session_id=${localStorage.getItem('sessionID')}`).then((res) => {
      if (catID)
        setPrograms(res.data.data.filter((item) => item.categoryID == catID));
      else setPrograms(res.data.data);
    });
  }
  const getMarkedCandidates = (code) => {
    setProgramCode(code)
    baseApi.get(`/user/final-result/marks/programs/${code}`).then((res) => {
      setMardedCadidates(res.data.data);
    });
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

  // const selectedCadidates = (code) => {
  //   baseApi.get(`/user/elimination-result/selection/${code}`).then((res) => {
  //     setSeletedcadidates(res.data.data)
  //   })
  // }

  // const deleteSelected = (id) => {
  //   baseApi.delete(`/user/elimination-result/selection/${id}`).then((res) => {
  //     selectedCadidates(programCode)
  //   })
  // }


  const addPosition = (id) => {

    apiPost(
      `/user/final-result/${id}`,
       { position: position },
      false,
      false,
      false,
      () => {
        // setMardedCadidates()
        getMarkedCandidates(programCode);
      }
    );
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
  // const downloadEdittedExcel = (seletedcadidatesData) => {

  //   let edittedArray = []
  //   seletedcadidatesData.map((item) => {
  //     edittedArray.push({
  //       chestNO: item.chestNO,
  //       name: item.candidate.name,
  //       institute: item.candidate.institute.shortName,
  //       programCode: item.programCode,
  //       programName: item.program.name,
  //       category: item.candidate.category.name,
  //     })
  //   })
  //   downloadExcel(edittedArray)

  // }
const postions = [ 
  {name: "select position", value: ""},
  {name: "First", value: "First"},
  {name: "Second", value: "Second"},
  {name: "Third", value: "Third"}
]


  const heads = ['SI No', 'Chest No', 'Name', 'Mark', 'Mark', 'Mark', 'Total','Add Position', 'Action', 'Position','Grade']
  // const heads2 = ['SI No', 'Chest No', 'Name', 'Action']
  return (
    <Portal_Layout activeTabName='Candidate Selection' userType='controller'  >
      <h1>Final Result</h1>
      <div className={styles.selects}>

        <Select options={categoriesOpts} onChange={(e) => getPrograms(e.value)} placeholder='Select Category' />
        <Select options={array} onChange={(e) => { getMarkedCandidates(e.value) 
        // & selectedCadidates(e.value) 
          }} placeholder='Search and Select Program' />
      </div>
      {/* <div className={styles.resultPage}> */}

      <div className={styles.selection}>
        <div>
          <h2>Select Candidates</h2>
          <div data-theme="table" className={styles.candidatesTable} style={{ width: '60vw', height: '75vh' }}>

            <Data_table id='markedCadidates' heads={heads} style={{ width: '100%' }}>
              {
                markedCadidates && markedCadidates?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ width: "fit-content" }}>{index + 1}</td>
                      <td style={{ width: "fit-content" }}>{item.chestNO}</td>
                      <td style={{ width: " " }}>{item.candidateName}</td>
                      <td style={{ width: "fit-content" }}>{item.pointOne}</td>
                      <td style={{ width: "fit-content" }}>{item.pointTwo}</td>
                      <td style={{ width: "fit-content" }}>
                        {item.pointThree}
                      </td>
                      <td style={{ width: "fit-content" }}>
                        {item.totalPoint}
                      </td>
                      <td style={{ width: "50rem" }}>
                        {/* <button style={{margin:'.1rem'}} data-theme='edit' onClick={() => selectThisCandidate(item.candidateProgram.id)}>{item.candidateProgram.is_selected ? 'selected' : 'Select'}</button> */}
                        <Input
                          dropdownOpts={postions}
                          type="dropdown"
                          handleOnChange={({ target }) =>
                            setPosition(target.value)
                          }
                        />
                      </td>
                      <td
                        style={{
                          width: "fit-content",
                          "background-color": "#1a3c99",
                          color: "white",
                          cursor: "pointer",
                        }}
                        onClick={() => addPosition(item.candidateProgram.id)}
                      >
                        Submit
                      </td>
                      <td style={{ width: "fit-content" }}>
                        {item.candidateProgram.position}
                      </td>
                      <td style={{ width: "fit-content" }}>
                        {item.candidateProgram.grade}
                      </td>
                      {/* <td style={{ width: 'fit-content' }}>{item.candidateProgram?.id}</td> */}
                    </tr>
                  );
                })
              }
            </Data_table>
          </div>
        </div>
        {/* <div>
          <h2>Selected Candidates</h2>

          <div data-theme="table" className={styles.candidatesTable} style={{ width: '100%', height: '70vh' }}>

            <Data_table id='seletedcadidates' heads={heads2} showExcel={false}>
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

        </div> */}
      </div>
      {/* </div> */}
    </Portal_Layout >

  )
}

export default Dashboard
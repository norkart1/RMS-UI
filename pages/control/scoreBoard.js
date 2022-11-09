import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions';
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

  const getMarkedCandidates = (code) => {

    setProgramCode(code)
    baseApi.get(`/user/elimination-result/points/${code}`).then((res) => {
      setMardedCadidates(res.data.data)
                                                     
    })
    getCandidates(code)
  }
  const deleteMark = (id) => {
    baseApi.delete(`/user/elimination-result/${id}`).then((res) => {
      getMarkedCandidates(programCode)
    })
  }
  const getCandidates = (code) => {
    
    baseApi.get(`/user/elimination-result/candidates/${code}`).then((res) => {
      setCadidates(res.data.data)
      console.log(res.data.data)
    })
  }



  
  const selectThisCandidate = (id) => {
    baseApi.post(`/user/elimination-result/selection/${id}`).then((res) => {
      console.log(res.data.data)
    })
  }


  let array = []
  programs?.map((program) => {
    array.push({ value: program.programCode, label: program.programCode + ' ' + program.name })
  })
 

  const heads = ['SI No', 'Ches No', 'Name', 'Mark', 'Mark', 'Mark', 'Total' , 'Action']
   const heads2 = ['SI No', 'Ches No', 'Name',  'Action']
  return (
    <Portal_Layout activeTabName='Scoreboard' userType='controller'  >
      <h1>Elimination Result</h1>
      <span data-theme='hr'></span>

      <Select options={array} onChange={(e) => {getMarkedCandidates(e.value)  } } />


      <div className={styles.resultPage}>
         
 
        <div>
        <h3>Select Cadidates</h3>
          <div className={styles.candidatesTable}>
            <Data_table cadidates={cadidates} heads={heads2} >
              {
                cadidates && cadidates?.map((cadidate, index) => {
                  return (
                    <tr key={index}  >
                      <td>{index + 1}</td>
                      <td >{cadidate.chestNO}</td>
                      <td>{cadidate.name}</td>
                      <td><button onClick={()=>selectThisCandidate(cadidate.id)}>Select</button></td>



                    </tr>
                  )
                })
              }
            </Data_table>
            </div>


        </div>
        
      </div>



    </Portal_Layout>

  )
}

export default Dashboard
import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import Image from 'next/image';
import styles from '../../styles/control/eli_result.module.css'
import Input from '../../components/portal/inputTheme';
import { useEffect, useState } from 'react';
import Data_table from '../../components/portal/data_table';

function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [cadidates, setCadidates] = useState([]);

  const [chestNO, setChestNO] = useState('');

  const [programCode, setProgramCode] = useState('');

  const [pointOne, setPointOne] = useState('');
  const [pointTwo, setPointTwo] = useState('');
  const [pointThree, setPointThree] = useState('');
  const [checked, setChecked] = useState(false);


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

  const getCandidates = (code) => {

    setProgramCode(code)
    baseApi.get(`/user/elimination-result/candidates/${code}`).then((res) => {
      setCadidates(res.data.data)


    })
  }

  const markUpload = (cadidate) => {
    let data = {
      chestNO: cadidate.chestNO,
      programCode: programCode,
      pointOne: pointOne,
      pointTwo: pointTwo,
      pointThree: pointThree
    }
    console.log(data)


    baseApi.post('/user/elimination-result/', data).then((res) => {
      console.log(res.data.data)
    })
  }
  const selectThisCandidate = (id) => {
    baseApi.post(`/user/elimination-result/selection/${id}`).then((res) => {
      console.log(res.data.data)
    })
  }





  const heads = ['SI No', 'Code', 'Program Name']
  const heads2 = ['SI No', 'Ches No', 'Name', 'Mark', 'Mark', 'Mark', 'Upload', 'select']

  return (
    <Portal_Layout activeTabName='dashboard' userType='controller'  >
      <h1>Elimination Result</h1>

      <div className={styles.resultPage}>
        {/* <Input type='dropdown' label='Candidate category' name='categoryID' isDisabled={process == 'update'}
          value={category} handleOnChange={hadleCategoryChange} dropdownOpts={categories}
          placeholder='Name' status='normal' /> */}

        <div className={styles.grogramsTable}>
          <Data_table programs={programs} heads={heads} >
            
          </Data_table>
        </div>
        <div className={styles.candidatesTable}>
          <Data_table cadidates={cadidates} heads={heads2} >
            
          </Data_table>


        </div>
      </div>



    </Portal_Layout>

  )
}

export default Dashboard
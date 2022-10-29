import Select from 'react-select'
import Portal_Layout from '../../components/portal/portal_Layout';
import { useState } from 'react';
import { useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import { useEffect } from 'react';
import styles from '../../styles/component/comp_candidate.module.css'
import Image from 'next/image';

const DisplayCandidates = (props) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);



  // useEffect(() => {

  //   baseApi.get('admin/candidates').then(res => {
  //   setCandidates(res.data.data.candidates)
  // })

  // }, [])

  //   let array = []
  //   candidates.map((candidate) => {
  //     array.push({ value: candidate.chestNO, label:candidate.chestNO + ' ' + candidate.name })
  //   })
  //   const handleOnChange = (e) => {
  //     baseApi.get('admin/candidates/'+e.value).then(res => {
  //       setSelectedCandidate(res.data.data)
  //     })

  //   }
  //   //console.log(selectedCandidate)


  return (
    <Portal_Layout activeTabName='dashboard' activeChildTabName='' userType='admin'>

      <div className={styles.students} >
        <h1>Display Candidates</h1>

        <Select />
        <div className={styles.container}>
          <div>
            {/* display candidate image */}
            <Image src='/assets/png/candidates.png' height={200} width={150} />


          </div>
          {/* {selectedCandidate && 
        <div>
          <h1>{selectedCandidate.chestNO}</h1>
          <h1>{selectedCandidate.name}</h1>
          <h1>{selectedCandidate.class}</h1>
          <h1>{selectedCandidate.adno}</h1>
      </div>}  */}
          <div className={styles.delatails}>
            <h1> Name:</h1>
            <h1>chestNO </h1>
            <h1>class </h1>
            <h1> adno</h1>
            <h1>institute</h1>
            <h1>address</h1>
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;
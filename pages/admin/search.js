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



  useEffect(() => {

    baseApi.get('admin/candidates').then(res => {
    setCandidates(res.data.data.candidates)
  })

  }, [])
  console.log(candidates)

    let array = []
    candidates.map((candidate) => {
      array.push({ value: candidate.chestNO, label:candidate.chestNO + ' ' + candidate.name })
    })
    const handleOnChange = (e) => {
      baseApi.get('admin/candidates/'+e.value).then(res => {
        setSelectedCandidate(res.data.data)
      })

    }
    console.log(selectedCandidate)


  return (
    <Portal_Layout activeTabName='dashboard' activeChildTabName='' userType='admin'>

      <div className={styles.students} >
        <h1>Display Candidates</h1>

        <Select options={array}  onChange={handleOnChange} />
        <div className={styles.container}>
          <div>
            {/* display candidate image */}
            <Image src={selectedCandidate?.photo.url} height={200} width={150} />


          </div>
           {selectedCandidate && 
        
     
          <div className={styles.delatails}>
            <h1> Name: {selectedCandidate.name}</h1>
            <h1>chestNO: {selectedCandidate.chestNO} </h1>
            <h1>class: {selectedCandidate.class} </h1>
            <h1> AdNo: {selectedCandidate.adno}</h1>
            <h1>Institute:</h1>
            <h1>Address:</h1>
          </div>
           }
        </div>
      </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;
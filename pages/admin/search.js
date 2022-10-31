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
  // console.log(candidates)

  let array = []
  candidates.map((candidate) => {
    array.push({ value: candidate.chestNO, label: candidate.chestNO + ' ' + candidate.name })
  })
  const handleOnChange = (e) => {
    baseApi.get('admin/candidates/' + e.value).then(res => {
      setSelectedCandidate(res.data.data)
    })

  }
  console.log(selectedCandidate)
  let programs = []
  if (selectedCandidate) {
    selectedCandidate?.programs?.map((program) => {
      programs.push(program.name)
    })
  }
  programs = programs.join(', ')
  // console.log(programs)  
  // some dummy programs
  programs = ['speech malayalam', 'sudoku', 'digital magazine', 'spot transilation','writing malayalam']


  return (
    <Portal_Layout activeTabName='dashboard' activeChildTabName='' userType='admin'>

      <div className={styles.students} >
        <h3>Display Candidates</h3>

        <Select options={array} onChange={handleOnChange} />
        <div className={styles.container}>
          <div>
            {/* display candidate image */}
            <Image src={selectedCandidate?.photo.url} height={200} width={150} />


          </div>
          {selectedCandidate &&

            <div className={styles.both}>
            <div className={styles.delatails}>
              <p> Name: </p>
              <p>chestNO:   </p>
              <p>Category:   </p>
              <p> Institute: </p>
              <p className={styles.programs}>Programs:</p>

            </div>
            <div className={styles.delatails}>
              <p> {selectedCandidate.name}</p>
              <p>  {selectedCandidate.chestNO} </p>
              <p>  {selectedCandidate.category.name} </p>
              <p>   {selectedCandidate.institute.name}</p>
              {
                programs?.map((program) => {
                  return (
                    <p>  {program}</p>
                  )
                })
              }

            </div>
            </div>
           

          }
          </div>
      </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;
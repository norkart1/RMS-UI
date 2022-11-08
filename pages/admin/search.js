import Select from 'react-select'
import Portal_Layout from '../../components/portal/portal_Layout';
import { useState } from 'react';
import { useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import { useEffect } from 'react';
import styles from '../../styles/component/comp_candidate.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router'


const DisplayCandidates = (props) => {
    const [candidates, setCandidates] = useState([]);
  const [prefix, setPrefix] = useState('')
  const router = useRouter()
  const [searchResult, setSearchResult] = useState([])


  const handleSearch = (e) => {
    router.push('#' + e.value)

  }

  useEffect(() => {
    
    let sessionID = localStorage.getItem('sessionID')
    prefix = sessionID == 2 ? 'N' : null
    baseApi.get('admin/candidate-programs/candidates/all?sessionID='+sessionID)
     .then((res) => {
      setSearchResult(res.data.data)
        
        
      } 
    )
     

  }, [])
   
  let array = []
  searchResult?.map((candidate) => {
    array.push({ value: candidate.candidate_chest_no, label: candidate.candidate_chest_no + ' ' + candidate.candidate_name })
  })


  
  
  return (
    <Portal_Layout activeTabName='search' activeChildTabName='' userType='admin'>

      <h1>Search</h1>
        <h3>Display Candidates</h3>

        <Select options={array} onChange={handleSearch} />
        <div className={styles.allstudents} >
          {searchResult?.map(
            (item, index) => {
              let obj = item?.candidate_photo
              let url = JSON.parse(obj)?.url

              return (
                <div className={styles.Allcontainer} key={index} id={item.candidate_chest_no}>
                  <div className={styles.Imagecontainer}>
                    <Image src={url} height={200} width={200} />

                  </div>
                  <p style={{ fontWeight: "bold", textAlign: 'center' }}>  {item.candidate_name} <br /> {prefix}{item.candidate_chest_no}  </p>

                  <div className={styles.both}>
                    <div className={styles.delatails}>
                      <p>Category:   </p>
                      <p> Institute: </p>
                      <p>Programs:</p>
                    </div>
                    <div className={styles.delatails}>

                      <p>   {item.category_name} </p>
                      <p>   {item.institute_name} </p>
                      {item.program_name?.map((item) => {
                        return (
                          <p> {item} </p>
                        )
                      })}



                    </div>
                  </div>
                </div>
              )


            }
          )}

      
      </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;
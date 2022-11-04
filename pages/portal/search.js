import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions'
import styles from '../../styles/component/comp_candidate.module.css'
import Select from 'react-select'
import Image from 'next/image'
import baseApi from '../../api/baseApi'
import { useEffect, useState } from 'react'


function Search() {
  let userDetails
  userDetails = useGet('/coordinator/me', false, false, false, (err) => { }, false)[0]

  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const handleSearch = (e) => {
    setSearch(e.value)
    baseApi.get('coordinator/candidate-programs/candidateCard' + e.value).then(res => {
      setSearchResult(res.data.data)
    })
  }


  useEffect(() => {
    baseApi.get('coordinator/candidate-programs/candidates/all', {
      params: {
        search: search
      }
    }).then((res) => {
      console.log(res.data.data)
      setSearchResult(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [search])

  let array = []
  searchResult?.map((candidate) => {
    array.push({ value: candidate.candidate_chest_no, label: candidate.candidate_chest_no + ' ' + candidate.candidate_name })
  })


  return (
    <Portal_Layout activeTabName='dashboard' userType='institute'  >
      <h1>Dash board</h1>

      <Select options={array} onChange={handleSearch} />
      <h3>Display Candidates</h3>
      <div className={styles.allstudents} >

        {searchResult?.map(
          (item, index) => {
            let obj = item?.candidate_photo
            let url = JSON.parse(obj)?.url

            return (
              <div className={styles.Allcontainer} key={index} >

                <Image src={url} height={200} width={200} />

                <div className={styles.both}>
                  <div className={styles.delatails}>
                    <p > Name: </p>
                    <p>chestNO:   </p>
                    <p>Category:   </p>
                    <p> Institute: </p>
                    <p  >Programs:</p>

                  </div>
                  <div className={styles.delatails}>
                    <p style={{ fontWeight: "bold" }}>  {item.candidate_name}  </p>
                    <p>   {item.candidate_chest_no} </p>
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

  )
}

export default Search
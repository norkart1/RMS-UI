import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions'
import styles from '../../styles/component/comp_candidate.module.css'
import Select from 'react-select'
import Image from 'next/image'
import baseApi from '../../api/baseApi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


function Search() {
  const router = useRouter()
  const [prefix, setPrefix] = useState('')

  let userDetails
  userDetails = useGet('/coordinator/me', false, false, false, (err) => { }, false)[0]

  useEffect(() => {
    baseApi.get('/coordinator/me').then((res) => {
      setPrefix(res.data.data.institute_id.session.chest_no_prefix)

    })
  }, [])



  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const handleSearch = (e) => {
    router.push('#' + e.value)

  }


  useEffect(() => {
    baseApi.get('coordinator/candidate-programs/candidates/all', {
      params: {
        search: search
      }
    }).then((res) => {
      // 
      setSearchResult(res.data.data)
    }).catch((err) => {
      // 
    })
  }, [search])

  let array = []
  searchResult?.map((candidate) => {
    array.push({ value: candidate.candidate_chest_no, label: candidate.candidate_chest_no + ' ' + candidate.candidate_name })
  })


  return (
    <Portal_Layout activeTabName='search' userType='institute'  >
      <h1>Search</h1>
      <span data-theme='hr' style={{ marginBottom: '1rem' }}></span>
      <Select options={array} onChange={handleSearch} />
      <div className={styles.allstudents} >

        {searchResult?.map(
          (item, index) => {
            let obj = item?.candidate_photo
            let url = JSON.parse(obj)?.url

            return (
              <div className={styles.Allcontainer} key={index} id={item.candidate_chest_no}>
                <div className={styles.Imagecontainer}>
                  <Image src={url} height={200} width={175} />

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

  )
}

export default Search
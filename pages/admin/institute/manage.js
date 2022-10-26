import React, { useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
// import styles from '../../../styles/manage.module.scss'
import styles from '../../../styles/portals/input_table.module.css'
// import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'
import Input from '../../../components/portal/inputTheme'
import baseApi from '../../../api/baseApi'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import EditIcon from '../../../public/assets/svg/edit.svg'
import { objToFormData } from '../../../helpers/functions'


import { downloadExcel } from '../../../helpers/functions'

function Candidates() {
  // const [activeTabName, setActiveTabName] = useState()
  // const [activeChildTabName, setActiveChildTabName] = useState()
  // const institutesTable = useRef(null)

  const [shortName, setShortName] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [coverPhoto, setCoverPhoto] = useState()
  const [instiID, setInstiID] = useState()
  const [sessionID, setSessionID] = useState(1)
  const [isSubmitting, setSubmitting] = useState(false)


  const [id, setId] = useState('')
  const [process, setProcess] = useState('add')
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState([])




  useEffect(() => {
    // document.getElementById('sessionIDChanger').value =localStorage.getItem('sessionID')
    setLoading(true)
    
   
    baseApi.get(`/admin/institutes?session_id=${localStorage.getItem('sessionID')}` )
      .then((res) => {
        setData(res.data.data)
       
      })
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false)
        
      })

  }, [])

  const loadTableData = async () => {
    baseApi.get(`/admin/institutes?session_id=${localStorage.getItem('sessionID')}`)
      .then((res) => {
        if (res.data.success) setData(res.data.data)
        else alert(res.data.data)
      })
      // .catch((err) => alert(err))
      .finally(() => {
        setLoading(false)
      })
  }


  const clearForm = () => {
    setShortName('')
    setAddress('')
    setName('')
    // setCoverPhoto('')
    // setEmail('')
    // setId('')
    setProcess('add')
    document.getElementById('shortName').innerText = ''
    document.getElementById('address').innerText = ''
    document.getElementById('name').innerText = ''
    document.getElementById('shortName').innerText = ''
    document.getElementById('coverPhoto').innerText = ''
  }
  const validatePhoto = (file) => {
    if (file.size > 1000000) {
      alert('File size should be less than 1MB')
      return false
    }
    return true
  }
  const validateForm = () => {
    if (shortName === '' || name === '' || sessionID === '' || coverPhoto === '' || address === '' || coverPhoto === '' || coverPhoto === undefined || coverPhoto === null || validatePhoto(coverPhoto) == false) {
      alert('Please fill all the fields')
      return false
    }
    return true
  }
  const handleSubmit = async (e) => {

    e.preventDefault()

    setSubmitting(true)
    const data = {
      name,
      address,
      coverPhoto,
      sessionID: localStorage.getItem('sessionID'),
      shortName,
    }

   
    if (validateForm()) {
      
      if (process == 'add') {
        baseApi.post('admin/institutes/', await objToFormData(data))
          .then(async (res) => {
          })
          .catch((err) => alert(err))
          .finally(async () => {
            loadTableData()
            setSubmitting(false)
          }
          )
      }
      else if (process == 'update') {
        const data = {
          name,
          address,
          coverPhoto,
          sessionID: localStorage.getItem('sessionID'),
          shortName,
        }
        baseApi.patch(`/admin/institutes/${instiID}`, await objToFormData(data))
          .catch((err) => {
            alert(err)
          })
          .finally(async () => {
            loadTableData()
            // setLoading(false)
            clearForm()
            setSubmitting(false)
          })
      }
    }
    else {
      alert('Please fill all the fields | name: ' + name + ", address: " + address + ", shortName: " + shortName + ", coverPhoto: " + coverPhoto, "Process: " + process)
      
      setSubmitting(false)
    }

  }
  const handleEdit = async (id, index) => {
    // clearForm()
    setInstiID(id)
    const row = document.querySelector(`tbody`).rows[index + 1]
    setShortName(row.cells[2].innerText)
    setAddress(row.cells[3].innerText)
    setName(row.cells[4].innerText)
    setProcess('update')
  }
  const handleDelete = (id) => {
    baseApi.delete(`/admin/institutes/${id}`)
      .then((res) => {
        if (!res.data.success) alert(res.data.data)
        alert('Deleted')
      })
      .finally(() => {
        loadTableData()
      })
  }
  const handlePhotoChange = (e) => {
    setCoverPhoto(e.target.files[0])
    
  }
  const heads = ['', 'SI.', 'Short Name', 'Place', 'Full name','ID']
  return (
    <Portal_Layout activeTabName='institutes' activeChildTabName='manage institutes' userType='admin'>
      <div className={styles.pageContainer}>

        <h1>Institute Management</h1>
        <span data-theme='hr'></span>
        <div className={styles.dataContainer}>
          <div className={styles.forms}>
            <h2>Add or Edit Institute</h2>
            <div className={styles.formContainer} data-theme='formContainer'>
              <form action="#">
                <Input label='Short name' name='shortName' helper_text='Eg:DHIU' handleOnChange={e => setShortName(e.target.value.toUpperCase())}
                  value={shortName}
                  placeholder='Short name' status='normal' />
                <Input label='Name of the institution' name='name' helper_text='Eg: Darul Huda Islamic University' handleOnChange={e => setName(e.target.value)}
                  value={name}
                  placeholder='Name' status='normal' />
                <Input label='Place' name='address' helper_text='Eg: Chemmad' handleOnChange={e => setAddress(e.target.value)}
                  value={address}
                  placeholder='Place' status='normal' />
                <Input label='Cover photo' name='coverPhoto' type='file'
                  handleOnChange={(e) => handlePhotoChange(e)}
                  placeholder='Photo' status='normal' />

                <div className={styles.formBtns} style={{ width: '100%' }}>

                  <button data-theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit}>
                    {isSubmitting ? "Submitting..." : process.toUpperCase()}
                    {/* {process.toUpperCase()} */}
                  </button>
                  <button data-theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <div className={styles.table_header}>

              <h2>Added Institutes</h2>
              <button data-theme={'edit'} onClick={() => downloadExcel(sampleData)}>DownLoad Excel &darr;</button>
            </div>

            <div data-theme="table">
              {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> :

                <Data_table id='institutesTable' heads={heads} >
                  {
                    data.map((item, index) => {
                      let siNo = index + 1;
                      return (
                        <tr key={index}>
                          <td style={{ width: '7.8rem' }}>
                            <button data-theme='edit' onClick={() => handleEdit(item.id, index)}>
                              <EditIcon height={16} />
                            </button>
                            <button data-theme='delete' onClick={() => handleDelete(item.id, index)}>
                              <DeleteIcon height={16} />
                            </button>
                          </td>
                          <td style={{ width: '1rem' }}>{siNo}</td>
                          <td style={{ width: '8rem' }}>{item.shortName}</td>
                          <td style={{ width: '19rem' }}>{item.address}</td>
                          <td style={{ width: 'auto' }}>{item.name}</td>
                          <td style={{ width: '3rem' }}>{item.id}</td>
                        </tr>
                      )
                    })
                  }
                </Data_table>
              }
            </div>
          </div>
        </div>
      </div>

    </Portal_Layout>
  )
}
Candidates.gracefulHydrationErrors = false
export default Candidates
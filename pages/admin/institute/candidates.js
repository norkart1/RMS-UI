import React, { useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table'
import Input from '../../../components/portal/inputTheme'
import baseApi from '../../../api/baseApi'
import axios from 'axios'
import { objToFormData, showMessage } from '../../../helpers/functions'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import EditIcon from '../../../public/assets/svg/edit.svg'
import { toast } from 'react-toastify'


function Candidates() {

  const [data, setData] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState()
  const [currentClasses, setCurrentClasses] = useState([1])
  const [name, setName] = useState("")
  const [clas, setClas] = useState("1")
  const [adNo, setAdNo] = useState("")
  const [dob, setDob] = useState("")
  const [photo, setPhoto] = useState()
  const [candId, setCandId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [gender, setGender] = useState('M')
  const [institutes, setInstitutes] = useState([])
  const [instituteID, setInstituteID] = useState('')


  const [process, setProcess] = useState('add')

  useEffect(() => {
    setLoading(true)
    baseApi.get('/admin/candidates')
      .then((res) => {
        setData(res.data.data.candidates)
        console.log(data);
      })
      .catch((err) =>
        toast(err.response.data.data)
      )
    baseApi.get(`/admin/institutes?session_id=${window.localStorage.getItem('sessionID')}`)
      .then((res) => {
        setInstitutes(res.data.data)
        console.log(data);
        setInstituteID(`${res.data.data[0].id}`)
      })
      .catch((err) =>
        toast(err.response.data.data)
      )
    baseApi.get(`/admin/categories?session_id=${window.localStorage.getItem('sessionID')}`)
      .then((res) => {
        setCategories(res.data.data)
        setCategory(`${res.data.data[0].id}`)
        console.log(data);
      })
      .catch((err) =>
        toast(err.response.data.data)
      )
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (gender === 'F') document.getElementById('photo').value = null
  }, [gender])

  const clearForm = () => {
    setProcess('add')
    setName("")
    setAdNo("")
    setDob("")
    setPhoto({})
    document.getElementById('photo').value = ""
    document.getElementById('categoryID').value = ""
    document.getElementById('class').value = ""
    document.getElementById('dob').value = ""

  }


  const validatePhoto = (file) => {
    if (file.size > 1000000) {
      alert('File size should be less than 1MB')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setClas(document.getElementById('class').value)
    setCategory(document.getElementById('categoryID').value)
    setDob(document.getElementById('dob').value)
    setSubmitting(true)
    const data = {
      name: name,
      class: clas,
      adno: adNo,
      dob: dob,
      categoryID: category,
      instituteID, //change it to dynamic
      photo,
      instituteID,
      gender
    }

    console.log('submitting data', data);

    if (process == 'add') {
      baseApi.post('admin/candidates', objToFormData(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          if (res.data.success) {
            toast.success("Added Successfully")
          }
        })
        .catch((err) => {
          toast.error(err.response.data.data)
        })
        .finally(async () => {
          loadTableData()
          setSubmitting(false)
        }
        )
    }
    else if (process == 'update') {
      document.getElementById('categoryID').disabled = true
      const data = {
        name: name,
        class: clas,
        adno: adNo,
        dob: dob,
        categoryID: category,
        instituteID: "2", //change it to dynamic
        // file: photo,
        // id: candId
      }
      baseApi.patch(`/candidates/${candId}`, await objToFormData(data), {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

        .then(async (res) => {
          if (res.data.success) {
            toast.success("Added Successfully")
          }
        })
        .catch((err) => {
          toast.error(err.response.data.data)
        })
        .finally(async () => {
          loadTableData()
          // setLoading(false)
          clearForm()
          setSubmitting(false)
        })
    }

  }

  const handleEdit = async (id, index) => {
    // clearForm()
    const row = document.querySelector(`tbody`).rows[index + 1]
    setCandId(id)
    // (row.cells[3].innerHTML)
    setName(row.cells[3].innerHTML)
    setClas(row.cells[5].innerHTML)
    setAdNo(row.cells[6].innerHTML)
    setDob(row.cells[7].innerHTML)
    setGender(row.cells[8].innerHTML)
    setProcess('update')
  }

  const handleDelete = (id) => {
    axios.delete(`http://api.sibaq.dhiu.in/admin/candidates/${id}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        // if (res.data.success) {
          console.log('get res',res);
          toast.success("Deleted Successfully")
        // }
      })
      .catch((err) => {
        console.log('error while deleting', err);
        console.log(err);
        // toast.error(err.response.data.data)
      })
      .finally(() => {
        loadTableData()
      })
  }



  const loadTableData = async () => {
    await baseApi.get(('/admin/candidates'))
      .then((res) => {
        setData(res.data.data.candidates)
      })
      .catch((err) => {
        toast.error(err.response.data.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0])

  }

  const heads = ['Actions', 'SI No', 'Chest No.', 'Name', 'Category', 'Class', 'Ad. No.', 'Date of Birth', 'Gender']
  return (
    <Portal_Layout activeTabName='programs' userType='admin' activeChildTabName='candidates'  >
      <div className={styles.pageContainer}>

        <h1>Candidate Management</h1>
        <span theme='hr'></span>
        <div className={styles.dataContainer}>

          <div className={styles.forms}>
            <h2>Add or Edit Candidates</h2>
            <div className={styles.formContainer} theme='formContainer' style={{ maxHeight: '75vh' }}>
              <form action="#" >
                <Input type='dropdown' label='Select institute' name='instituteID' isDisabled={process == 'update'}
                  value={instituteID} handleOnChange={(e) => setInstituteID(e.target.value)} dropdownOpts={institutes}
                  placeholder='Name' status='normal' />
                <Input type='dropdown' label='Candidate category' name='categoryID' isDisabled={process == 'update'}
                  value={category} handleOnChange={(e) => setCategory(e.target.value)} dropdownOpts={categories}
                  placeholder='Name' status='normal' />
                <Input label='Class' name='class' type='text'
                  dropdownOpts={currentClasses} handleOnChange={({ target }) => setClas(target?.value)}
                  value={clas} placeholder='Class' status='normal' />
                <Input label='Name' name='candname'
                  handleOnChange={({ target }) => setName(target?.value)}
                  value={name}
                  placeholder='Name' status='normal' />
                <Input label='Ad. No' name='adno'
                  handleOnChange={({ target }) => setAdNo(target?.value)}
                  value={adNo}
                  placeholder='Ad. No.' status='normal' />
                <Input label='Date of birth' name='dob' type='date'
                  handleOnChange={({ target }) => setDob(target?.value)}
                  value={dob}
                  placeholder='DOB' status='normal' />
                <Input type='dropdown' label='Gender' name='gender'
                  value={gender} handleOnChange={(e) => { setGender(e.target.value) }} dropdownOpts={[{ id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]}
                  placeholder='Gender' status='normal' />
                <Input label='Photo' name='photo' type='file' isDisabled={gender == 'F'}
                  handleOnChange={(e) => handlePhotoChange(e)}
                  placeholder='Photo' status='normal' />
                <div className={styles.formBtns} style={{ width: '100%' }}>

                  <button theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit}>
                    {isSubmitting ? "Submitting..." : process.toUpperCase()}
                    {/* {process.toUpperCase()} */}
                  </button>
                  <button theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <h2>Added Candidates</h2>
            <div theme="table" style={{ maxHeight: '70vh', width: '100%', overflowX: 'auto' }}>
              {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> :
                <Data_table id='institutesTable' data={data} heads={heads}>
                  {
                    data.map((item, index) => {
                      let siNo = index + 1;
                      return (
                        <tr key={index}>
                          <td style={{ minWidth: '6rem', width: 'fit-content' }}>
                            <button theme='edit' onClick={() => handleEdit(item.id, index)}>
                              <EditIcon height={16} />
                            </button>
                            <button theme='delete' onClick={() => handleDelete(item.id)}>
                              <DeleteIcon height={16} />
                            </button>
                          </td>
                          <td style={{}}>{siNo}</td>
                          <td style={{ minWidth: '3rem', width: 'fit-content' }}>{item.chestNO}</td>
                          <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.name}</td>
                          <td style={{ minWidth: '4rem', width: 'fit-content' }}>{item.categoryID}</td>
                          <td style={{ minWidth: '3rem', width: 'fit-content' }}>{item.class}</td>
                          <td style={{ minWidth: '3rem', width: 'fit-content' }}>{item.adno}</td>
                          <td style={{ minWidth: '5rem', width: 'fit-content' }}>{item.dob}</td>
                          <td style={{ minWidth: '5rem', width: 'fit-content' }}>{item.gender}</td>
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

export default Candidates
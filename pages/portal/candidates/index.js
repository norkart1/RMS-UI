import React, { useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'
import Input from '../../../components/portal/inputTheme'
import baseApi from '../../../api/baseApi'
import axios from 'axios'
import { objToFormData } from '../../../helpers/functions'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import EditIcon from '../../../public/assets/svg/edit.svg'


function Candidates() {
  const categories = [
    {

      name: 'Bidayah',
      classes: [1]
    },
    {
      name: 'Oola',
      classes: [2, 3]
    },
    {
      name: 'Thaniya',
      classes: [4, 5]
    },
    {
      name: 'Thanawiya',
      classes: [6, 7]
    },
    {
      name: 'Aliya',
      classes: [8, 9, 10]
    },
  ]
  const [category, setCategory] = useState("Oola")
  const [currentClasses, setCurrentClasses] = useState([1])
  const [name, setName] = useState("")
  const [clas, setClas] = useState("")
  const [adNo, setAdNo] = useState("")
  const [dob, setDob] = useState("")
  const [photo, setPhoto] = useState()
  const [candId, setCandId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)

  const [data, setData] = useState([])

  const [process, setProcess] = useState('add')

  useEffect(() => {
    setLoading(true)
    // console.log('category based', category, data.find(item => item.categoryID === category))
    console.log("loading")
    baseApi.get('/candidates')
      .then((res) => setData(res.data.data))
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false)
      })
  }, [])


  const clearForm = () => {
    setProcess('add')
    setName("")
    setAdNo("")
    setDob("")
    setPhoto({})
  }

  const validateForm = () => {
    if (name == "" || adNo == "" || dob == "" || photo == "" || photo == null || photo == undefined) {
      alert('Please fill all the fields')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setClas(document.getElementById('class').value)
    setCategory(document.getElementById('categoryID').value)
    setSubmitting(true)
    const data = {
      name: name,
      class: clas,
      adno: adNo,
      dob: dob,
      categoryID: category,
      instituteID: "2", //change it to dynamic
      file: photo
    }

    console.log(objToFormData(data));
    if (validateForm()) {
      if (process == 'add') {
        baseApi.post('/candidates', await objToFormData(data), {
          headers: {
            "Content-Type": "multipart/form-data",
          }
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
          name: name,
          class: clas,
          adno: adNo,
          dob: dob,
          categoryID: category,
          instituteID: "2", //change it to dynamic
          file: photo,
          id: candId
        }
        baseApi.patch(`/candidates/${candId}`, data)
          .catch((err) => alert(err))
          .finally(async () => {
            loadTableData()
            setLoading(false)
            clearForm()
            setSubmitting(false)
          })
      }
    } else {
      console.log('not validated')
    }
  }

const handleClear = (e) => {
  e.preventDefault()
  clearForm()
}
  const handleEdit = async (id) => {
    const row = document.querySelector(`tbody`).rows[id]

    setCandId(id)
    setName(row.cells[3].innerHTML)
    setClas(row.cells[4].innerHTML)
    setAdNo(row.cells[5].innerHTML)
    setDob(row.cells[6].innerHTML)
    setProcess('update')

  }

  const handleDelete = async (id) => {
    // console.log(id)
    const isDeleteSuccess =
      await baseApi.delete(`/candidates/${id}`)
        .then((res) => {
          alert('Candidate deleted successfully')
          loadTableData()
        })
  }

  const hadleCategoryChange = (e) => {
    setCategory(e.target.value)
    setCurrentClasses(categories.find(c => c.name == e.target.value).classes)
  }

  const loadTableData = async () => {
    const fetchedData =
      (await baseApi.get('/candidates')).data.data
    setData(fetchedData)
    console.log(fetchedData);
    console.log('loaded');
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0])
    console.log(e.target.files[0]);
  }

  const heads = ['Actions', 'SI No', 'Chest No.', 'Name', 'Category', 'Class', 'Ad. No.', 'Date of Birth']
  return (
    <Portal_Layout activeTabName='candidates' userType='institute' activeChildTabName='manage candidates'  >
      <div className={styles.pageContainer}>

        <h1>Candidate Management</h1>
        <span theme='hr'></span>
        <Input type='dropdown' label='Candidate category' name='categoryID'
          value={category} handleOnChange={hadleCategoryChange} dropdownOpts={categories.map(cat => cat['name'])}
          placeholder='Name' status='normal' />
        <div className={styles.dataContainer}>

          <div className={styles.forms}>
            <h2>Add or Edit Candidates</h2>
            <div className={styles.formContainer} theme='formContainer' style={{ maxHeight: '67vh' }}>
              <form action="#" >
                <Input label='Name' name='name'
                  handleOnChange={({ target }) => setName(target?.value)}
                  value={name}
                  placeholder='Name' status='normal' />
                <Input label='Class' name='class' type='dropdown'
                  dropdownOpts={currentClasses} handleOnChange={({ target }) => setClas(target?.value)}
                  value={clas} placeholder='Class' status='normal' />
                <Input label='Ad. No' name='adno'
                  handleOnChange={({ target }) => setAdNo(target?.value)}
                  value={adNo}
                  placeholder='Ad. No.' status='normal' />
                <Input label='Date of birth' name='dob' type='date'
                  handleOnChange={({ target }) => setDob(target?.value)}
                  value={dob}
                  placeholder='DOB' status='normal' />
                <Input label='Photo' name='photo' type='file'
                  handleOnChange={(e) => handlePhotoChange(e)}
                  // value={photo}
                  placeholder='Photo' status='normal' />
                <div className={styles.formBtns} style={{width:'100%'}}>

                  <button theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit}>
                    {/* {isSubmitting ? >> : process == 'add' ? 'Add' : 'Update'} */}
                    {process.toUpperCase()}
                    </button>
                  <button theme='clear' style={{ width: '25%' }} onClick={handleClear}>X</button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <h2>Added Candidates</h2>
            <div theme="table" style={{ maxHeight: '70vh', width: '110%', overflowX: 'auto' }}>
              {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> :
              <Data_table id='institutesTable' data={data} heads={heads} handleEdit={handleEdit} handleDelete={handleDelete}>
                {
                  data.map((item, index) => {
                    let siNo = index + 1;
                    return (
                      <tr key={index}>
                        <td style={{ minWidth: '6rem', width: 'fit-content' }}>
                          <button theme='edit' onClick={() => handleEdit(item.id)}>
                            <EditIcon height={16} />
                          </button>
                          <button theme='delete' onClick={() => handleDelete(item.id)}>
                            <DeleteIcon height={16} />
                          </button>
                        </td>
                        <td style={{}}>{siNo}</td>
                        <td style={{ minWidth: '3rem', width: 'fit-content' }}>{item.chestNO}</td>
                        <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.name}</td>
                        <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.categoryID}</td>
                        <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.class}</td>
                        <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.adno}</td>
                        <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.dob}</td>
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
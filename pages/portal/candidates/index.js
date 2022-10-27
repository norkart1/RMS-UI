import React, { useContext, useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
// import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'
import Input from '../../../components/portal/inputTheme'
import baseApi from '../../../api/baseApi'
import { apiPatch, apiPost, capitalize, objToFormData, onlyNumbers, useGet } from '../../../helpers/functions'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import EditIcon from '../../../public/assets/svg/edit.svg'
import { toast } from 'react-toastify'
// import { UserC}

// user = useContext(UserContext)


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
  const [clas, setClas] = useState("1")
  const [adNo, setAdNo] = useState("")
  const [dob, setDob] = useState("")
  const [photo, setPhoto] = useState()
  const [candId, setCandId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)

  const [data, setData] = useState([])

  const [process, setProcess] = useState('add')

  let candidates;
  candidates = useGet('/coordinator/candidates', false, () => setLoading(true), false, false, () => setLoading(false))
  // useEffect(() => {
  //   setLoading(true)

  //   baseApi.get('/coordinator/candidates' )
  //     .then((res) => setData(res.data.data))
  //     .catch((err) => alert(err))
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])
  
  let userDetails
  userDetails = useGet('/coordinator/me', false, false, false, (err) => { }, false)[0]
  console.log(userDetails);

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
    if (file.size < 100000) {
      toast.error('File size should be less than 1MB')
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
      //instituteID: ,//"2", //change it to dynamic
      file: photo
    }


    if (validatePhoto(photo)) {
      if (process == 'add') {
        apiPost('/coordinator/candidates/', data, true, false, false, () => { loadTableData(); setSubmitting(false) })
      }

      else if (process == 'update') {
        apiPatch(`/coordinator/candidates/${catID}`, data, true, false, false, () => { loadTableData(); setSubmitting(false); setProcess('add') })
      }

      // if (process == 'add') {
      //   baseApi.post('/coordinator/candidates', await objToFormData(data), {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       'Authorization': `Bearer ${localStorage.getItem('token')}`
      //     }
      //   })
      //     .then(async (res) => {
      //       // if (!res.success) alert(res.data)
      //     })
      //     .catch((err) => alert(err))
      //     .finally(async () => {
      //       loadTableData()
      //       setSubmitting(false)
      //     }
      //     )
      // }
      // else if (process == 'update') {
      //   document.getElementById('categoryID').disabled = true
      //   const data = {
      //     name: name,
      //     class: clas,
      //     adno: adNo,
      //     dob: dob,
      //     categoryID: category,
      //     instituteID: "2", //change it to dynamic
      //     file: photo,
      //     // id: candId
      //   }
        // baseApi.patch(`/coordinator/candidates/${candId}`, await objToFormData(data), {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        //   .catch((err) => {
        //     alert(err)
        //   })
        //   .finally(async () => {
        //     loadTableData()
        //     // setLoading(false)
        //     clearForm()
        //     setSubmitting(false)
        //   })
      }
    }
  

  const handleEdit = async (id, index) => {
    // clearForm()
    const row = document.querySelector(`tbody`).rows[index + 1]
    setCandId(id)
    setName(row.cells[3].innerHTML)
    setCategory(row.cells[4].innerHTML)
    setClas(row.cells[5].innerHTML)
    setAdNo(row.cells[6].innerHTML)
    setDob(row.cells[7].innerHTML)
    setProcess('update')
  }

  const handleDelete = async (id) => {

    await baseApi.delete(`/coordinator/candidates/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (!res.data.success) alert(res.data.data)
      })
      .finally(() => {
        alert('Deleted')
        loadTableData()
      })
  }

  const hadleCategoryChange = (e) => {
    setCategory(e.target.value)
    // setCurrentClasses(categories.find(c => c.name == e.target.value).classes)
  }

  const loadTableData = async () => {
    await baseApi.get(('/coordinator/candidates'), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (res.data.success) setData(res.data.data)
        else alert(res.data.data)
      })
      // .catch((err) => alert(err))
      .finally(() => {
        setLoading(false)
      })
  }


  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0])
    console.log(e.target.files[0])
    console.log("photo",photo)
  }

  const heads = ['Actions', 'SI No', 'Chest No.', 'Name', 'Category', 'Class', 'Ad. No.', 'Date of Birth']
  return (
    <Portal_Layout activeTabName='candidates' userType='institute' activeChildTabName='manage candidates'  >
      <div className={styles.pageContainer}>

        <h1>Candidate Management</h1>
        <span data-theme='hr'></span>
        <div className={styles.dataContainer}>

          <div className={styles.forms}>
            <h2>Add or Edit Candidates</h2>
            <div className={styles.formContainer} data-theme='formContainer' style={{ maxHeight: '75vh' }}>
              <form action="#" >
                <Input type='dropdown' label='Candidate category' name='categoryID' isDisabled={process == 'update'}
                  value={category} handleOnChange={hadleCategoryChange} dropdownOpts={categories  } 
                  placeholder='Name' status='normal' />
                <Input label='Class' name='class' type='text'
                  handleOnChange={({ target }) => setClas(target?.value)}
                  value={clas} placeholder='Class' status='normal' />
                <Input label='Name' name='candname'
                  handleOnChange={({ target }) => setName(target?.value)}
                  value={capitalize(name)}
                  placeholder='Name' status='normal' />
                <Input label='Ad. No' name='adno'
                  handleOnChange={({ target }) => setAdNo(target?.value)}
                  value={onlyNumbers(adNo)}
                  placeholder='Ad. No.' status='normal' />
                <Input label='Date of birth' name='dob' type='date'
                  handleOnChange={({ target }) => setDob(target?.value)}
                  value={dob}
                  placeholder='DOB' status='normal' />
                <Input label='Photo' name='photo' type='file'
                  handleOnChange={(e) => handlePhotoChange(e)}
                  // value={photo}
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
            <h2>Added Candidates</h2>
              <button data-theme={'edit'} onClick={() => downloadExcel(data)}>DownLoad Excel &darr;</button>
            </div>
            <div data-theme="table" style={{ maxHeight: '70vh', width: '100%', overflowX: 'auto' }}>
              {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> :
                <Data_table id='institutesTable' data={data} heads={heads}>
                  {
                    data.map((item, index) => {
                      let siNo = index + 1;
                      return (
                        <tr key={index}>
                          <td style={{ minWidth: '6rem', width: 'fit-content' }}>
                            <button data-theme='edit' onClick={() => handleEdit(item.id, index)}>
                              <EditIcon height={16} />
                            </button>
                            <button data-theme='delete' onClick={() => handleDelete(item.id)}>
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
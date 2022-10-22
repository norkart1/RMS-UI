import React, { useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'
import Input from '../../../components/portal/inputTheme'


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
  ] //make it object with classes
  const [category, setCategory] = useState("Bidayah")
  const [currentClasses, setCurrentClasses] = useState([1])
  const [name, setName] = useState("")
  const [clas, setClas] = useState("")
  const [adNo, setAdNo] = useState("")
  const [dob, setDob] = useState("")
  const [photo, setPhoto] = useState("")

  const [process, setProcess] = useState('add')

  const clearForm = () => {
    setProcess('add')
    setName("")
    setAdNo("")
    setDob("")
    setPhoto("")
  }

  const validateForm = () => {
    if (name == "" || clas == "" || adNo == "" || dob == "" || photo == "" || photo == null || photo == undefined) {
      alert('Please fill all the fields')
      return false
    }
    return true
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setClas(document.getElementById('class').value)
    setCategory(document.getElementById('category').value)
    const data = {
      name: name,
      class: clas,
      adNo: adNo,
      dob: dob,
      photo: photo,
      category: category
    }
    console.log(data);
    clearForm()
    if (validateForm()) {
      console.log('validated', data)
      clearForm()
    }
  }
  const handleEdit = async (id) => {
    const row = document.querySelector(`tbody`).rows[id]
    setName(row.cells[1].innerHTML)
    setClas(row.cells[2].innerHTML)
    setAdNo(row.cells[3].innerHTML)
    setDob(row.cells[4].innerHTML)
    setProcess('update')
  }

  const handleDelete = (id) => {
    console.log(id)
  }
  const hadleCategoryChange = (e) => {
    setCategory(e.target.value)
    setCurrentClasses(categories.find(c => c.name == e.target.value).classes)
  }
  const heads = ['SI No', 'Chest No.', 'Name', 'Class', 'Ad. No.', 'Date of Birth', 'action']
  return (
    <Portal_Layout activeTabName='candidates' userType='institute' activeChildTabName='manage candidates'  >
      <div className={styles.pageContainer}>

        <h1>Candidate Management</h1>
        <span theme='hr'></span>
        <Input type='dropdown' label='Candidate category' name='category' helper_text='Select candidate category'
          value={category} handleOnChange={hadleCategoryChange} dropdownOpts={categories.map(cat => cat['name'])}
          placeholder='Name' status='normal' />
        <div className={styles.dataContainer}>

          <div className={styles.forms}>
            <h2>Add or Edit Institute</h2>
            <div className={styles.formContainer} theme='formContainer' style={{ maxHeight: '67vh' }}>
              <form action="#" >
                <Input label='Name' name='name' helper_text='Type the candidate name'
                  handleOnChange={({ target }) => setName(target?.value)}
                  value={name}
                  placeholder='Name' status='normal' />
                <Input label='Class' name='class' helper_text='Select class of the candidate' type='dropdown'
                  dropdownOpts={currentClasses} handleOnChange={({ target }) => setClas(target?.value)}
                  value={clas} placeholder='Class' status='normal' />
                <Input label='Ad. No:' name='cand_adNo' helper_text='Type the candidate admission number'
                  handleOnChange={({ target }) => setAdNo(target?.value)}
                  value={adNo}
                  placeholder='Ad. No.' status='normal' />
                <Input label='Date of birth' name='dob' helper_text='Type Ad. number' type='date'
                  handleOnChange={({ target }) => setDob(target?.value)}
                  value={dob}
                  placeholder='DOB' status='normal' />
                <Input label='Photo' name='photo' helper_text='Select candidate photo' type='file'
                  handleOnChange={({ target }) => setPhoto(target?.value)}
                  value={photo}
                  placeholder='Photo' status='normal' />
                <button theme='submit' onClick={handleSubmit}>{process.toUpperCase()}</button>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <h2>Added Institutes</h2>
            <div theme="table">
              <Data_table id='institutesTable' data={sampleData} heads={heads} handleEdit={handleEdit} handleDelete={handleDelete}>
                {
                  sampleData.map((item, index) => {
                    let siNo = index + 1;
                    return (
                      <tr key={index}>
                        <td>{siNo}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{'item.fullName'}</td>
                        <td>{'item.email'}</td>
                        <td>{item.id}</td>
                        <td>
                          <button theme='edit' onClick={() => handleEdit(item.id)}>Edit</button>
                          <button theme='delete' onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </Data_table>
            </div>
          </div>
        </div>
      </div>
    </Portal_Layout>
  )
}

export default Candidates
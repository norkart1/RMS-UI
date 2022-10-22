import React, { useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
// import styles from '../../../styles/manage.module.scss'
import styles from '../../../styles/portals/input_table.module.css'
import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'
import Text_input from '../../../components/portal/inputTheme'


function Candidates() {
  // const [activeTabName, setActiveTabName] = useState()
  // const [activeChildTabName, setActiveChildTabName] = useState()
  // const institutesTable = useRef(null)
  const [shortName, setShortName] = useState('')
  const [place, setPlace] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [process, setProcess] = useState('add')

  const clearForm = () => {
    setShortName('')
    setPlace('')
    setFullName('')
    setEmail('')
    setId('')
    setProcess('add')
    document.getElementById('short').innerText = ''
    document.getElementById('place').innerText = ''
    document.getElementById('fullName').innerText = ''
    document.getElementById('email').innerText = ''
  }
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }
  const validateForm = () => {
    if (shortName === '' || place === '' || fullName === '' || email === '') {
      alert('Please fill all the fields')
      return false
    } else if (ValidateEmail(email) === false) {
      return (false)
    }
    return true
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setShortName(document.getElementById('short').value)
    setPlace(document.getElementById('place').value)
    setFullName(document.getElementById('fullName').value)
    setEmail(document.getElementById('email').value)
    if (validateForm()) {
      const data = {
        shortName,
        place,
        fullName,
        email,
        id
      }
      //post to server
      console.log(data)
      clearForm()

      document.querySelector('#short').focus()
    }

  }
  const handleEdit = async (id) => {
    const row = document.querySelector(`tbody`).rows[id]
    setShortName(row.cells[1].innerText)
    setPlace(row.cells[2].innerText)
    setFullName(row.cells[3].innerText)
    setEmail(row.cells[4].innerText)
    setId(row.cells[5].innerText)
    setProcess('update')
    document.querySelector('#short').select()

  }
  const handleDelete = (id) => {
    console.log(id)
    // to do
  }
  const heads = ['SI No', 'Short Name', 'Place', 'Full Name', 'Email', 'ID', 'Action']
  return (
    <Portal_Layout activeTabName='institutes' activeChildTabName='manage institutes' userType='admin'>
      <div className={styles.pageContainer}>

        <h1>Institute Management</h1>
        <span theme='hr'></span>
        <div className={styles.dataContainer}>
          <div className={styles.forms}>
            <h2>Add or Edit Institute</h2>
            <div className={styles.formContainer} theme='formContainer'>
              <form action="#">
                <Text_input label='Short name' name='short' helper_text='Eg:DHIU' handleOnChange={e => setShortName(e.target.value)} placeholder='Short name' status='normal' />
                <Text_input label='Place' name='place' helper_text='Eg: Chemmad' handleOnChange={e => setPlace(e.target.value)} placeholder='Place' status='normal' />
                <Text_input label='Full name' name='fullName' helper_text='Eg: Darul Huda Islamic University' handleOnChange={e => setFullName(e.target.value)}  placeholder='Full name' status='normal' />
                <Text_input label='Email' name='email' helper_text='Eg: mail@example.com' handleOnChange={e => setEmail(e.target.value)} placeholder='Email' status='normal' />

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
Candidates.gracefulHydrationErrors = false
export default Candidates
import React, { useEffect, useRef, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
// import styles from '../../../styles/manage.module.scss'
import styles from '../../../styles/portals/insti_manage.module.css'
import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'


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

  const institutesTable = useRef()

  const shortNameRef = useRef()
  const placeRef = useRef()
  const fullNameRef = useRef()
  const emailRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      shortName,
      place,
      fullName,
      email,
      id
    }
    console.log(data)
    shortNameRef.current.value = ''
    placeRef.current.value = ''
    fullNameRef.current.value = ''
    emailRef.current.value = ''
    setProcess('add')
  }
  const handleEdit = async (id) => {
    const row = institutesTable.current.querySelector(`tbody`).rows[id]
    shortNameRef.current.value = row.cells[1].innerText
    placeRef.current.value = row.cells[2].innerText
    fullNameRef.current.value = row.cells[3].innerText
    emailRef.current.value = row.cells[4].innerText
    shortNameRef.current.select()
    setShortName(row.cells[1].innerText)
    setPlace(row.cells[2].innerText)
    setFullName(row.cells[3].innerText)
    setEmail(row.cells[4].innerText)
    setId(row.cells[5].innerText)
    setProcess('update')

  }
  const handleDelete = (id) => {
    console.log(id)
    // to do
  }
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
                <label htmlFor="shortName" >Short Name</label><input ref={shortNameRef} theme='text' type="text" name='short' id="shortName" placeholder='Short name' required onChange={(e) => setShortName(e.target.value)} />
                <p theme="helper" >Eg:DHIU</p>
                <label htmlFor="place">Place</label><input ref={placeRef} theme='text' type="text" name='place' id="place" placeholder='place' required onChange={(e) => setPlace(e.target.value)} />
                <p theme="helper">Eg: Chemmad</p>
                <label htmlFor="FullName">Full Name</label><input ref={fullNameRef} theme='text' type="text" name='fullName' id="FullName" placeholder='institute full name' required onChange={(e) => setFullName(e.target.value)} />
                <p theme="helper">Eg:Darul Huda</p>
                <label htmlFor="email">Email</label><input ref={emailRef} theme='text' type="email" name='email' id="email" placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                <p theme="helper">Eg: mail@example.com</p>
                <button theme='submit' onClick={handleSubmit}>{process.toUpperCase() }</button>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <h2>Added Institutes</h2>
            <div theme="table">
              <table ref={institutesTable} >
                <tbody>
                  <tr>
                    <th>Si. No.</th>
                    <th>Short name</th>
                    <th>Place</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Ins. Id</th>
                    <th>Actions</th>
                  </tr>
                  {
                    sampleData.map((data, index) => {
                      let si_no = index + 1;
                      return (
                        <tr key={index}>
                          <td>{si_no}</td>
                          <td>{data.name}</td>
                          <td>{data.address}</td>
                          <td>{'data.fullName'}</td>
                          <td>{'data.email'}</td>
                          <td>{data.id}</td>
                          <td>
                            <button theme='edit' onClick={() => handleEdit(data.id)}>Edit</button>
                            <button theme='delete' onClick={() => handleDelete(data.id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }


                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>

    </Portal_Layout>
  )
}
Candidates.gracefulHydrationErrors = false
export default Candidates
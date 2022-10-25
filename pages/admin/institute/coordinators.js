import React, { useEffect, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
// import sampleData from '../../../helpers/sampleData/institute.json'
import Data_table from '../../../components/portal/data_table'
import Text_input from '../../../components/portal/inputTheme'



function Coordinators() {
    // const [activeTabName, setActiveTabName] = useState()
    // const [activeChildTabName, setActiveChildTabName] = useState()
    // const institutesTable = useRef(null)
    const sampleData = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            email: 'john@ex.com',
            phone: '1234567890',
            institute: 'IIT Bombay',
        },
        {
            id: 2,
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe',
            password: '1234567890',  
            email: 'john@ex.com',
            phone: '1234567890',
            institute: 'IIT Bombay',
        },
    ]
    const [id, setId] = useState('')
    const [instiId, setinstiId] = useState('')
    const [insti, setinsti] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setphone] = useState('')
    const [process, setProcess] = useState('add')
    const [isEmailValid, setIsEmailValid] = useState(2) // 0 - invalid, 1 - valid, 2 - not checked

    const clearForm = () => {
        setId('')
        setfirstName('')
        setlastName('')
        setuserName('')
        setpassword('')
        setEmail('')
        setphone('')
        setinsti('')
        setinstiId('')
        setProcess('add')
        document.querySelectorAll('#form').forEach((item) => {
            item.value = ''
        })
    }
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setIsEmailValid(1)
            return (true)
        }
        setIsEmailValid(0)
        return (false)
    }
    const validateForm = () => {
        if (firstName === '' || lastName === '' || userName === '' || email === '') {
            alert('Please fill all the fields')
            return false
        } else if (ValidateEmail(email) === false) {
            return (false)
        }
        return true
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setfirstName(document.getElementById('first').value)
        setlastName(document.getElementById('lastName').value)
        setuserName(document.getElementById('userName').value)
        setEmail(document.getElementById('email').value)
        if (validateForm()) {
            const data = {
                firstName,
                lastName,
                userName,
                email,
                id
            }
            //post to server
           
            clearForm()

            document.querySelector('#first').focus()
        }

    }
    const handleEdit = async (id) => {
        const row = document.querySelector(`tbody`).rows[id]
        setfirstName(row.cells[1].innerText)
        setlastName(row.cells[2].innerText)
        setuserName(row.cells[3].innerText)
        setEmail(row.cells[4].innerText)
        setId(row.cells[5].innerText)
        setProcess('update')
        document.querySelector('#first').select()

    }
    const handleDelete = (id) => {
        
        // to do
    }
    const heads = ['SI No','Institution',  'First name', 'Last name', 'User name', 'Password', 'Email', 'Phone', 'ID', 'Action']
    return (
        <Portal_Layout activeTabName='institutes' initExpandedTabName='institutes' activeChildTabName='coordinators' userType='admin'>
            <div className={styles.pageContainer}>

                <h1>Coordinators Management</h1>
                <span theme='hr'></span>
                <div className={styles.dataContainer}>
                    <div className={styles.forms}>
                        <h2>Add or Edit Coordinator</h2>
                        <div className={styles.formContainer} theme='formContainer'>
                            <form action="#" id='form'>
                                <Text_input label='First name' name='first' helper_text='Eg:DHIU' handleOnChange={e => setfirstName(e.target.value)} placeholder='first name' status='normal' />
                                <Text_input label='Last name' name='lastName' helper_text='Eg: Chemmad' handleOnChange={e => setlastName(e.target.value)} placeholder='lastName' status='normal' />
                                <Text_input label='User name' name='userName' helper_text='Type last name' handleOnChange={e => setuserName(e.target.value)}  placeholder='User name' status='normal' />
                                <Text_input type='password' label='Password' name='password' helper_text='Type password' status={isEmailValid == 1 ? 'success' : 'failed' } handleOnChange={e => setpassword(e.target.value)}  placeholder='Password' />
                                <Text_input label='Email' name='email' helper_text='Eg: mail@example.com'  handleOnChange={e => {setEmail(e.target.value); ValidateEmail()}} placeholder='Email' status='normal' />
                                <Text_input label='Phone' name='phone' helper_text='Eg: 1234567890' handleOnChange={e => setphone(e.target.value)}  placeholder='Mobile Number' status='normal' />
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
                        <td>{item.institute}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.userName}</td>
                        <td>{item.password}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
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

export default Coordinators
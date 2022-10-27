import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import { apiDelete, apiGet, apiPatch, apiPost, useGet , downloadExcel } from '../../../helpers/functions';


function Categories() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [process, setProcess] = useState('add');
    const [isLoading, setLoading] = useState(false);
    const [catID, setCatID] = useState('');
    const [id, setId] = useState('')
    const [instiId, setinstiId] = useState('')
    const [insti, setinsti] = useState('')
    const [intituteName, setintituteName] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setphone] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(2) // 0 - invalid, 1 - valid, 2 - not checked
    let coordinators = []
    coordinators = useGet(`/admin/coordinator/`, true);
    
  

    let institutes = [ ]
    institutes = useGet(`/admin/institutes/`,true);
    


    const handleDelete = (id) => {
        setSubmitting(true)
        apiDelete('admin/coordinator/', id, false, false, () => { loadTableData(); setSubmitting(false) })

    }
const handleEdit = async (id, index) => {
        // clearForm()
        // setInstiID(id)
        setCatID(id)
        const row = document.querySelector(`tbody`).rows[index + 1]
        setName(row.cells[2].innerText)
        setChestNoSeries(row.cells[3].innerText)
        setProcess('update')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        // setfirstName(document.getElementById('first').value)
        // setlastName(document.getElementById('lastName').value)
        // setuserName(document.getElementById('userName').value)
        // setEmail(document.getElementById('email').value)
        const data = {
            instituteID: instiId,
            firstName: firstName,
            lastName: lastName,
            username: userName,
            password: password,
            email: email,
            phoneNO: phone
        
            
            // sess
        }
        console.log(data)

        // if (validateForm()) {

        if (process == 'add') {
            apiPost('/admin/coordinator/', data, false, false, false, () => { loadTableData(); setSubmitting(false) })
        }

        else if (process == 'update') {
            apiPatch(`admin/coordinators/${id}`, data, false, false, false, () => { loadTableData(); setSubmitting(false); setProcess('add') })
        }


    }
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
        setSubmitting(false)
    }
    const loadTableData = async () => {
        setLoading(true)
        apiGet('/admin/categories', false, false, false, () => { setLoading(false) })
    }
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setIsEmailValid(1)
            return (true)
        }
        setIsEmailValid(0)
        return (false)
    }

    const heads = ['', 'SI.', 'Institute','First Name','Last Name', 'User Name','Email', 'Phone']

    return (
        <Portal_Layout activeTabName='institutes' initExpandedTabName='institutes' activeChildTabName='coordinators' userType='admin'>
            <div className={styles.pageContainer}>
                <h1>Coordinators</h1>
                <span data-theme='hr'></span>
                <div className={styles.dataContainer}>
                    <div className={styles.forms}>
                        <h2>Add or Edit Coordinators</h2>
                        <div className={styles.formContainer} data-theme='formContainer'>
                            <form action="#">
                                
                                
                                    
                                <Input dropdownOpts={institutes[0]} label='Institute' name="institute_id" id="institute_id" handleOnChange={e => setinstiId(e.target.value)}
                                    placeholder='first name' type='dropdown' status='normal' />

                                <Input   label='First name' name='first' handleOnChange={e => setfirstName(e.target.value)}
                                    placeholder='first name' status='normal' />
                                <Input label='Last name' name='lastName' handleOnChange={e => setlastName(e.target.value)}
                                    placeholder='lastName' status='normal' />
                                <Input label='User name' name='userName' handleOnChange={e => setuserName(e.target.value)}
                                    placeholder='User name' status='normal' />
                                <Input type='password' label='Password' name='password' status={isEmailValid == 1 ? 'success' : 'failed'}
                                    handleOnChange={e => setpassword(e.target.value)} placeholder='Password' />
                                <Input label='Email' name='email' handleOnChange={e => { setEmail(e.target.value); ValidateEmail() }}
                                    placeholder='Email' status='normal' />
                                <Input label='Phone' name='phone' handleOnChange={e => setphone(e.target.value)}
                                    placeholder='Mobile Number' status='normal' />
                                <div className={styles.formBtns} style={{ width: '100%' }}>
                                    <button data-theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit}>
                                        {isSubmitting ? "Submitting..." : process.toUpperCase()}
                                    </button>
                                    <button data-theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.tables}>
                        <div className={styles.table_header}>

                            <h2>Added coordinators</h2>
                            <button data-theme={'edit'} onClick={() => downloadExcel(coordinators[0])}>DownLoad Excel &darr;</button>
                        </div>

                        <div data-theme="table">

                            <Data_table id='institutesTable' heads={heads} >
                                {
                                    coordinators[0]?.map((item, index) => {
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
                                                <td style={{ width: '11rem' }}>{item.institute_id.name}</td>
                                                <td style={{ width: '18rem' }}>{item.first_name}</td>
                                                <td style={{ width: '19rem' }}>{item.last_name}</td>
                                                <td style={{ width: '19rem' }}>{item.username}</td>
                                                <td style={{ width: '19rem' }}>{item.email}</td>
                                                <td style={{ width: '19rem' }}>{item.phone_no}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </Data_table>
                            {/* } */}
                        </div>
                    </div>
                </div>
            </div>
        </Portal_Layout>
    )
}

export default Categories
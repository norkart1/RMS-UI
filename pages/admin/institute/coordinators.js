import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiDelete, apiGet, apiPatch, apiPost, useGet } from '../../../helpers/functions';

// import Input from '../../../components/portal/inputTheme';

function Categories() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [process, setProcess] = useState('add');
    const [isLoading, setLoading] = useState(false);
    const [catID, setCatID] = useState('');
    const [id, setId] = useState('')
    const [instiId, setinstiId] = useState('')
    const [insti, setinsti] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setphone] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(2) // 0 - invalid, 1 - valid, 2 - not checked
    let coordinators = []
    coordinators = useGet(`/admin/coordinators`, true);
    let categories = []
    categories = useGet(`/admin/categories`, true);
    // useEffect(() => {
    //     document.getElementById('sessionIDChanger').value = localStorage.getItem('sessionID')
    //     setLoading(true)

    //     // let fetchedData = [];
    //     const getData = async () => {
    //         await baseApi.get(`/admin/categories?session_id=${localStorage.getItem('sessionID')}`)
    //             .then((res) => {
    //                 setCategories(res.data.data)
    //                 return res.data.data
    //             })
    //             .catch((err) => toast.error(err.response.data.data))
    //             .finally(() => {
    //                 setLoading(false)
    //             })
    //     }
    //     getData()

    // }, [isSubmitting])





    const handleDelete = (id) => {
        setSubmitting(true)
        apiDelete('admin/categories/', id, false, false, () => { loadTableData(); setSubmitting(false) })

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
            firstName,
            lastName,
            userName,
            email,
            id,
            // sess
        }

        // if (validateForm()) {

        if (process == 'add') {
            apiPost('/admin/coordinators/', data, false, false, false, () => { loadTableData(); setSubmitting(false) })
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

    const heads = ['', 'SI.', 'Category name', 'Chest number series', 'ID']

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
                                {/* <Input label='Name of category' name='name' helper_text='Eg: Bidayah' handleOnChange={e => setName(e.target.value)}
                                    value={name}
                                    placeholder='Category name' status='normal' />

                                <Input label='Chest number series' name='chestNoSeries' helper_text='Eg: 1000' handleOnChange={e => setChestNoSeries(e.target.value)}
                                    value={chestNoSeries} type='text'
                                    placeholder='1000 or 2000 ...' status='normal' />
 */}
                                <Input label='First name' name='first' handleOnChange={e => setfirstName(e.target.value)}
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
                            <button data-theme={'edit'} onClick={() => downloadExcel(categories)}>DownLoad Excel &darr;</button>
                        </div>

                        <div data-theme="table">
                            {/* {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> : */}

                            <Data_table id='institutesTable' heads={heads} >
                                {
                                    coordinators.map((item, index) => {
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
                                                {/* <td style={{ width: '8rem' }}>{item.name}</td>
                                                <td style={{ width: '19rem' }}>{item.chest_no_series}</td>
                                                <td style={{ width: '19rem' }}>{item.id}</td> */}
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
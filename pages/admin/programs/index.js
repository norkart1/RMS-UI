import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';

// import Input from '../../../components/portal/inputTheme';

function Programs() {
    const [programs, setPrograms] = useState([]);
    const [name, setName] = useState('');
    const [chestNoSeries, setChestNoSeries] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const [process, setProcess] = useState('add');
    const [isLoading, setLoading] = useState(false);
    const [catID, setCatID] = useState('');

    useEffect(() => {
        document.getElementById('sessionIDChanger').value = localStorage.getItem('sessionID')
        setLoading(true)

        // let fetchedData = [];
        baseApi.get(`admin/programs?session_id=${localStorage.getItem('sessionID')}`)
            .then(async (res) => {
                if (res.data.success) {
                    setPrograms(res.data)
                    console.log(res.data);
                    toast.success("Loaded Successfully")
                }
            })

            .catch((err) => toast.error(err.response.data.data))
            .finally(() => {
                setLoading(false)
            })


    }, [])





    const handleDelete = (id,) => {
        setSubmitting(true)
        baseApi.delete(`/admin/programs/${id}`)
            .then(async (res) => {
                if (res.data.success) {
                    toast.success("Deleted Successfully")
                }
            })
            .catch((err) => {
                toast.error(err.response.data.data)
            })
            .finally(() => {
                loadTableData()
                setSubmitting(false)
            })
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
        const data = {
            name,
            chestNoSeries,
            sessionID: localStorage.getItem('sessionID'),
        }

        // if (validateForm()) {


        if (process == 'add') {
            const getData = await baseApi.post(`/admin/programs`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(async (res) => {
                    if (res.data.success) {
                        toast.success("Added category successfully")
                    }
                })
                .catch((err) => {
                    err.response.data.data.map((item, index) => {
                        toast.error(item)
                    })
                })
                .finally(async () => {
                    setSubmitting(false)
                })
        }
        else if (process == 'update') {
            const data = {
                name,
                chestNoSeries,
                sessionID: localStorage.getItem('sessionID'),
            }
            baseApi.patch(`admin/programs/${catID}`, data)
                .then(async (res) => {
                    if (res.data.success) {
                        toast.success("Editted category successfully")
                    }
                })
                .catch((err) => {
                    err.response.data.data.map((item, index) => {
                        toast.error(item)
                    })
                })
                .finally(async () => {
                    loadTableData()
                    setSubmitting(false)
                    setProcess('add')
                })
        }
    }
    const loadTableData = async () => {
        baseApi.get(`/admin/programs?session_id=${localStorage.getItem('sessionID')}`)
            .then((res) => {
                if (res.data.success) setPrograms(res.data.data)
                else alert(res.data.data)
            })
            // .catch((err) => alert(err))
            .finally(() => {
                setLoading(false)
            })
    }
    const heads = ['', 'SI.', 'Program name', 'Prgrm. code', 'Duration', 'Skill', 'ID']

    return (
        <Portal_Layout activeTabName='programs' activeChildTabName='programs' userType='admin'>
            <div className={styles.pageContainer}>
                <h1>Programs</h1>
                <span theme='hr'></span>
                <div className={styles.dataContainer}>
                    <div className={styles.forms}>
                        <h2>Add or Edit programs</h2>
                        <div className={styles.formContainer} theme='formContainer'>
                            <form action="#">
                                <Input label='Name of category' name='name' helper_text='Eg: Bidayah' handleOnChange={e => setName(e.target.value)}
                                    value={name}
                                    placeholder='Category name' status='normal' />

                                <Input label='Chest number series' name='chestNoSeries' helper_text='Eg: 1000' handleOnChange={e => setChestNoSeries(e.target.value)}
                                    value={chestNoSeries} type='text'
                                    placeholder='1000 or 2000 ...' status='normal' />

                                <div className={styles.formBtns} style={{ width: '100%' }}>
                                    <button theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit}>
                                        {isSubmitting ? "Submitting..." : process.toUpperCase()}
                                    </button>
                                    <button theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.tables}>
                        <div className={styles.table_header}>

                            <h2>Added programs</h2>
                            <button theme={'edit'} onClick={() => downloadExcel(sampleData)}>DownLoad Excel &darr;</button>
                        </div>

                        <div theme="table">
                            {/* {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> : */}

                            <Data_table id='institutesTable' heads={heads} >
                                {
                                    programs.map((item, index) => {
                                        let siNo = index + 1;
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: '7.8rem' }}>
                                                    <button theme='edit' onClick={() => handleEdit(item.id, index)}>
                                                        <EditIcon height={16} />
                                                    </button>
                                                    <button theme='delete' onClick={() => handleDelete(item.id, index)}>
                                                        <DeleteIcon height={16} />
                                                    </button>
                                                </td>
                                                <td style={{ width: '1rem' }}>{siNo}</td>
                                                <td style={{ width: '8rem' }}>{item.name}</td>
                                                <td style={{ width: '19rem' }}>{item.programCode}</td>
                                                <td style={{ width: '19rem' }}>{item.id}</td>
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

export default Programs
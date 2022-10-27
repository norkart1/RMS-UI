import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { onlyNumbers } from '../../../helpers/functions';

// import Input from '../../../components/portal/inputTheme';

function Programs() {
    const skills = [
        { id: 1, name: 'Presentation' },
        { id: 2, name: 'Technical' },
        { id: 3, name: 'General Awareness' },
        { id: 4, name: 'Writing' },
        { id: 5, name: 'Art and Aesthetics' },
        { id: 6, name: 'Reasoning' },
        { id: 7, name: 'Song and Recitation' },
        { id: 8, name: 'Linguistics' },
    ]
    const languageGroups = [
        { id: 1, name: 'Malayalam' },
        { id: 2, name: 'English' },
        { id: 3, name: 'Arabic' },
        { id: 4, name: 'Urdu' },
        { id: 5, name: 'Other' },

    ]
    const rounds = [
        { id: 1, name: 'Elimination' }, { id: 2, name: 'Final' }
    ]
    const modes = [
        { id: 1, name: 'Stage' }, { id: 2, name: 'Non-stage' }
    ]
    const types = [
        { id: 1, name: 'Individual' }, { id: 2, name: 'Group' }
    ]
    const [categories, setCategories] = useState([]);
    const [programs, setPrograms] = useState([]);

    const [programCode, setprogramCode] = useState('')
    const [sessionID, setsessionID] = useState('')
    const [categoryID, setcategoryID] = useState('')
    const [name, setname] = useState('')
    const [status, setstatus] = useState('')
    const [round, setround] = useState('')
    const [mode, setmode] = useState('')
    const [type, settype] = useState('')
    const [groupCount, setgroupCount] = useState('')
    const [date, setdate] = useState('')
    const [time, settime] = useState('')
    const [venue, setvenue] = useState('')
    const [curbGroup, setcurbGroup] = useState('')
    const [maxCountCurb, setmaxCountCurb] = useState('')
    const [languageGroup, setlanguageGroup] = useState('')
    const [isRegisterable, setisRegisterable] = useState('')
    const [isStarred, setisStarred] = useState('')
    const [duration, setduration] = useState('')
    const [conceptNote, setconceptNote] = useState('')
    const [resultEntered, setresultEntered] = useState('false')
    const [resultPublished, setresultPublished] = useState('false')
    const [maxSelection, setmaxSelection] = useState('')
    const [categoryByFeatures, setcategoryByFeatures] = useState('')
    const [skill, setskill] = useState('')

    const [isSubmitting, setSubmitting] = useState(false);
    const [process, setProcess] = useState('add');
    const [isLoading, setLoading] = useState(false);
    //const [catID, setCatID] = useState('');

    useEffect(() => {
        document.getElementById('sessionIDChanger').value = localStorage.getItem('sessionID')
        setLoading(true)
        setsessionID(localStorage.getItem('sessionID'))
        // let fetchedData = [];
        baseApi.get(`/admin/categories?session_id=${localStorage.getItem('sessionID')}`)
            .then((res) => {
                console.log('categories');
                console.log(res.data.data);
                setCategories(res.data.data)
            })
            .catch((err) =>
                toast.error(err.response.data.data)
            )
            .finally(() => {
                setLoading(false)
            })
        baseApi.get(`admin/programs?session_id=${localStorage.getItem('sessionID')}`)
            .then(async (res) => {
                if (res.data.success) {
                    setPrograms(res.data.data)
                    console.log(res.data.data);
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
            programCode,
            sessionID,
            categoryID,
            name,
            status,
            round,
            mode,
            type,
            groupCount,
            date,
            time,
            venue,
            curbGroup,
            maxCountCurb,
            languageGroup,
            isRegisterable,
            isStarred,
            duration,
            conceptNote,
            resultEntered,
            resultPublished,
            maxSelection,
            categoryByFeatures,
            skill,
        }
        if (process == 'add') {
            baseApi.post('/admin/programs', data)
                .then(async (res) => {
                    if (res.data.success) {
                        toast.success("Added Successfully")
                    }
                })
                .catch((err) => {
                    const errorMessage = err.response.data.data
                    typeof errorMessage == 'string' ? toast.error(errorMessage) : errorMessage.map((item, index) => {
                        toast.error(item)
                    })
                }
                )
                .finally(async () => {
                    loadTableData()
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
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false)
            })
    }
    const heads = ['', 'SI.', 'Program name', 'Prgrm. code', 'Duration', 'Skill', 'ID']

    return (
        <Portal_Layout activeTabName='programs' activeChildTabName='programs' userType='admin'>
            <div className={styles.pageContainer}>
                <h1>Programs</h1>
                <span data-theme='hr'></span>
                <div className={styles.dataContainer}>
                    <div className={styles.forms}>
                        <h2>Add or Edit programs</h2>
                        <div className={styles.formContainer} data-theme='formContainer'>
                            <form action="#">
                                <Input label='Program code' name='programCode' handleOnChange={e => setprogramCode(e.target.value.toUpperCase())}
                                    value={programCode} placeholder='Program code' status='normal' />
                                <Input label='Select category' name='categoryID' handleOnChange={e => setcategoryID(e.target.value)}
                                    value={categoryID} type='dropdown' dropdownOpts={categories} // TODO: add category list
                                    status='normal' />
                                <Input label='Name of program' name='name' handleOnChange={e => setname(e.target.value.toUpperCase())}
                                    value={name} placeholder='Program name' status='normal' />
                                <Input label='Select program status' name='status' handleOnChange={e => setstatus(e.target.value)}
                                    value={status} placeholder='Select status' status='normal'
                                    type='dropdown' dropdownOpts={[{ id: 'Active', name: 'Active' }, { id: 'Inactive', name: 'Inactive' }]} />
                                <Input label='Select program round' name='round' handleOnChange={e => setround(e.target.value)}
                                    value={round} placeholder='Select round' status='normal'
                                    type='dropdown' dropdownOpts={rounds} />
                                <Input label='Select program mode' name='mode' handleOnChange={e => setmode(e.target.value)}
                                    value={mode} placeholder='Select mode' status='normal'
                                    type='dropdown' dropdownOpts={modes} />
                                <Input label='Select program type' name='type' handleOnChange={e => settype(e.target.value)}
                                    value={type} placeholder='Select type' status='normal'
                                    type='dropdown' dropdownOpts={types} />
                                <Input label='Candidate count in group' name='groupCount' handleOnChange={e => setgroupCount(onlyNumbers(e.target.value))}
                                    value={groupCount} placeholder='Program group count' status='normal' />
                                <Input label='Date of program' name='date' handleOnChange={e => setdate(e.target.value)}
                                    value={date} placeholder='Program date' status='normal' type='date' />
                                <Input label='Time of program' name='time' handleOnChange={e => settime(e.target.value)}
                                    value={time} placeholder='Program time' status='normal' type='time' />
                                <Input label='Venue of program' name='venue' handleOnChange={e => setvenue(onlyNumbers(e.target.value))}
                                    value={venue} placeholder='Program venue' status='normal' type='text' />
                                <Input label='Select program Curb Group' name='curbGroup' handleOnChange={e => setcurbGroup(e.target.value)}
                                    value={curbGroup} placeholder='Select curbGroup' status='normal'
                                    type='dropdown' dropdownOpts={[{ id: 'Active', name: 'Active' }, { id: 'Inactive', name: 'Inactive' }]} />
                                <Input label='Maximum Count Curb of program' name='maxCountCurb' handleOnChange={e => setmaxCountCurb(onlyNumbers(e.target.value))}
                                    value={maxCountCurb} placeholder='Max. curb count' status='normal' type='text' />
                                <Input label='Select Language Group' name='languageGroup' handleOnChange={e => setlanguageGroup(e.target.value)}
                                    value={languageGroup} placeholder='Select language group' status='normal'
                                    type='dropdown' dropdownOpts={languageGroups} />
                                <Input label='Select whether registerable' name='isRegisterable' handleOnChange={e => setisRegisterable(e.target.value)}
                                    value={isRegisterable} placeholder='Select is registerable' status='normal'
                                    type='dropdown' dropdownOpts={[{ id: 'True', name: 'True' }, { id: 'False', name: 'False' }]} />
                                <Input label='Select whether starred' name='isStarred' handleOnChange={e => setisStarred(e.target.value)}
                                    value={isStarred} placeholder='Select is starred' status='normal'
                                    type='dropdown' dropdownOpts={[{ id: 'True', name: 'True' }, { id: 'False', name: 'False' }]} />
                                <Input label='Duration for each candidate' name='duration' handleOnChange={e => setduration(onlyNumbers(e.target.value))}
                                    value={duration} placeholder='Duration' status='normal' type='text' />
                                <Input label='Concept note of program' name='conceptNote' handleOnChange={e => setconceptNote(e.target.value)}
                                    value={conceptNote} placeholder='Concept note' status='normal' type='text' />
                                <Input label='Select whether result is entered' name='resultEntered' handleOnChange={e => setresultEntered(e.target.value)}
                                    value={resultEntered} placeholder='Select result entered' status='normal'
                                    type='dropdown' dropdownOpts={[{ id: 'True', name: 'True' }, { id: 'False', name: 'False' }]} />
                                <Input label='Select whether result is published' name='resultPublished' handleOnChange={e => setresultPublished(e.target.value)}
                                    value={resultPublished} placeholder='Select result published' status='normal'
                                    type='dropdown' dropdownOpts={[{ id: 'True', name: 'True' }, { id: 'False', name: 'False' }]} />
                                <Input label='Maximum candidates in final' name='maxSelection' handleOnChange={e => setmaxSelection(onlyNumbers(e.target.value))}
                                    value={maxSelection} placeholder='Max. candidate' status='normal' type='text' />
                                <Input label='Select feature category' name='categoryByFeatures' handleOnChange={e => setcategoryByFeatures(e.target.value)}
                                    value={categoryByFeatures} placeholder='Feature category' status='normal' type='text' />
                                <Input label='Select skill category' name='skill' handleOnChange={e => setskill(e.target.value)}
                                    value={skill} placeholder='Select skill' status='normal'
                                    type='dropdown' dropdownOpts={skills} />




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

                            <h2>Added programs</h2>
                            <button data-theme={'edit'} onClick={() => downloadExcel(programs)}>DownLoad Excel &darr;</button>
                        </div>

                        <div data-theme="table">
                            {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> :

                                <Data_table id='institutesTable' heads={heads} >
                                    {
                                        programs.map((item, index) => {
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
                                                    <td style={{ width: 'auto' }}>{item.name}</td>
                                                    <td style={{ width: '19rem' }}>{item.programCode}</td>
                                                    <td style={{ width: '19rem' }}>{item.duration}</td>
                                                    <td style={{ width: '19rem' }}>{item.skill}</td>
                                                    <td style={{ width: '19rem' }}>{item.id}</td>
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

export default Programs
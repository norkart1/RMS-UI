import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiDelete, apiGet, apiPatch, apiPost, onlyNumbers, downloadExcel } from '../../../helpers/functions';

// import Input from '../../../components/portal/inputTheme';

function Programs() {
  const skills = [
    { id: 'Presentation', name: 'Presentation' },
    { id: 'Technical', name: 'Technical' },
    { id: 'General Awareness', name: 'General Awareness' },
    { id: 'Writing', name: 'Writing' },
    { id: 'Art and Aesthetics', name: 'Art and Aesthetics' },
    { id: 'Reasoning', name: 'Reasoning' },
    { id: 'Song and Recitation', name: 'Song and Recitation' },
    { id: 'Linguistics', name: 'Linguistics' },
  ]
  const languageGroups = [
    { id: 'Malayalam', name: 'Malayalam' },
    { id: 'English', name: 'English' },
    { id: 'Arabic', name: 'Arabic' },
    { id: 'Urdu', name: 'Urdu' },
    { id: 'Other', name: 'Other' },

  ]
  const rounds = [
    { id: 'Elimination', name: 'Elimination' }, { id: 'Final', name: 'Final' }
  ]
  const modes = [
    { id: 'Stage', name: 'Stage' }, { id: 'Non-stage', name: 'Non-stage' }
  ]
  const types = [
    { id: 'Single', name: 'Single' }, { id: 'Group', name: 'Group' }
  ]
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [programCode, setprogramCode] = useState('')
  const [sessionID, setsessionID] = useState('')
  const [categoryID, setcategoryID] = useState('')
  const [name, setname] = useState('')
  const [status, setstatus] = useState('Active')
  const [round, setround] = useState('Elimination')
  const [mode, setmode] = useState('Stage')
  const [type, settype] = useState('Single')
  const [groupCount, setgroupCount] = useState('')
  const [date, setdate] = useState('')
  const [time, settime] = useState('')
  const [venue, setvenue] = useState('')
  const [curbGroup, setcurbGroup] = useState('Active')
  const [maxCountCurb, setmaxCountCurb] = useState('')
  const [languageGroup, setlanguageGroup] = useState('Malayalam')
  const [isRegisterable, setisRegisterable] = useState('True')
  const [isStarred, setisStarred] = useState('false')
  const [duration, setduration] = useState('')
  const [conceptNote, setconceptNote] = useState('')
  const [resultEntered, setresultEntered] = useState('false')
  const [resultPublished, setresultPublished] = useState('false')
  const [maxSelection, setmaxSelection] = useState('')
  const [categoryByFeatures, setcategoryByFeatures] = useState('')
  const [skill, setskill] = useState('Presentation')

  const [edittingID, setEdittingID] = useState()
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
        setCategories(res.data.data)
        setcategoryID(res.data.data[0].id)
      })
      .catch((err) => {
        //console.log('error programs', err)
        // toast.error(err.response.data.data)
      })
      .finally(() => {
        setLoading(false)
      })
    baseApi.get(`admin/programs?session_id=${localStorage.getItem('sessionID')}`)
      .then(async (res) => {
        if (res.data.success) {

          setPrograms(res.data.data.programs)
          // console.log(res.data.data.programs)
        }
      })
      .catch((err) => toast.error(err.response.data.data))
      .finally(() => {
        setLoading(false)
      })



  }, [])





  const handleDelete = (id,) => {
    setSubmitting(true)
    apiDelete(`/admin/programs/`, id, false, false, () => {
      loadTableData()
      setSubmitting(false)
    })

  }
  const handleEdit = async (id, index) => {
    setEdittingID(id)
    apiGet(`/admin/programs/${id}`, false, (res) => {

      //console.log(res.data.data);
      setprogramCode(res.data.data.programCode)
      setsessionID(res.data.data.session_id)
      setcategoryID(res.data.data.category_id)
      setname(res.data.data.name)
      setstatus(res.data.data.status)
      setround(res.data.data.round)
      setmode(res.data.data.mode)
      settype(res.data.data.type)
      setgroupCount(res.data.data.groupCount)
      setdate(res.data.data.date)
      settime(res.data.data.time)
      setvenue(res.data.data.venue)
      setcurbGroup(res.data.data.curbGroup)
      setmaxCountCurb(res.data.data.maxCountCurb)
      setlanguageGroup(res.data.data.languageGroup)
      setisRegisterable(res.data.data.isRegisterable)
      setisStarred(res.data.data.isStarred)
      setduration(res.data.data.duration)
      setconceptNote(res.data.data.conceptNote)
      setresultEntered(res.data.data.resultEntered)
      setresultPublished(res.data.data.resultPublished)
      setmaxSelection(res.data.data.maxSelection)
      setcategoryByFeatures(res.data.data.categoryByFeatures)
      setskill(res.data.data.skill)

    }, (err) => {
      toast.error(err.response.data.data)
    },
    )
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
      setSubmitting(true)
      apiPost(`/admin/programs`, data, false, false, false, () => {
        loadTableData()
        setSubmitting(false)
      })
    }
    else if (process == 'update') {
      apiPatch(`admin/programs/${edittingID}`, data, false, false, false, () => {
        loadTableData()
        setSubmitting(false)
        setProcess('add')
      })

    }
  }
  const loadTableData = async () => {
    apiGet('/admin/programs', false, false, false,)
    baseApi.get(`/admin/programs?session_id=${localStorage.getItem('sessionID')}`)
      .then((res) => {
        if (res.data.success) setPrograms(res.data.data.programs)
        else alert(res.data.data)
      })
      .catch((err) => alert(err))
      .finally(() => {
        setLoading(false)
      })
  }
  const clearForm = () => {

    setprogramCode('')
    setname('')
    setstatus('Active')
    setround('Elimination')
    setmode('Stage')
    settype('Single')
    setgroupCount('')
    setdate('')
    settime('')
    setvenue('')
    setcurbGroup('Active')
    setmaxCountCurb('')
    setlanguageGroup('Malayalam')
    setisRegisterable('True')
    setisStarred('False')
    setduration('')
    setconceptNote('')
    setresultEntered('false')
    setresultPublished('false')
    setmaxSelection('')
    setcategoryByFeatures('')
    setskill('Presentation')
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

                <Data_table id='institutesTable' heads={heads} style={{ overflow: 'auto' }}  >
                  {
                    programs?.map((item, index) => {
                      let siNo = index + 1;
                      return (
                        <tr key={index} >
                          <td style={{ width: '10rem' }}>
                            <button data-theme='edit' onClick={() => handleEdit(item.id, index)}>
                              <EditIcon height={16} />
                            </button>
                            <button data-theme='delete' onClick={() => handleDelete(item.id, index)}>
                              <DeleteIcon height={16} />
                            </button>
                          </td>
                          <td style={{ width: '1rem' }}>{siNo}</td>
                          <td style={{ width: 'auto' }}>{item.name}</td>
                          <td style={{ width: 'auto' }}>{item.programCode}</td>
                          <td style={{ width: 'auto' }}>{item.duration}</td>
                          <td style={{ width: 'auto' }}>{item.skill}</td>
                          <td style={{ width: 'auto' }}>{item.id}</td>


                          {/* DONT DELETE THESE */}

                          {/* <td style={{ width: 'auto' }}>{item.categoryID}</td>
													<td style={{ width: 'auto' }}>{item.type}</td>
													<td style={{ width: 'auto' }}>{item.status}</td>
													<td style={{ width: 'auto' }}>{item.round}</td>
													<td style={{ width: 'auto' }}>{item.mode}</td>
													<td style={{ width: 'auto' }}>{item.groupCount}</td>
													<td style={{ width: 'auto' }}>{item.date}</td>
													<td style={{ width: 'auto' }}>{item.time}</td>
													<td style={{ width: 'auto' }}>{item.venue}</td>
													<td style={{ width: 'auto' }}>{item.curbGroup}</td>
													<td style={{ width: 'auto' }}>{item.maxCountCurb}</td>
													<td style={{ width: 'auto' }}>{item.languageGroup}</td>
													<td style={{ width: 'auto' }}>{item.isRegisterable}</td>
													<td style={{ width: 'auto' }}>{item.isStarred}</td>
													<td style={{ width: 'auto' }}>{item.resultEntered}</td>
													<td style={{ width: 'auto' }}>{item.resultPublished}</td>
													<td style={{ width: 'auto' }}>{item.maxSelection}</td>
													<td style={{ width: 'auto' }}>{item.categoryByFeatures}</td>
													<td style={{ width: 'auto' }}>{item.conceptNote}</td> */}



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
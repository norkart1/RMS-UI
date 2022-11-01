import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiDelete, apiGet, apiPatch, apiPost, catIdtoName, difference, downloadExcel, getUniqueItemsByProperties, removeDuplicates, statusCodeToStatus, substractArrays, useGet } from '../../../helpers/functions';
import Select from 'react-select';


// import Input from '../../../components/portal/inputTheme';

function Categories() {
  //sample data with program id, program name, topic id, topic name, category id, category name

  const [data, setData] = useState([])
  const [programName, setProgramName] = useState([])
  const [programCode, setProgramCode] = useState([])
  const [selectedChestNo, setSelectedChestNo] = useState()
  const [category, setCategory] = useState([])
  const [topic, setTopic] = useState('')
  const [topicLink, setTopicLink] = useState('')
  const [status, setStatus] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFromSettedList, setIsFromSettedList] = useState(false)

  useEffect(() => {
    const fetchedData = baseApi.get('/coordinator/candidate-programs/registerablePrograms/all').then((res) => {
      setData(res?.data?.data)
    })
      .finally(() => {
        setIsLoading(false)
      })
  }, [data])

  const loadTableData = async () => {
    const fetchedData = apiGet('/coordinator/candidate-programs/registerablePrograms/all')
    setData(fetchedData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const postData = {
      chestNO: selectedChestNo,
      programCode,
      programName,
      categoryID: category,
      link: topicLink,
      topic,
    }
    console.log(postData);
    apiPost('/coordinator/candidate-programs/registerablePrograms', postData, false, false,
      (err) => {
        console.log('err', err.code)
      },
      () => {
        setIsSubmitting(false)
        setCategory('')
        setProgramCode('')
        setProgramName('')
        setTopic('')
        setTopicLink('')
        setSelectedChestNo('')
      })
  }

  const handleRowClick = (e, item) => {
    let row = e.target.parentNode;
    try {
      if (item.status == 'N' || item.status == 'R') { //CHANGE THIS TO NULL
        // row

        setSelectedRow(row)
        setProgramCode(row.cells[1].innerText)
        setProgramName(row.cells[2].innerText)
        setSelectedChestNo(item.chestNO)
        setCategory(item.categoryID)
      }
      console.log(programCode, programName, selectedChestNo);
    }
    catch (err) {
      console.log(err)
    }
  }

  //MAKES IT EDITTABLE WHEN IT IS REJECTED
  const handleEdit = (e, item) => {
    console.log(e.target.parentNode.parentNode)
    let row = e.target.parentNode.parentNode;
    // console.log(row);
    try {
      if (item.status == 'R') {
        setProgramCode(row.cells[1].innerText)
        setProgramName(row.cells[2].innerText)
        setSelectedChestNo(item.chestNO)
        setCategory(item.categoryID)
      }
      console.log(programCode, programName, selectedChestNo);
    }
    catch (err) {
      console.log(err)
    }
  }


  const heads = ['SI.', '', `Program`, 'Topic', 'Status']

  return (
    <Portal_Layout activeTabName='programs' activeChildTabName='Topic registration' userType='institute'>
      <div className={styles.pageContainer}>
        <h1>Topic registration</h1>
        <span data-theme='hr'></span>
        <span data-theme='info'>
          NOTE: Once the topic registered it can't be edited or deleted as the preference is based on time; It can be editted after rejection. <br />


        </span>
        <div className={styles.dataContainer}>
          <div className={styles.forms}>
            <h2>Register topic</h2>
            <div className={styles.formContainer} data-theme='formContainer' style={{ height: '70vh', width: '100%' }}>
              <form action="#" style={{ display: 'flex' }}>
                <Input style={{ width: '142%' }} value={programCode} handleOnChange={() => setProgramCode(e.target.value)} label='Program code' placeholder={'Program code'} name='programCode' isDisabled={true} status='normal' />
                <Input style={{ width: '142%' }} value={programName} handleOnChange={() => setProgramName(e.target.value)} label='Program name' placeholder={'Program name'} name='name' isDisabled={true} status='normal' />
                <h3 >Topic</h3>
                <Input type='text_area' value={topic} handleOnChange={(e) => setTopic(e.target.value)} label='Type topic text here' placeholder={'Type topic here...'} name='name' status='normal' />
                <Input style={{ width: '142%' }} value={topicLink} handleOnChange={(e) => setTopicLink(e.target.value)} label='Topic link' placeholder={'Paste topic link here if any.'} name='name' status='normal' />
                {/* < */}
                <div className={styles.formBtns} style={{ width: '100%' }}>
                  <button data-theme='submit' onClick={handleSubmit} >
                    {isSubmitting ? "Submitting..." : 'SUBMIT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <div className={styles.table_header}>

              <h2>Registerable programs</h2>
              <button data-theme={'edit'} onClick={() => downloadExcel(filteredPrograms)}>DownLoad Excel &darr;</button>
            </div>

            <div data-theme="table" style={{ height: '70vh' }}>
              {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading...</h2> </div> :

                <Data_table id='institutesTable' heads={heads} >

                  {

                    data && removeDuplicates(data, 'programCode').map((item, index) => {
                      const SiNo = index + 1
                      return (
                        <tr key={index} onClick={(e) => handleRowClick(e, item)} style={{ cursor: 'pointer' }}>
                          <td style={{ width: 'max-content' }}>{SiNo}</td>
                          <td style={{ width: 'max-content' }}>{item.programCode}</td>
                          <td style={{ width: 'max-content' }}>{item.programName} <br /> {catIdtoName(item.categoryID)}</td>
                          {/* <td style={{ width: 'max-content' }}>{catIdtoName(item.categoryID)}</td> */}
                          <td style={{ width: 'auto' }}>
                            {item.topic?.slice(0, 80)}...
                            <br />
                            <a href={item.link} target='_BLANK' style={{ fontSize: '1rem' }}>{item.link}</a>
                          </td>
                          <td style={{ width: 'min-content', fontWeight: '500', color: item.status == 'P' ? 'grey' : item.status == 'A' ? 'Green' : item.status == 'R' ? 'red' : 'black' }}>{statusCodeToStatus(item.status)}</td>
                          {/* <td style={{ width: '19rem' }}>
                            {item.status == 'R' ? <button data-theme='edit' onClick={(e) => handleEdit(e, item)}>Edit</button> : null}
                          </td> */}
                        </tr>
                      )
                    }
                    )
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

export default Categories
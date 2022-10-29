import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiDelete, apiPatch, apiPost, difference, downloadExcel, getUniqueItemsByProperties, substractArrays, useGet } from '../../../helpers/functions';
import Select from 'react-select';


// import Input from '../../../components/portal/inputTheme';

function Categories() {
  // const [categories, setCategories] = useState([]);
  const [chestNoSeries, setChestNoSeries] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [process, setProcess] = useState('add');
  const [isLoading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedCatID, setSelectedCatID] = useState(2);

  const [catID, setCatID] = useState('1');
  const [programCode, setProgramCode] = useState('');
  const [programName, setProgramName] = useState('');
  const [name, setName] = useState('');
  const [candCount, setCandCount] = useState('');
  const [candDetail, setCandDetail] = useState([]);
  const [selectedCands, setSelectedCands] = useState([]);
  const [rowInd, setRowInd] = useState(0);

  let categories = []
  categories = useGet(`/coordinator/categories`, false, false, false, false, false)[0]
  let coordinator = []
  coordinator = useGet(`/coordinator/me`)[0];

  let programs;
  programs = useGet('coordinator/programs', false)[0]
  let regPrograms;
  regPrograms = useGet('coordinator/candidate-programs', false)[0]
  let filteredPrograms = []
  filteredPrograms = substractArrays(programs, regPrograms)
  let candidates;
  candidates = useGet(`/coordinator/candidates`)[0]?.candidates;

  console.log('programs', programs)
  console.log('regPrograms', regPrograms)
  console.log('filteredPrograms', filteredPrograms)



  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('candCount',candCount)
    console.log('candDetail.length',candDetail.length)
    if (candCount == candDetail.length-1) {
      setSubmitting(true)
      candDetail.map((item) => {
        setTimeout(() => {

          const data = {
            chestNO: item.chestNO,
            programCode,
            categoryID: selectedCatID,
            programName: name,
            // programName: item.programName,
            instituteID: coordinator.institute_id.id,
          }
          apiPost('coordinator/candidate-programs', data, false, false, false, () => { setSubmitting(false); rowInd?.remove(); setCandDetail([]) })
        })
      }, 1000);
    } else {
      toast.error('Please add all candidates')

    }
  }


  const handleChange = (selectedOption, programCode) => {
    setSelectedOption(selectedOption.value);
    setCandDetail([...candDetail, { chestNO: selectedOption.chestNO, name: selectedOption.name }])
    console.log(candDetail)
    // const row = document.querySelector(`tbody`).rows[index + 1]

  };
  const handleRowClick = (rowIndex) => {
    setCandDetail([])
    const row = document.querySelector(`tbody`).rows[rowIndex + 1]
    setRowInd(row)
    console.log(row.cells[0].innerText)
    setProgramCode(row.cells[1].innerText)
    setName(row.cells[2].innerText)
    const count = row.cells[3].innerText
    setCandCount(count === '' || count === undefined || count === null ? 1 : count)

  }

  const heads = ['SI.', 'Program code', 'Name', 'Candidate count']
  const candOptions = candidates && candidates.filter(cand => cand.categoryID == catID).map((item, index) => {
    return { value: item.id, label: item.chestNO + ' - ' + item.name, chestNO: item.chestNO, name: item.name }
  })
  console.log('candOptions', candOptions)
  return (
    <Portal_Layout activeTabName='programs' activeChildTabName='Register programs' userType='institute'>
      <div className={styles.pageContainer}>
        <h1>Program registration</h1>
        <span data-theme='hr'></span>
        <div className={styles.dataContainer}>

          <div className={styles.forms}>
            <h2>Assign candidates</h2>
            <div className={styles.formContainer} data-theme='formContainer' style={{ height: '70vh', width: '100%' }}>
        <Input type='dropdown' dropdownOpts={categories} handleOnChange={(e) => setCatID(e.target.value)} label='Select category' placeholder={'Program code'} name='programCode' status='normal' />
              <form action="#" style={{ display: 'flex' }}>
                <Input value={programCode} handleOnChange={() => setProgramCode(e.target.value)} label='Program code' placeholder={'Program code'} name='programCode' isDisabled={true} status='normal' />
                <Input value={name} handleOnChange={() => setName(e.target.value)} label='Program name' placeholder={'Program name'} name='name' isDisabled={true} status='normal' />
                <Input value={candCount} handleOnChange={() => setCandCount(e.target.value)} label='Candidate count' placeholder={'Candidate count'} name='groupCount' isDisabled={true} status='normal' style={{ marginBottom: '2rem' }} />
                <p>Candidates</p>
                {
                  Array.from({ length: candCount }, (x, i) => {
                    return (
                      <div style={{ marginTop: '1rem', width: '100%' }} key={i}>

                        <Select
                          value={selectedOption.name}
                          onChange={index => handleChange(index)}
                          options={candOptions}
                          placeholder='Select candidate..'

                        />
                      </div>
                    )
                  })
                  // Array.from(Array(3)).forEach((x, i) => {
                  // })
                }


                <div className={styles.formBtns} style={{ width: '100%' }}>
                  <button data-theme='submit' style={{ marginRight: '5%', backgroundColor: candCount == selectedCands.length ? 'red' : 'grey' }} onClick={handleSubmit} >
                    {isSubmitting ? "Submitting..." : process.toUpperCase()}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.tables}>
            <div className={styles.table_header}>

              <h2>Program list</h2>
              <button data-theme={'edit'} onClick={() => downloadExcel(filteredPrograms)}>DownLoad Excel &darr;</button>
            </div>

            <div data-theme="table" style={{ height: '70vh' }}>
              {/* {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> : */}

              <Data_table id='institutesTable' heads={heads} >
                {filteredPrograms &&
                  filteredPrograms.filter(program => program.categoryID == catID).map((program, index) => {
                    let siNo = index + 1;
                    return (
                      <tr key={index} onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                        <td style={{ width: '1rem' }}>{siNo}</td>
                        <td style={{ width: '8rem' }}>{program?.programCode}</td>
                        <td style={{ width: '19rem' }}>{program.name}</td>
                        <td style={{ width: '19rem' }}>{program.groupCount}</td>
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
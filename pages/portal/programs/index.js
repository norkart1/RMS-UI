import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiPost, useGet, downloadExcel } from '../../../helpers/functions';
import Select from 'react-select';

// import Input from '../../../components/portal/inputTheme';

function Categories({ userDetails }) {
  //   const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [chestNoSeries, setChestNoSeries] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [process, setProcess] = useState('add');
  const [isLoading, setLoading] = useState(false);
  const [catID, setCatID] = useState('');
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedCatID, setSelectedCatID] = useState(1);

  // const [name, setName] = useState('');

  const [programCode, setProgramCode] = useState('');
  const [chestNO, setChestNO] = useState('');



  //change these to coordinator Api
  let categories = []
  categories = useGet(`/coordinator/categories`, true, false) //(res) => (setSelectedCatID(res.data.data[0].id)) );
  let programs = []
  programs = useGet(`/coordinator/candidate-programs`)[0];
  let candidates = []
  candidates = useGet(`/coordinator/candidates`)[0];
  let coordinator= []
  coordinator = useGet(`/coordinator/me`)[0];
  console.log('coordi ME', coordinator)
  // console.log(categories,programs,candidates);
  console.log('categories', categories);
  console.log('programs', programs);
  console.log('candidates', candidates);

  useEffect(() => {
    () => loadTableData()
  }, [ ])

  const handleDelete = (id,) => {
    setSubmitting(true)
    baseApi.delete(`/admin/categories/${id}`)
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setSubmitting(true)

  //   if (process == 'add') {
  //     apiPost('/admin/categories/', data, false, false, false, () => { loadTableData(); setSubmitting(false) })
  //   }

  //   else if (process == 'update') {
  //     apiPatch(`admin/categories/${catID}`, data, false, false, false, () => { loadTableData(); setSubmitting(false); setProcess('add') })
  //   }

  // }
  const loadTableData = async () => {
    baseApi.get(`/admininstitutes/categories?session_id=${localStorage.getItem('sessionID')}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (res.data.success) setCategories(res.data.data)
        else alert(res.data.data)
      })
      // .catch((err) => alert(err))
      .finally(() => {
        setLoading(false)
      })
  }
  const heads = ['', 'SI.', 'Program', 'Candidate']
  const candOptions = candidates?.filter(cand => cand.categoryID == selectedCatID).map((item, index) => {
    return { value: item.id, label: item.chestNO + ' - ' + item.name, chestNO: item.chestNO, name: item.name }
  })

  const handleChange = (selectedOption,programCode) => {
    setSelectedOption(selectedOption.value);
    // const row = document.querySelector(`tbody`).rows[index + 1]
    const data = {
      chestNO: selectedOption.chestNO,
      programCode ,
      categoryID: selectedCatID,
      name: selectedOption.name,
    }
    apiPost('coordinator/candidate-programs',data,false,false,false)
  };

  return (
    <Portal_Layout activeTabName='programs' activeChildTabName='program registration' userType='Institute'>
      <div className={styles.pageContainer}>
        <h1>Program Registration</h1>
        <span data-theme='hr'></span>
        <div className={styles.dataContainer}>
          <div className={styles.tables}>
            <div className={styles.table_header}>
              <h2>Register programs -
                <select name="" id="" style={{ width: '30rem', height: '100%', padding: '1rem', fontSize: '1.6rem', backgroundColor: 'transparent', border: 0, outline: 0 }}
                  onChange={(e) => setSelectedCatID(e.target.value)}
                >
                  {categories[0] != null && categories[0] != undefined &&
                    categories[0].map((item, index) => {
                      return (
                        <option value={item.id} key={index}>{item.name}</option>
                      )
                    })
                  }
                </select></h2>

              <div className="flex-grow"></div>
              {/* <button data-theme={'edit'} onClick={() => downloadExcel(sampleData)}>DownLoad Excel &darr;</button> */}
              <button data-theme={'submit'} style={{ width: 'fit-content', opacity: '.5', marginRight: '1rem' }} onClick={() => downloadExcel(programs)}>Download</button>
              <button data-theme={'submit'} style={{ width: 'fit-content' }} onClick={(e) => handleSubmit(e)}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </div>

            <div data-theme="table">
              {isLoading ? <div style={{ width: '100%', height: '50rem', }}> <h2>Loading</h2> </div> :

                <Data_table id='institutesTable' heads={heads} >
                  {
                    programs != null && programs != undefined && programs.filter(program => program.categoryID == selectedCatID).map((program, index) => {
                      let siNo = index + 1;
                      
                      return (
                        <tr key={index}>
                          <td style={{ width: '.6rem' }}>
                            <button data-theme='delete' onClick={() => handleDelete(program.id, index)}>X</button>
                          </td>
                          <td style={{ width: '1rem' }}>{siNo}</td>
                          {/*PROGRAM */}
                          <td style={{ width: 'auto' }}>{program?.programCode} - {program?.name}</td>
                          {/*CANDIDATESAA */}
                          <td style={{ width: 'auto', padding: 0 }}>
                            <Select
                              value={selectedOption.name}
                              onChange={index=>handleChange(index,program.programCode)}
                              options={candOptions}
                            />
                          </td>
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

export default Categories
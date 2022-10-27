import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
import { toast } from 'react-toastify';
import { apiPost, useGet } from '../../../helpers/functions';

// import Input from '../../../components/portal/inputTheme';

function Categories() {
  //   const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [chestNoSeries, setChestNoSeries] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [process, setProcess] = useState('add');
  const [isLoading, setLoading] = useState(false);
  const [catID, setCatID] = useState('');


  //change these to coordinator Api
  let categories = []
  categories = useGet(`/admin/categories`, true);
  let programs = []
  programs = useGet(`/admin/programs`, true);
  let candidates = []
  candidates = useGet(`/admin/candidates`, true)[0];
  // console.log(categories,programs,candidates);
  console.log('categories', categories);
  console.log('programs', programs);
  console.log('candidates', candidates);

  useEffect(() => {
    () => loadTableData()
  }, [categories])



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

    // if (process == 'add') {
    //   setSubmitting(true)
    //   apiPost('admin/programs/', data, false, false, false, () => { loadTableData(); setSubmitting(false) })
    // }

    // else if (process == 'update') {
    //   setSubmitting(true)
    //   apiPatch(`admin/programs/${cordiID}`, data, true, false, false, () => { loadTableData(); setSubmitting(false) })
    // }

    if (process == 'add') {
      const getData = await baseApi.post(`/admin/categories`, data, {
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
      baseApi.patch(`admin/categories/${catID}`, data)
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

  return (
    <Portal_Layout activeTabName='programs' activeChildTabName='program registration' userType='Institute'>
      <div className={styles.pageContainer}>
        <h1>Program Registration</h1>
        <span data-theme='hr'></span>
        <div className={styles.dataContainer}>

          <div className={styles.tables}>
            <div className={styles.table_header}>

              <h2>Added categories</h2>
              <select name="" id="" style={{ width: '30rem', height: '100%', padding: '1rem', fontSize: '1.6rem', backgroundColor: 'transparent', border: 0, outline: 0 }}>
                {categories[0] != null && categories[0] != undefined &&
                  categories[0].map((item, index) => {
                    return (
                      <option value={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>
              <div className="flex-grow"></div>
              <button data-theme={'edit'} onClick={() => downloadExcel(sampleData)}>DownLoad Excel &darr;</button>
            </div>

            <div data-theme="table">
              {isLoading ? <div style={{ width: '100%', height: '50rem', }}> <h2>Loading</h2> </div> :

                <Data_table id='institutesTable' heads={heads} >
                  {
                    categories.map((item, index) => {
                      let siNo = index + 1;
                      return (
                        <tr key={index}>
                          <td style={{ width: '.6rem' }}>
                            <button data-theme='delete' onClick={() => handleDelete(item.id, index)}>X</button>
                          </td>
                          <td style={{ width: '1rem' }}>{siNo}</td>
                          {/*PROGRAM */}
                          <td style={{ width: '8rem' }}>{item?.name}</td>
                          {/*CANDIDATESAA */}
                          <td style={{ width: '8rem', padding: 0 }}>
                            {/* <Input label='' name='name' type='dropdown' dropdownOpts={categories}
                              status='normal' style={{ marginTop: '-6rem' }} /> */}
                            <select name="" id="" style={{ width: '100%', height: '100%', padding: '1rem', fontSize: '1.6rem', backgroundColor: 'transparent', border: 0, outline: 0 }}>
                              <option value="">Select</option>
                              {candidates != null && candidates != undefined &&
                                candidates.candidates.map((item, index) => {
                                  return (
                                    <option value={item.id}>{item.name}</option>
                                  )
                                })
                              }
                            </select>
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
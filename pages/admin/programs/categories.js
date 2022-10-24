import React, { useEffect, useState } from 'react'
import Input from '../../../components/portal/inputTheme';
import Portal_Layout from '../../../components/portal/portal_Layout'
import styles from '../../../styles/portals/input_table.module.css'
import Data_table from '../../../components/portal/data_table';
import EditIcon from '../../../public/assets/svg/edit.svg'
import DeleteIcon from '../../../public/assets/svg/delete.svg'
import baseApi from '../../../api/baseApi';
// import Input from '../../../components/portal/inputTheme';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [chestNoSeries, setChestNoSeries] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [process, setProcess] = useState('add');
  const [isLoading, setLoading] = useState(false);
  let getData;
  useEffect(() => {
    document.getElementById('sessionIDChanger').value = localStorage.getItem('sessionID')
    setLoading(true)
    // console.log('category based', category, data.find(item => item.categoryID === category))
    console.log("loading")
    let fetchedData = [];
    const getData = async () => {
      fetchedData = await baseApi.get(`/admin/categories?session_id=${localStorage.getItem('sessionID')}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
          setCategories(res.data.data)
          return res.data.data
        })
        .catch((err) => alert(err))
        .finally(() => {
          setLoading(false)
        })
    }
    getData()
    console.log('fetched ', fetchedData);
  }, [])

  useEffect(() => {
    () => loadTableData()
  }, [categories])


  const validateForm = () => {
    if (name === '' || chestNoSeries === '' || localStorage.getItem('sessionID') == '' || localStorage.getItem('sessionID') === undefined || localStorage.getItem('sessionID') === null) {
      alert('Please fill all the fields')
      return false
    }
    return true
  }
  const handleDelete = (id,) => {
    baseApi.delete(`/admin/categories/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (!res.data.success) alert(res.data.data)
        else alert('deleted')
      })
      .finally(() => {
        loadTableData()
      })
  }
  const handleEdit = async (id, index) => {
    // clearForm()
    // setInstiID(id)
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
    console.log(data);
    if (validateForm()) {
      console.log("submitting", data);
      console.log("submitting", data);
      if (process == 'add') {
        baseApi.post(`/admin/categories`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          // .then(async (res) => {
          // })
          .catch((err) => alert(err))
          .finally(async () => {
            setSubmitting(false)
            await getData()
            // loadTableData()
          }
          )
      }
      else if (process == 'update') {
        const data = {
          name,
          chestNoSeries,
          sessionID: localStorage.getItem('sessionID'),
        }
        baseApi.patch(`admin/institutes/categories?session_id=${localStorage.getItem('sessionID')}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .catch((err) => {
            alert(err)
          })
          .finally(async () => {
            loadTableData()
            // setLoading(false)
            // clearForm()
            setSubmitting(false)
          })
      }
    }
    else {
      alert('Please fill all the fields. ')
      console.log('not validated')
      setSubmitting(false)
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
  const heads = ['', 'SI.', 'Category name', 'Chest number series', 'ID']

  return (
    <Portal_Layout activeTabName='programs' activeChildTabName='categories' userType='admin'>
      <div className={styles.pageContainer}>
        <h1>Categories</h1>
        <span theme='hr'></span>
        <div className={styles.dataContainer}>
          <div className={styles.forms}>
            <h2>Add or Edit categories</h2>
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

              <h2>Added categories</h2>
              <button theme={'edit'} onClick={() => downloadExcel(sampleData)}>DownLoad Excel &darr;</button>
            </div>

            <div theme="table">
              {isLoading ? <div style={{ width: '100%', height: '50rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <h2>Loading</h2> </div> :

                <Data_table id='institutesTable' heads={heads} >
                  {
                    categories.map((item, index) => {
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
                          <td style={{ width: '19rem' }}>{item.chestNoSeries}</td>
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

export default Categories
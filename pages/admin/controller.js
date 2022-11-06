import React, { useState } from 'react'
import Data_table from '../../components/portal/data_table'
import Input from '../../components/portal/inputTheme'
import Portal_Layout from '../../components/portal/portal_Layout'
import { apiPost } from '../../helpers/functions'
import styles from '../../styles/portals/input_table.module.css'
import baseApi from '../../api/baseApi'
import DeleteIcon from '/public/assets/svg/delete.svg'
import EditIcon from '/public/assets/svg/edit.svg'
import { useEffect } from 'react'

function Dashboard() {
  const [activeTabName, setActiveTabName] = useState()
  const [activeChildTabName, setActiveChildTabName] = useState()

  const [data, setData] = useState([])
  const [edit, setEdit] = useState(false)
  const [username, setName] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const heads = ['Actions', 'SI No', 'First Name','Last Name','User Name' ,'Role'     ]
  useEffect(() => {

    baseApi.get('/admin/user').then((res) => {
      setData(res.data.data)
    })
  }, [])
  

   
  const handleSubmit = (e) => {
    e.preventDefault()
    setName(document.getElementById('username').value)
    setFirstName(document.getElementById('first_name').value)
    setLastName(document.getElementById('last_name').value)
    setPassword(document.getElementById('password').value)
    setEdit(false)
    const data = {
      firstName: first_name,
      lastName: last_name,
      username: username,
      password: password,
      role: role
    }
    console.log(data)
    baseApi.post('/admin/user',data).then((res) => {
       console.log(res)
    })
  }

  const handleEdit = (id,index) => {
    const row = document.querySelector(`tbody`).rows[index + 1]

    setFirstName( row.cells[2].innerHTML)
    setLastName( row.cells[3].innerHTML)
    setName(row.cells[4].innerHTML)
    
    setEdit(true)
    console.log(data)
   
  }
  const handleDelete = (e) => {
    
    baseApi.delete(`/admin/user/${e}` ) .then((res) => {
      console.log(res)
    })
  }


      

  return (
    <Portal_Layout activeTabName='dashboard' activeChildTabName='' userType='admin'>
      <div className={styles.pageContainer}>

        <h1>Controllers</h1>
        <div className={styles.dataContainer}>

          <div className={styles.forms}>
            <h2>Add or Edit Users</h2>

        <div className={styles.formContainer} data-theme='formContainer' style={{ maxHeight: '75vh' }}>
          <form action="#" >
             
                <Input label='First Name' name='first_name' type='text'  value={first_name} 
                  placeholder='First Name' status='normal' handleOnChange={(e) => { setFirstName(e.target.value)}} />
                <Input label='Last Name' name='last_name' type='text' value={last_name}
                  placeholder='Last Name' status='normal' handleOnChange={(e) => { setLastName(e.target.value)}} />
             
            <Input label='User Name' name='username' type='text' value={username}
                  handleOnChange={(e) => { setName(e.target.value) }}
              placeholder='User Name' status='normal' />
            <Input label='Password' name='password' type='password'  
                  handleOnChange={(e) => { setPassword(e.target.value) }}
              placeholder='Password' status='normal' />
            
             
            <Input type='dropdown' label='Role' name='role'
              dropdownOpts={[{ id: '1', name: 'Controller' }, { id: '2', name: 'Volunteer' }, { id: '3', name: 'Media' }]}
              placeholder='Gender' status='normal' handleOnChange={(e)=>{setRole(e.target.value)}} />
             
            <div className={styles.formBtns} style={{ width: '100%' }}>

                  <button data-theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={handleSubmit} >
                Submit
              </button>
              <button data-theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>
            </div>
          </form>
          </div>
          </div>
          <div className={styles.tables}>
            <div className={styles.table_header}>
              <h2>Added Candidates</h2>
              <button data-theme={'edit'} onClick={() => downloadExcel(data)}>DownLoad Excel &darr;</button>
            </div>
            <div data-theme="table" style={{ maxHeight: '70vh', width: '100%', overflowX: 'auto' }}>

          <Data_table id='institutesTable' data={data} heads={heads}>
            {/* {console.log(data)} */}
            {
              data?.map((item, index) => {
                let siNo = index + 1;
                return (
                  <tr key={index}>
                    <td style={{ minWidth: '6rem', width: 'fit-content' }}>
                      <button data-theme='edit' onClick={() => handleEdit(item.id, index)}>
                        <EditIcon height={16} />
                      </button>
                      <button data-theme='delete' onClick={() => handleDelete(item.id)}>
                        <DeleteIcon height={16} />
                      </button>
                    </td>
                    <td style={{}}>{siNo}</td>
                    <td style={{ minWidth: '3rem', width: 'fit-content' }}>{item.firstName}</td>
                    <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.lastName}</td>
                    <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.username}</td>
                    <td style={{ minWidth: '6rem', width: 'fit-content' }}>{item.role}</td>
                  </tr>
                )
              })
            }
          </Data_table>
            </div>
          </div>

        </div>
      </div>
    </Portal_Layout>
    
  )

}


export default Dashboard
import Portal_Layout from '../../components/portal/portal_Layout'
import { apiPost, useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import Image from 'next/image';
import styles from '../../styles/control/scoreboard.module.css'
import Input from '../../components/portal/inputTheme';
import { useEffect, useState } from 'react';
import Data_table from '../../components/portal/data_table';
import Select from 'react-select'


function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [cadidates, setCadidates] = useState([]);

  const [chestNO, setChestNO] = useState('');
  const [Name, setName] = useState('');

  const [programCode, setProgramCode] = useState('');

  const [pointOne, setPointOne] = useState('');
  const [pointTwo, setPointTwo] = useState('');
  const [pointThree, setPointThree] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [markedCadidates, setMardedCadidates] = useState([]);



  let userDetails
  userDetails = useGet('/user/me', false, false, false, (err) => { }, false)[0]
  let categories = []
  categories = useGet(`/user/categories/`, true)[0];
  // console.log(categories)


  useEffect(() => {
    baseApi.get(`/user/elimination-result/`)
      .then((res) => {
        setPrograms(res.data.data)
      })
  }, [])

  useEffect(() => {
    baseApi.get(`/user/elimination-result/points/${programCode}`).then((res) => {
      setMardedCadidates(res.data.data)
    })
  }, [programCode])

  const getMarkedCandidates = (code) => {

    baseApi.get(`/user/elimination-result/points/${code}`).then((res) => {
      setMardedCadidates(res.data.data)
    })
  }


  const clearForm = () => {
    setChestNO('');
    setName('');
    setPointOne('');
    setPointTwo('');
    setPointThree('');
  }

  const getCandidates = (code) => {

    setProgramCode(code)
    baseApi.get(`/user/elimination-result/candidates/${code}`).then((res) => {
      setCadidates(res.data.data)
    })

  }
  const tomarkUpload = async (cadidate,e) => {
    const row = e.target.parentElement
    console.log(row)
    setName(cadidate.name)
    setChestNO(cadidate.chestNO)
    setSelectedRow(row)
  }
  const markUpload = (e) => {
    e.preventDefault();
    let data = {
      // cp_id: cadidate.id,
      chestNO: chestNO,
      programCode: programCode,
      pointOne: parseInt(pointOne),
      pointTwo: parseInt(pointTwo),
      pointThree: parseInt(pointThree)
    }
    // console.log(data)
    setIsSubmitting(true)


    apiPost('/user/elimination-result/', data,false,(res)=>{
      // selectedRow.style.backgroundColor = 'green'
    },false,()=>{
      clearForm()
      setIsSubmitting(false)
      getMarkedCandidates(programCode)
    })


  }



  let array = []
  programs?.map((program) => {
    array.push({ value: program.programCode, label: program.programCode + ' ' + program.name })
  })



  const heads = ['SI No', 'Ches No', 'Name']



  return (
    <Portal_Layout activeTabName='Mark Entry' userType='controller'  >
      <h1>Elimination Result</h1>
      <span data-theme='hr'></span>

      <Select options={array} onChange={(e) => getCandidates(e.value)} />

      <div className={styles.resultPage}>
        <div className={styles.markUpload}>
          <div className={styles.forms}>
            <h2> Add Marks</h2>
            <div className={styles.formContainer} data-theme='formContainer' style={{ maxHeight: '75vh' }}>
              <form action="#" >
                <Input label='Chest NO' name='chestNo' type='text' value={chestNO}
                  handleOnChange={({ target }) => setChestNO(target?.value)}
                  placeholder='Chest NO' status='normal' isDisabled='true' />
                <Input label='Name' name='name' type='text' value={Name}
                  handleOnChange={({ target }) => setName(target?.value)}
                  placeholder='Name' status='normal' isDisabled='true' />
                <Input label='Mark' name='pointOne' type='text' value={pointOne}
                  handleOnChange={({ target }) => setPointOne(target?.value)}
                  placeholder='Mark' status='normal' />
                <Input label='Mark' name='pointTwo' type='text' value={pointTwo}
                  handleOnChange={({ target }) => setPointTwo(target?.value)}
                  placeholder='Mark' status='normal' />
                <Input label='Mark' name='pointThree' type='text' value={pointThree}
                  handleOnChange={({ target }) => setPointThree(target?.value)}
                  placeholder='Mark' status='normal' />
                <div className={styles.formBtns} style={{ width: '100%' }}>
                  <button data-theme='submit' style={{ width: '70%', marginRight: '5%' }} onClick={(e) => markUpload(e)}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                    {/* {process.toUpperCase()} */}
                  </button>
                  <button data-theme='clear' style={{ width: '25%' }} onClick={() => clearForm()}>X</button>

                </div>
              </form>
            </div>
          </div>

        </div>
        <div  style={{width:'100%'}}>
          {/* <div className={styles.tableContainer}> */}

            <span style={{ }}>
              <h2>Cadidates</h2>
            </span>
            <div data-theme="table" className={styles.candidatesTable} style={{ width: '100%', height: '70vh' }}>
              <Data_table cadidates={cadidates} heads={heads}  style={{width:'100%'}}>
                {
                  cadidates && cadidates?.map((cadidate, index) => {
                    return (
                      <tr style={{ width: '100%' }} key={index} onClick={(e) => { tomarkUpload(cadidate,e) }}>
                        <td style={{ width: '5rem' }}>{index + 1}</td>
                        <td style={{ width: '5rem' }}>{cadidate.chestNO}</td>
                        <td style={{ width: '80%' }}>{cadidate.name}</td>
                      </tr>
                    )
                  })
                }
              </Data_table>
            </div>
          {/* </div> */}
        </div>
      </div>



    </Portal_Layout>

  )
}

export default Dashboard
import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions';
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
  const [markedCadidates, setMardedCadidates] = useState([]);
  const [showMarks, setShowMarks] = useState(false);



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
    setProgramCode('');
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
  const tomarkUpload = async (cadidate) => {

    setName(cadidate.name)
    setChestNO(cadidate.chestNO)
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


    baseApi.post('/user/elimination-result/', data).then((res) => {
      console.log(res.data.data)
      clearForm()
    })
    setIsSubmitting(false)
    getMarkedCandidates(programCode)

  }



  let array = []
  programs?.map((program) => {
    array.push({ value: program.programCode, label: program.programCode + ' ' + program.name })
  })



  const heads = showMarks ? ['SI No', 'Ches No', 'Name', 'Point 1', 'Point 2', 'Point 3', 'Total Point'] : ['SI No', 'Ches No', 'Name']

  const buttonTitle = showMarks ? 'Show Candidates' : 'Show Marks'

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
                  placeholder='Chest NO' status='normal' />
                <Input label='Name' name='name' type='text' value={Name}
                  handleOnChange={({ target }) => setName(target?.value)}
                  placeholder='Name' status='normal' />
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
        <div>
          <span style={{ display: "flex", gap: "1rem" }}>
            <h1>Cadidates</h1>


            <button onClick={() => getMarkedCandidates(programCode) & setShowMarks(!showMarks)}>{buttonTitle}</button>
          </span>
          <div className={styles.candidatesTable}>
            <Data_table cadidates={cadidates} heads={heads} >
              {

                !showMarks ? cadidates && cadidates?.map((cadidate, index) => {
                  return (
                    <tr key={index} onClick={() => { tomarkUpload(cadidate) }}>
                      <td>{index + 1}</td>
                      <td >{cadidate.chestNO}</td>
                      <td>{cadidate.name}</td>



                    </tr>
                  )
                })
                  :
                 
                  markedCadidates && markedCadidates?.map((cadidate, index) => {
                    return (
                      <tr key={index} onClick={() => { tomarkUpload(cadidate) }}>
                        <td>{index + 1}</td>
                        <td >{cadidate.chestNO}</td>
                        <td>{cadidate.candidateName}</td>
                        <td>{cadidate.pointOne}</td>
                        <td>{cadidate.pointTwo}</td>
                        <td>{cadidate.pointThree}</td>
                        <td>{cadidate.totalPoint}</td>
                      </tr>
                    )
                  })
              }
            </Data_table>


          </div>
        </div>
      </div>



    </Portal_Layout>

  )
}

export default Dashboard
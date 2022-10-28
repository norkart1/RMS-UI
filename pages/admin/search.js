import Select from 'react-select'
import Portal_Layout from '../../components/portal/portal_Layout';
import { useState } from 'react';
import { useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import { useEffect } from 'react';

const DisplayCandidates = (props) => {
  const [candidates, setCandidates] = useState([ ]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  

  useEffect(() => {
    
    baseApi.get('admin/candidates').then(res => {
    setCandidates(res.data.data.candidates)
  })

  }, [])
   
    let array = []
    candidates.map((candidate) => {
      array.push({ value: candidate.chestNO, label:candidate.chestNO + ' ' + candidate.name })
    })
    const handleOnChange = (e) => {
      baseApi.get('admin/candidates/'+e.value).then(res => {
        setSelectedCandidate(res.data.data)
      })

    }
    console.log(selectedCandidate)


  return (
    <Portal_Layout activeTabName='dashboard' activeChildTabName='' userType='admin'>

    <div>
      <h1>Display Candidates</h1>
     
        <Select options={array} onChange={handleOnChange} />
        {selectedCandidate && <div>
          <h1>{selectedCandidate.chestNO}</h1>
          <h1>{selectedCandidate.name}</h1>
          <h1>{selectedCandidate.class}</h1>
          <h1>{selectedCandidate.adno}</h1>
      </div>} 
    </div>
    </Portal_Layout>
  );
}

export default DisplayCandidates;
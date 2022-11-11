import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Select from "react-select";
import Portal_Layout from '../../components/portal/portal_Layout'
import baseApi from "../../api/baseApi";
import Data_table from '../../components/portal/data_table';
import { apiDelete, apiPost } from '../../helpers/functions';


function PublishEliminationResult() {
  const [categories, setCategories] = useState([])
  const [programs, setPrograms] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  useEffect(() => {
    baseApi.get(`/user/categories?session_id=${localStorage.getItem('sessionID')}`).then((res) => {
      setCategories(res.data.data);
    });
  }, [])

  let categoriesOpts = [];
  categories?.map((program) => {
    categoriesOpts.push({
      value: program.id,
      label: program.name
    });
  });

  const handleCatChange = (e) => {
    setSelectedCategoryId(e.value)
    loadPrograms(e.value)
  }
  const loadPrograms = (catID) => {
    baseApi.get(`/user/elimination-result`).then((res) => {
      setPrograms(res.data.data.filter((program) => program.categoryID === catID));
      console.log(res.data.data.filter((program) => program.categoryID === catID))
    });
  }
  const handlePublish = (programCode, process) => {
    if (process == 'publish') {
      apiPost(`/user/elimination-result/publish/${programCode}`, { null: null }, false, () => {
        loadPrograms(selectedCategoryId)
      })
    }
    else if (process == 'unPublish') {
      apiDelete(`/user/elimination-result/publish/`, programCode, false, false, () => {
        loadPrograms(selectedCategoryId)
      })
    }
  }
  const heads = ["Si No.", "Program Code", "Program Name", "Status", ""];
  return (
    <Portal_Layout activeTabName="Publish Result" userType="controller">
      <h1>Publish Elimination Result</h1>
      <Select options={categoriesOpts} onChange={(e) => handleCatChange(e)} />
      <div data-theme="table" style={{ marginTop: '1rem' }}>
        <Data_table id='institutesTable' heads={heads} style={{ width: '100%' }} >
          {
            programs.map((item, index) => {
              let siNo = index + 1;
              return (
                <tr key={index}>
                  <td style={{ width: '1rem' }}>{siNo}</td>
                  <td style={{ width: '8rem' }}>{item.programCode}</td>
                  <td style={{ width: 'auto', fontWeight: 'bold' }}>{item.name}</td>
                  <td style={{ width: '15rem',fontWeight:'bold' }}>{item.resultPublished == 'False' ? item.resultEntered == 'True' ? <p style={{ color: 'blue' }}>Selection completed</p> : <p style={{color:'darkred'}}>Selection not completed</p> : <p style={{color:'darkgreen'}}>Result <br /> published</p>}</td>
                  <td style={{ width: '10rem' }}>

                    {item.resultPublished == "True" ? <button data-theme='delete' style={{ padding: '1rem', borderRadius: '8px' }} onClick={() => handlePublish(item.programCode, 'unPublish')}>UNPUBLISH</button> : <button data-theme='submit' onClick={() => handlePublish(item.programCode, 'publish')}>PUBLISH</button>}
                  </td>
                </tr>
              )
            })
          }
        </Data_table>
      </div>
    </Portal_Layout>
  )
}

export default PublishEliminationResult

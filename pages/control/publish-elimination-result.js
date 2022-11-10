import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Select from "react-select";
import Portal_Layout from '../../components/portal/portal_Layout'
import baseApi from "../../api/baseApi";
import Data_table from '../../components/portal/data_table';
import { apiPost } from '../../helpers/functions';


function PublishEliminationResult() {
  const [categories, setCategories] = useState([])
  const [programs, setPrograms] = useState([])
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

  const loadPrograms = (catID) => {
    baseApi.get(`/user/elimination-result`).then((res) => {
      setPrograms(res.data.data.filter((program) => program.categoryID === catID));
      console.log(res.data.data.filter((program) => program.categoryID === catID))
    });
  }
  const handlePublish = (programCode) => {
    apiPost(`/user/elimination-result/publish/${programCode}`,{null:null})
  }
  const heads = ["Si No.", "Program Code","Program Name", ""];
  return (
    <Portal_Layout activeTabName="Publish Eli. Result" userType="controller">
      <h1>Publish Elimination Result</h1>
      <Select options={categoriesOpts} onChange={(e) => loadPrograms(e.value)} />
      <span data-theme='info'>Once published it can not be unpublished.</span>
      <div data-theme="table" style={{marginTop:'1rem'}}>
        <Data_table id='institutesTable' heads={heads} style={{width:'100%'}} >
          {
            programs.map((item, index) => {
              let siNo = index + 1;
              return (
                <tr key={index}>
                  <td style={{ width: '1rem' }}>{siNo}</td>
                  <td style={{ width: '8rem' }}>{item.programCode}</td>
                  <td style={{ width: 'auto' }}>{item.name}</td>
                  <td style={{ width: '10rem' }}><button data-theme='submit' onClick={() => handlePublish(item.programCode)}>PUBLISH</button></td>
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

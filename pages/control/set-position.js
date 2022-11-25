import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { apiDelete, apiPost, downloadExcel, useGet } from '../../helpers/functions';
import baseApi from '../../api/baseApi'
import Image from 'next/image';
import styles from '../../styles/control/scoreboard.module.css'
import Input from '../../components/portal/inputTheme';
import { useEffect, useState } from 'react';
import Data_table from '../../components/portal/data_table';
import Select from 'react-select'


function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [markedCadidates, setMardedCadidates] = useState([]);
  const [cadidates, setCadidates] = useState([]);
  const [position, setPosition] = useState("");

  const [programCode, setProgramCode] = useState("");
  const [seletedcadidates, setSeletedcadidates] = useState([]);
  const [categories, setCategories] = useState([]);

  let userDetails;
  userDetails = useGet("/user/me", false, false, false, (err) => {}, false)[0];
  // let categories = []
  // categories = useGet(`/user/categories/`, true)[0];
  //

  useEffect(() => {
    baseApi
      .get(`/user/categories?session_id=${localStorage.getItem("sessionID")}`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);
  useEffect(() => {
    getPrograms();
  }, []);

  useEffect(() => {
    if (programCode != "") {
      baseApi
        .get(`/user/final-result/marks/programs/${programCode}`)
        .then((res) => {
          setMardedCadidates(res.data.data);
        });
    }
  }, [programCode]);
  const getPrograms = (catID) => {
    baseApi
      .get(
        `/user/final-result/programs/?session_id=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        if (catID)
          setPrograms(res.data.data.filter((item) => item.categoryID == catID));
        else setPrograms(res.data.data);
      });
  };
  const getMarkedCandidates = (code) => {
    setProgramCode(code);
    baseApi.get(`/user/final-result/marks/programs/${code}`).then((res) => {
      setMardedCadidates(res.data.data);
    });
  };

  const deletePosition = (id) => {
    apiDelete(`/user/final-result/`, id, false,false,()=>{
      getMarkedCandidates(programCode);
    });
  };

  const addPosition = (pos, id) => {
    apiPost(
      `/user/final-result/${id}`,
      { position: pos },
      false,
      false,
      false,
      () => {
        getMarkedCandidates(programCode);
      }
    );
  };

   

  // delete marks  
  const deleteMarks = (id) =>
    apiDelete(
      `/user/final-result/marks/one/`,
      id,
      getMarkedCandidates(programCode),
      false,
      false
    );

  let categoriesOpts = [];
  categories?.map((category) => {
    categoriesOpts.push({
      value: category.id,
      label: category.name,
    });
  });
  let array = [];
  programs?.map((program) => {
    array.push({
      value: program.programCode,
      label: program.programCode + " " + program.name,
    });
  });

  const heads = [
    "SI No",
    "Chest No",
    "Name",
    "Mark",
    "Mark",
    "Mark",
    "Total",
    "Add Position",
    "Grade",
    "Action",
  ];
  // const heads2 = ['SI No', 'Chest No', 'Name', 'Action']
  const handlePositionClick = (pos, candProId) => {
    setPosition(pos);
    addPosition(candProId);
  };
 
  return (
    <Portal_Layout activeTabName="add position" userType="controller">
      <h1>Final Result</h1>
      <div className={styles.selects}>
        <Select
          options={categoriesOpts}
          onChange={(e) => getPrograms(e.value)}
          placeholder="Select Category"
        />
        <Select
          options={array}
          onChange={(e) => {
            getMarkedCandidates(e.value);
            // & selectedCadidates(e.value)
          }}
          placeholder="Search and Select Program"
        />
      </div>
      {/* <div className={styles.resultPage}> */}

      <div className={styles.selection}>
        <div>
          <h2>Select Candidates</h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table
              id="markedCadidates"
              heads={heads}
              style={{ minWidth: "85vw" }}
            >
              {markedCadidates &&
                markedCadidates?.map((item, index) => {
                  return (
                    <tr key={index} style={{ width: "100%" }}>
                      <td style={{ width: "fit-content" }}>{index + 1}</td>
                      <td style={{ width: "fit-content" }}>{item.chestNO}</td>
                      <td style={{ width: "100rem" }}>{item.candidateName}</td>
                      <td style={{ width: "fit-content" }}>{item.pointOne}</td>
                      <td style={{ width: "fit-content" }}>{item.pointTwo}</td>
                      <td style={{ width: "fit-content" }}>
                        {item.pointThree}
                      </td>
                      <td style={{ width: "fit-content" }}>
                        {item.totalPoint}
                      </td>
                      <td
                        style={{ width: "auto", display: "flex", gap: "1rem" }}
                      >
                        <button
                          onClick={() =>
                            item.candidateProgram.position == "First"
                              ? deletePosition(item.candidateProgram.id)
                              :
                            addPosition("First", item.candidateProgram.id)
                          }
                          data-theme={
                            
                            item.candidateProgram.position == "First"
                              ? "submit"
                              : "select"
                          }
                          style={{
                            backgroundColor: "white",
                            width: "fit-content",
                          }}
                        >
                          1st
                        </button>
                        <button
                          onClick={() =>
                            item.candidateProgram.position == "Second"
                              ? deletePosition(item.candidateProgram.id)
                              :

                            addPosition("Second", item.candidateProgram.id)
                          }
                          data-theme={
                            item.candidateProgram.position == "Second"
                              ? "submit"
                              : "select"
                          }
                          style={{
                            backgroundColor: "white",
                            width: "fit-content",
                          }}
                        >
                          2nd
                        </button>
                        <button
                          onClick={() =>
                            item.candidateProgram.position == "Third"

                              ? deletePosition(item.candidateProgram.id)
                              :
                            addPosition("Third", item.candidateProgram.id)
                          }
                          data-theme={
                            item.candidateProgram.position == "Third"
                              ? "submit"
                              : "select"
                          }
                          style={{
                            backgroundColor: "white",
                            width: "fit-content",
                          }}
                        >
                          3rd
                        </button>
                      </td>

                      <td style={{ width: "fit-content" }}>
                        {item.candidateProgram.grade}
                      </td>
                      {/* <td style={{ width: 'fit-content' }}>{item.candidateProgram?.id}</td> */}
                      {/* // button for remove marks */}
                      <td style={{ width: "fit-content" }}>
                        <button
                          onClick={() => deleteMarks(item.id)}
                          // padding="0.5rem"
                           style={{padding:"1rem"}}
                          data-theme="delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </Data_table>
          </div>
        </div>
        
      </div>
     
    </Portal_Layout>
  );
}

export default Dashboard
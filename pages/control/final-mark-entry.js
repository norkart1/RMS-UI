import Portal_Layout from "../../components/portal/portal_Layout";
import { apiPost, uniqueInstitute, substractArrays, useGet, onKeyDown } from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/image";
import styles from "../../styles/control/scoreboard.module.css";
import Input from "../../components/portal/inputTheme";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";
import Select from "react-select";
import Loader from "../../components/loader";
 


function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [cadidates, setCadidates] = useState([]);

  const [chestNO, setChestNO] = useState("");
  const [Name, setName] = useState("");

  const [programCode, setProgramCode] = useState("");
  const [programName, setProgramName] = useState("");

  const [pointOne, setPointOne] = useState("0");
  const [pointTwo, setPointTwo] = useState("0");
  const [pointThree, setPointThree] = useState("0");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [markedCadidates, setMardedCadidates] = useState([]);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  let userDetails;
  userDetails = useGet("/user/me", false, false, false, (err) => { }, false)[0];
  
 

  useEffect(() => {
    baseApi.get(`/user/categories?session_id=${localStorage.getItem('sessionID')}`).then((res) => {
      setCategories(res.data.data);
    });
     
  }, [])
  useEffect(() => {
    getPrograms()
  }, []);
  const getPrograms = (catID) => {
    baseApi.get(`/user/final-result/programs`).then((res) => {
      if (catID)
        setPrograms(res.data.data.filter((item) => item.categoryID == catID));
      else setPrograms(res.data.data);
    });
  }

  useEffect(() => {
    if (programCode) {
    baseApi
      .get(`/user/final-result/marks/programs/${programCode}`)
      .then((res) => {
        setMardedCadidates(res.data.data);
      });
    }
  }, [programCode]);

  const getMarkedCandidates = (code) => {
    baseApi.get(`/user/final-result/marks/programs/${code}`).then((res) => {
      setMardedCadidates(res.data.data);
    });
  };

  const clearForm = () => {
    setChestNO("");
    setName("");
    setPointOne("");
    setPointTwo("");
    setPointThree("");
  };

  const getCandidates = async (code) => {
    localStorage.setItem("program-code", code);
    setIsLoading(true);
    setProgramCode(code);

    let totalCandidates;
    let markedCadidates;
    baseApi.get(`/user/final-result/candidates/${code}`).then((res) => {
      totalCandidates = res.data.data;
     
      setCadidates(res.data.data);
      baseApi
        .get(`/user/final-result/marks/programs/${code}`)
        .then((res) => {
          markedCadidates = res.data.data;
        })
        .then(async () => {
          const filteredCandidates = await substractArrays2(
            totalCandidates,
            markedCadidates,
            "institute",
            "id"
          );
          filteredCandidates = uniqueInstitute(
            filteredCandidates,
            "institute",
            "id"
          );
          setCadidates(filteredCandidates);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
    // substractArrays(cadidates, markedCadidates)
  };
  const substractArrays2 = (one, two, filterBy, filterBy2) => one?.filter((item) => {
    return !two?.some((item2) => {
      return item2.instituteID == item[filterBy][filterBy2];
    })
  });



  const tomarkUpload = async (cadidate, e) => {
    const row = e.target.parentElement;
    setName(cadidate.name);
    setChestNO(cadidate.chestNO);
    setSelectedRow(row);
  };
 

  const handleRowSubmit = (e) => {
    e.preventDefault();
    const row = e.target.parentElement.parentElement;
    let data = {
      // cp_id: cadidate.id,
      chestNO: row.cells[2].innerText,
      programCode: programCode,
      pointOne: parseFloat(row.cells[4].children[0].value),
      pointTwo: parseFloat(row.cells[5].children[0].value),
      pointThree: parseFloat(row.cells[6].children[0].value),
    };
    setIsSubmitting(true);
    apiPost(
      "/user/final-result/marks/one",
      data,
      false,
      (res) => {
        row.remove();
      },
      false,
      () => {
        clearForm();
        setIsSubmitting(false);
        getMarkedCandidates(programCode);
      }
    );
  };
  const submitMarks = (e) => {
    e.preventDefault();
    let tableLength = document.getElementById("candidatesTable").rows.length;
    // loop through the table rows
    for (let i = 1; i < tableLength; i++) {
      const row =  document.getElementById("candidatesTable").rows[i];

    let data = {
      // cp_id: cadidate.id,
      chestNO: row.cells[2].innerText,
      programCode: programCode,
      
      pointOne:  parseFloat(row.cells[4].children[0].value)? parseFloat(row.cells[4].children[0].value):0  ,
      pointTwo: parseFloat(row.cells[5].children[0].value) ? parseFloat(row.cells[5].children[0].value):0,
      pointThree: parseFloat(row.cells[6].children[0].value) ? parseFloat(row.cells[6].children[0].value):0,
    };
    setIsSubmitting(true);
    apiPost(
      "/user/final-result/marks/one",
      data,
      false,
      (res) => {
        row.remove();
      },
      false,
      () => {
        clearForm();
        setIsSubmitting(false);
        getMarkedCandidates(programCode);
      },
      i == tableLength - 1  
    );
  }
  };

  let programOpts = [];
  programs?.map((program) => {
    programOpts.push({
      value: program.programCode,
      label: program.programCode + " " + program.name,
    });
  });
  let categoriesOpts = [];
  categories?.map((category) => {
    categoriesOpts.push({
      value: category.id,
      label: category.name,
    });
  });

  const heads = [
    "SI No",
    "Code Letter",
    "Chest No",
    "Name",
    "Mark   ",
    "Mark   ",
    "Mark   ",
    
   
  ];
  return (
    <Portal_Layout activeTabName="Mark Entry" userType="controller">
      <h1>Final Result</h1>
      {/* <span data-theme="hr">        <Select options={categoriesOpts} onChange={(e) => getPrograms(e.value)} />
</span> */}
      <div className={styles.selects}>
        <Select
          options={categoriesOpts}
          onChange={(e) => getPrograms(e.value)}
          placeholder="Select Category"
        />
        <Select
          options={programOpts}
          onChange={(e) => getCandidates(e.value) & setProgramName(e.label)}
          placeholder="Search and Select Program"
        />
      </div>

      <div className={styles.resultPage}>
        <div className={styles.markUpload}></div>
        <div style={{ width: "100%" }}>
          <span style={{}}>
            <h2>Cadidates of {programName}</h2>
            {/* <img src="/assets/gif/loading.gif" alt="" /> */}
          </span>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "70vh" }}
          >
            {!programCode ? (
              <div
                style={{
                  width: "100%",
                  height: "50rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <h2>PLEASE SELECT A PROGRAM TO ADD MARKS</h2>{" "}
              </div>
            ) : isLoading ? (
               
              <Loader/>
            ) : cadidates.length == 0 ? (
              <div
                style={{
                  width: "100%",
                  height: "50rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <h2>ALL MARKS ARE ADDED FOR THIS PROGRAM</h2>{" "}
              </div>
            ) : (
              <div>
                <Data_table
                  cadidates={cadidates}
                  heads={heads}
                  style={{ width: "100%" }}
                  id="candidatesTable"
                  excelTitle={programName}
                >
                  {cadidates.map((cadidate, index) => {
                    return (
                      <tr
                        style={{ width: "100%" }}
                        key={index}
                        onClick={(e) => {
                          tomarkUpload(cadidate, e);
                        }}
                      >
                        <td style={{ width: "5rem" }}>{index + 1}</td>
                        <td style={{ width: "5rem" }}>{cadidate.codeLetter}</td>
                        <td style={{}}>{cadidate.chestNO}</td>
                        <td style={{}}>{cadidate.candidate.name}</td>
                        <td style={{ width: "10rem" }}>
                          {/* tab to focus to next tr */}

                          <input
                            style={{
                              fontSize: "2rem",
                              border: "solid .2rem #DDDDDD",
                              borderRadius: ".3rem",
                              width: "10rem",
                            }}
                            type="number"
                            
                            onKeyDown={(e) => {
                              onKeyDown(e, 4, index);
                            }}
                          ></input>
                        </td>
                        <td style={{ width: "10rem" }}>
                          <input
                            style={{
                              fontSize: "2rem",
                              border: "solid .2rem #DDDDDD",
                              borderRadius: ".3rem",
                              width: "10rem",
                              appearance: "none",
                            }}
                            type="number"
                          
                            onKeyDown={(e) => {
                              onKeyDown(e, 5, index);
                            }}
                          ></input>
                        </td>
                        <td style={{ width: "10rem" }}>
                          <input
                            style={{
                              fontSize: "2rem",
                              border: "solid .2rem #DDDDDD",
                              borderRadius: ".3rem",
                              width: "10rem",
                            }}
                            onKeyDown={(e) => {
                              onKeyDown(e, 6, index);
                            }}
                            type="number"
                          
                          ></input>
                        </td>
                      </tr>
                    );
                  })}
                </Data_table>
                <div
                  style={{
                    display: "flex",
                    padding: "1rem",
                    marginLeft: "auto",
                    gap: "1rem",
                  }}
                >
                  <div className="flex-grow"></div>
                  <button
                    onClick={(e) => {
                      setIsSubmitting(true);
                      submitMarks(e);
                    }}
                    style={{
                      padding: "1rem",
                      width: "fit-content",
                    }}
                    data-theme="submit"
                  >
                    Submit All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default Dashboard;

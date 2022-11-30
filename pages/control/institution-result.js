import React from "react";
import Portal_Layout from "../../components/portal/portal_Layout";
import { downloadExcel, useGet } from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/image";
import styles from "../../styles/control/result.module.css";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";
import Select from "react-select";
import Loader from "../../components/loader";


function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [publishedMarks, setPublishedMarks] = useState([]);
  const [publishedMarksLoading, setPublishedMarksLoading] = useState(false);
  const [enteredMarks, setEnteredMarks] = useState([]);

  const [categoryBasedMarks, setCategoryBasedMarks] = useState([]);
  const [categoryBasedMarksEntered, setCategoryBasedMarksEntered] = useState([]);

  const [publishedStatus, setPublishedStatus] = useState([]);
  const [enteredStatus, setEnteredStatus] = useState([]);

  let userDetails;
  userDetails = useGet("/user/me", false, false, false, (err) => {}, false)[0];

  // get categoris by session id

  const getCategories = async () => {
    const res = await baseApi.get(
      `/user/categories?session_id=${localStorage.getItem("sessionID")}`
    );
    setCategories(res.data.data);
  };

  // get marks api user/final-result/institutions/published/all
  const getPulishedMarks = () => {
    
    baseApi
      .get(
        `user/final-result/institutions/published/all?sessionID=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        setPublishedMarks(res.data.data);
        
      });
  };
  const getEnteredMarks = () => {
    
    baseApi
      .get(
        `user/final-result/institutions/entered/all?sessionID=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        setEnteredMarks(res.data.data);
       
      });
  };

  const getPublishedCategoryBasedMarks = () => {
   
    baseApi
      .get(
        `user/final-result/institutions/published/category?sessionID=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        setCategoryBasedMarks(res.data.data);
        
      });
  };
  const getEnteredCategoryBasedMarks = () => {
    
    baseApi
      .get(
        `user/final-result/institutions/entered/category?sessionID=${localStorage.getItem("sessionID")}`
      )
      .then((res) => {
        setCategoryBasedMarksEntered(res.data.data);
         
      });
  };


  const getPublishedStatus = () => {
    
    baseApi

      .get(
        `user/final-result/programs/status/published?sessionID=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        setPublishedStatus(res.data.data);
         
      });
  };
  const getEnterdedStatus = () => {
    
    baseApi
      .get(
        `user/final-result/programs/status/entered?sessionID=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        setEnteredStatus(res.data.data);
        
      });
  };
  useEffect(() => {
    getCategories();
    getPulishedMarks();
    getEnteredMarks();
    getPublishedCategoryBasedMarks();
    getEnteredCategoryBasedMarks();
    getPublishedStatus();
    getEnterdedStatus();
  }, []);
    let categoriesOpts = [];
    categories?.map((category) => {
      categoriesOpts.push({
        value: category.id,
        label: category.name,
      });
    });
    const categoriesPublishFilter = (e) => {
      
      baseApi.get(`user/final-result/institutions/published/category/${e}`)
        .then((res) => {
          setCategoryBasedMarks(res.data.data);
         
        });
    };
    const categoriesEnteredFilter = (e) => {
     
      baseApi.get(`user/final-result/institutions/entered/category/${e}`)

        .then((res) => {
          setCategoryBasedMarksEntered(res.data.data);
          
        });
    };
    

                   


  //  filter for category from categoryBasedMarks

  const heads = ["SI No", "Institution", "Total Marks"];

  const publishedCategoryHeads = [
    "SI No",
    "Institution Name",
    "Short Name",
    "Category",
    "Total Marks",
  ];
  const statusHeads = ["SI No", "Category", "Sesstion", "published"];
  const enteredHeads = ["SI No", "Category", "Sesstion", "Entered"];

  return (
    <Portal_Layout activeTabName="Institutions Result" userType="controller">
      <h1>Final Result</h1>

      {/* <div className={styles.resultPage}> */}
      {/* two table in row */} 

      <div className={styles.container}>
        <div style={{ width: "fit-content" }}>
          <h2>Announced Result</h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table id={'published_marks'} heads={heads} data={publishedMarks} 
            excelTitle={'Published Marks'} >
            
              {!publishedMarks   ? (
                <Loader/>
              ) : publishedMarks &&

                
                publishedMarks.map((mark, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{mark.instituteShortName}</td>
                      <td>{mark.total}</td>
                    </tr>
                  );
                })}
            </Data_table>
          </div>
        </div>

        <div style={{ width: "fit-content" }}>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>Category base Announced </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "620px", overflow: "auto" }}
          >
            <Data_table
              heads={publishedCategoryHeads}
              id={'published_category_marks'}
              data={publishedStatus}
              excelTitle={'Published Category Marks'}
              headRow={true}
              style={{ width: "100%", height: "fit-content" }}
            >
              <tr>
                <th>SI No</th>
                <th>Institution Name</th>
                <th>Short Name</th>
                <th>
                  {""}
                  <Select
                    options={categoriesOpts}
                    placeholder="Category"
                    className={styles.filterSelect}
                    onChange={(e) => {
                      categoriesPublishFilter(e.value);
                    }}
                  />
                </th>
                <th>Total Marks</th>
              </tr>
              {!categoryBasedMarks  ? (
               
                <Loader />
              ) : (
                categoryBasedMarks &&
                categoryBasedMarks.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.instituteName}</td>
                      <td>{item.instituteShortName}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.total}</td>
                    </tr>
                  );
                })
              )}
            </Data_table>
          </div>
        </div>
        <div style={{ width: "fit-content" }}>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>Entered Marks</h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table heads={heads} data={enteredMarks}
            excelTitle={'Entered Marks'}
            id={"Entered_marks"} >
              {!enteredMarks ? (
                 
                <Loader />
              ) : (
                enteredMarks.map((mark, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{mark.instituteShortName}</td>
                      <td>{mark.total}</td>
                    </tr>
                  );
                })
              )}
            </Data_table>
          </div>
        </div>
        <div style={{ width: "fit-content" }}>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>Category base Entered </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "620px", overflow: "auto" }}
          >
            <Data_table
              heads={publishedCategoryHeads}
              data={publishedStatus}
              excelTitle={'Entered Category Marks'}
              id={"Entered_category_marks"}
              headRow={true}
              style={{ width: "100%", height: "fit-content" }}
            >
              <tr>
                <th>SI No</th>
                <th>Institution Name</th>
                <th>Short Name</th>
                <th>
                  {""}
                  <Select
                    options={categoriesOpts}
                    placeholder="Category"
                    className={styles.filterSelect}
                    onChange={(e) => {
                      categoriesEnteredFilter(e.value);
                    }}
                  />
                </th>
                <th>Total Marks</th>
              </tr>
              {!categoryBasedMarksEntered ? (
                 
                <Loader />
              ) : (
                categoryBasedMarksEntered.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.instituteName}</td>
                      <td>{item.instituteShortName}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.total}</td>
                    </tr>
                  );
                })
              )}
            </Data_table>
          </div>
        </div>
        <div style={{ width: "fit-content" }}>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>Published Status </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            id={"published_status"}
            style={{ width: "100%", height: "fit-content" }}
          >
            <Data_table heads={statusHeads} data={publishedStatus}
            excelTitle={'Published Status'}
            >
              {publishedStatus &&
                publishedStatus.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.sessionName}</td>
                      <td>{item.totalProgramPublished}</td>
                    </tr>
                  );
                })}
            </Data_table>
          </div>
        </div>
        <div style={{ width: "fit-content", marginBottom: "50px" }}>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>Entered Status </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "fit-content" }}
          >
            <Data_table heads={enteredHeads} data={enteredStatus} 
            excelTitle={'Entered Status'}
            id={"entered_status"}>
            
              {enteredStatus &&
                enteredStatus.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.sessionName}</td>
                      <td>{item.totalProgramPublished}</td>
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

export default Dashboard;

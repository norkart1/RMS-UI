import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Select from "react-select";
import Portal_Layout from '../../components/portal/portal_Layout'
import baseApi from "../../api/baseApi";
import Data_table from '../../components/portal/data_table';
import { apiDelete, apiPost } from '../../helpers/functions';
import styles from "../../styles/control/scoreboard.module.css";
import Loader from '../../components/loader';


function PublishFinalResult() {
  const [categories, setCategories] = useState([])
  const [programs, setPrograms] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [loading, setLoading] = useState(false)
   const [pro, setPro] = useState(null)

  useEffect(() => {
    baseApi
      .get(`/user/categories?session_id=${localStorage.getItem("sessionID")}`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);

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
    setLoading(true);
    baseApi.get(`/user/final-result/programs`).then((res) => {
      setPrograms(
        res.data.data.filter((program) => program.categoryID === catID)
      );
    }).finally(() => setLoading(false));
  }
   const handlePublish = (programCode, process) => {
     if (process == "publish") {
       apiPost(
         `/user/final-result/private-publish/${programCode}`,
         { null: null },
         false,
         () => {
           loadPrograms(selectedCategoryId);
         }
       );
     } else if (process == "unPublish") {
       apiDelete(
         `/user/final-result/publish/`,
         programCode,
         false,
         false,
         () => {
           loadPrograms(selectedCategoryId);
         }
       );
     }
   };
  const handleAnnounce = (programCode, process) => {
    if (process == 'publish') {
      apiPost(
        `/user/final-result/publish/${programCode}`,
        { null: null },
        false,
        () => {
          loadPrograms(selectedCategoryId);
        }
      );
    }
    else if (process == 'unPublish') {
      apiDelete(
        `/user/final-result/publish/`,
        programCode,
        false,
        false,
        () => {
          loadPrograms(selectedCategoryId);
        }
      );
    }
  }
  const twoStatus = [
    { label: "Published", value: "Published" },
    { label: "Enterd", value: "Entered" },
    { label: "Not Entered", value: "NotEntered" },
  ];
  const filterStatus = (e) => {
     baseApi.get(`/user/final-result/programs`).then((res) => {

   let data = res.data.data.filter((program) => program.categoryID === selectedCategoryId)


    switch (e.value) {
      case "Published":
        setPrograms(
          data.filter((program) => program.finalResultPublished == "True")
        );
        break;
      case "Entered":
        setPrograms(
           data.filter(
            (program) => program.finalResultEntered == "True"
          )
        );
        break;
      case "NotEntered":
        setPrograms(
           data.filter(
            (program) => program.finalResultEntered == "False" || program.finalResultEntered == null
          )
        );
        break;
      default:
        break;
    }
  });
    
     
     
  }

  
     
  const heads = ["Si No.", "Program Code", "Program Name", "Status", "Plublish", "Announce"];
  return (
    <Portal_Layout activeTabName="Publish Result" userType="controller">
      <h1>Publish Final Result</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div className={styles.selects} style={{ width: "100%" }}>
          <Select
            options={categoriesOpts}
            onChange={(e) => handleCatChange(e)}
            placeholder="Select Category"
          />
        </div>
      </div>
      <div data-theme="table" style={{ marginTop: "1rem" }}>
        <Data_table
          id="institutesTable"
          // heads={heads}
          style={{ width: "100%" }}
          excelTitle="Publish Final Result"
          headRow={true}
        >
          <tr>
            <th>Si No.</th>
            <th style={{ width: "" }}>Program Code</th>
            <th>Program Name</th>
            <th>
              {" "}
              <Select
                options={twoStatus}
                onChange={(e) =>  filterStatus(e)}
                placeholder="Status" 
                className={styles.headFilter}
                
              />
            </th>
            <th>Publish</th>
            <th>Announce</th>
          </tr>

          {!programs ?( <div
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
            ) : loading ? (
               
              <Loader/>
            ) :

          programs.map((item, index) => {
            let siNo = index + 1;
            return (
              <tr key={index}>
                <td style={{ width: "1rem" }}>{siNo}</td>
                <td style={{ width: "8rem" }}>{item.programCode}</td>
                <td style={{ width: "auto", fontWeight: "bold" }}>
                  {item.name}
                </td>
                <td style={{ width: "15rem", fontWeight: "bold" }}>
                  {item.finalResultPublished == "False" ||
                  item.finalResultPublished == null ? (
                    item.finalResultEntered == "True" ? (
                      <p style={{ color: "blue" }}>Mark added</p>
                    ) : (
                      <p style={{ color: "darkred" }}>
                        Mark entry not completed
                      </p>
                    )
                  ) : (
                    <p style={{ color: "darkgreen" }}>
                      Result <br /> published
                    </p>
                  )}
                </td>
                <td style={{ width: "10rem" }}>
                  {item.privatePublished == "True" ? (
                    <button
                      data-theme="delete"
                      style={{ padding: "1rem", borderRadius: "8px" }}
                      onClick={() =>
                        handlePublish(item.programCode, "unPublish")
                      }
                    >
                      UNPUBLISH
                    </button>
                  ) : (
                    <button
                      data-theme="submit"
                      onClick={() => handlePublish(item.programCode, "publish")}
                    >
                      PUBLISH
                    </button>
                  )}
                </td>
                <td style={{ width: "10rem" }}>
                  {item.finalResultPublished == "True" ? (
                    <button
                      data-theme="delete"
                      style={{ padding: "1rem", borderRadius: "8px" }}
                      onClick={() =>
                        handleAnnounce(item.programCode, "unPublish")
                      }
                    >
                      ANNOUNCED
                    </button>
                  ) : (
                    <button
                      data-theme="submit"
                      onClick={() =>
                        handleAnnounce(item.programCode, "publish")
                      }
                    >
                      ANNOUNCE
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </Data_table>
      </div>
    </Portal_Layout>
  );
}

export default PublishFinalResult

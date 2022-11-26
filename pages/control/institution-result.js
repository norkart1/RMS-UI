import React from "react";
import Portal_Layout from "../../components/portal/portal_Layout";
import { downloadExcel, useGet } from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/image";
import styles from "../../styles/control/result.module.css";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";

function Dashboard() {
  const [publishedMarks, setPublishedMarks] = useState([]);
  const [enteredMarks, setEnteredMarks] = useState([]);

  const [publishedStatus, setPublishedStatus] = useState( []);
  const [enteredStatus, setEnteredStatus] = useState( []);

  let userDetails;
  userDetails = useGet("/user/me", false, false, false, (err) => {}, false)[0];

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
    getPulishedMarks();
    getEnteredMarks();
    getPublishedStatus();
    getEnterdedStatus();
  }, []);

  const heads = ["SI No", "Institution", "Total Marks"];
  const statusHeads = ["SI No", "Category", "Sesstion", "published"];
  const enteredHeads = ["SI No", "Category", "Sesstion", "Entered"];

  return (
    <Portal_Layout activeTabName="Institutions Result" userType="controller">
      <h1>Final Result</h1>

      {/* <div className={styles.resultPage}> */}
      {/* two table in row */}

      <div className={styles.container}>
        <div style={{ width: "fit-content" }}>
          <h2>Published Result</h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table heads={heads} data={publishedMarks}>
              {publishedMarks &&
                publishedMarks.map((mark, index) => {
                  return (
                    <tr>
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
          <h2>Entered Marks</h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table heads={heads} data={enteredMarks}>
              {enteredMarks &&
                enteredMarks.map((mark, index) => {
                  return (
                    <tr>
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
          <h2>Published Status </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table heads={statusHeads} data={publishedStatus}>
              {publishedStatus &&
                publishedStatus.map((item, index) => {
                  return (
                    <tr>
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
        <div style={{ width: "fit-content" }}>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>Entered Status </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table heads={enteredHeads} data={enteredStatus}>
              {enteredStatus &&
                enteredStatus.map((item, index) => {
                  return (
                    <tr>
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

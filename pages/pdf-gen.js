import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/pdf.module.css";

import baseApi from "../api/baseApi";

export default function Pdfgen() {
  const [programData, setProgramData] = useState();
  useEffect(() => {
    result();
  }, []);
  const result = async () => {
    await baseApi
      .get(
        `user/final-result/program/pp/${localStorage.getItem("toPrintCode")}`
      )
      .then((res) => {
        setProgramData(res.data.data);
      });
  };

  const savePDF = async () => {
    baseApi
      .get("/pdf", {
        responseType: "arraybuffer",

        headers: {
          Accept: "application/pdf",
        },
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "program.pdf";
        link.click();
      });
  };

  return (
    <>
      <h1 className={styles.heading}>
        {programData && programData[0]?.programName}
      </h1>
      <h2 className={styles.heading2}>
        {programData && programData[0]?.programCode}
      </h2>
      <table className={styles.styledtable}>
        <thead>
          <tr>
            <th>SL.no</th>

            <th>Chest No</th>
            <th>Candidate Name</th>
            <th>Institute short Name</th>
            <th>Institute Name</th>
            <th>Position</th>
            <th>Grade</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {programData &&
            programData?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>

                  <td>{item.chestNO}</td>
                  <td>{item.candidate.name}</td>
                  <td>{item.institute.shortName}</td>
                  <td>{item.institute.name}</td>
                  <td>{item.position}</td>
                  <td>{item.grade}</td>
                  <td>{item.point}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button onClick={savePDF}>print</button>
    </>
  );
}

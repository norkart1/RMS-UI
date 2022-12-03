import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/pdf.module.css";

import baseApi from "../api/baseApi";
import { style } from "@mui/system";

export default function Pdfgen() {
    const [programData, setProgramData] = useState();
    useEffect(() => {
        result()
    }, [])
  const result =()=>{

      baseApi
       .get(`user/final-result/program/pp/${localStorage.getItem("toPrintCode")}`)
       .then((res) => {
         setProgramData(res.data.data);
       });
    } 
    const savePDF = async() => {
        baseApi.get('/pdf', {
            responseType: 'arraybuffer',
            // baseURL: 'http://localhost:3003',
            headers: {
                'Accept': 'application/pdf'
            }

        }).then((res) => {
          
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${localStorage.getItem("toPrintCode")}.pdf`;
            link.click();
        })
    }

  return (
<>
<div >
    <img className={styles.logo} src="/assets/images/logo.png" alt="logo" />
</div>
<h1 className={styles.heading}>Program Result</h1>
<div className={styles.tablediv}>
<h2 className={styles.heading2}>
    Program Name: { programData && programData[0]?.programName}<br/>
    Program Code: { programData && programData[0]?.programCode}<br/>
</h2>
<table className={styles.styledtable}>
    <thead>
    {/* <tr>Program</tr>
    <tr>{programData && programData[0].programName}</tr>
    <tr>Code</tr>
<tr>{programData && programData[0].code}</tr> */}
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
        
        {/* <!-- and so on... --> */}
    </tbody>
</table>
            </div>
<button onClick={savePDF}>print</button>
            </>
  );
}

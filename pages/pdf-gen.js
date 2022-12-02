import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import styles from "../styles/pdf.module.css"

import baseApi from "../api/baseApi";

export default function Pdfgen() {
    const [programData, setProgramData] = useState();
    useEffect(() => {
        result()
    }, [])
  const result =async()=>{

     await baseApi.get("user/final-result/program/K8").then((res) => {
          setProgramData(res.data.data);
        });
    } 
    console.log(programData && programData[0].programName);
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
            link.download = 'program.pdf';
            link.click();
        })
    }

  return (
<>
<h1 className={styles.heading}>{ programData && programData[0]?.programName}</h1>
<h2 className={styles.heading2}>{ programData && programData[0]?.programCode}</h2>
<table className={styles.styledtable}>
    <thead>
    {/* <tr>Program</tr>
    <tr>{programData && programData[0].programName}</tr>
    <tr>Code</tr>
    <tr>{programData && programData[0].code}</tr> */}
        <tr>
            <th>SL.no</th>
            {/* <th>Program Code</th> */}
            {/* <th>Program Name</th> */}
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
        {/* <tr>
            <td>1</td>
            <td>BW11</td>
            <td>Poem Writng</td>
            <td>2001</td>
            <td>Student 1</td>
            <td>IUAC-TANUR</td>
            <td>Ishlahul Uloom</td>
            <td>1st</td>
            <td>A</td>
            <td>8</td>
            </tr>
        */}
            {programData&& programData?.map((item,index) => {
                return (
                    <tr>
                        <td>{index+1}</td>
                        {/* <td>{item.programCode}</td> */}
                        {/* <td>{item.programName}</td> */}
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
<button onClick={savePDF}>print</button>
            </>
  );
}
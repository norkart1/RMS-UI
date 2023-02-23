import Portal_Layout from "../../components/portal/portal_Layout";
import {
  apiPost,
  uniqueInstitute,
  substractArrays,
  useGet,
  onKeyDown,
} from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/image";
import styles from "../../styles/control/scoreboard.module.css";
import Input from "../../components/portal/inputTheme";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";
import Select from "react-select";
import { useRouter } from "next/router";
import { jsPDF } from "jspdf";
require("jspdf-autotable");


function Dashboard() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [cadidates, setCadidates] = useState([]);
 

  const [programCode, setProgramCode] = useState("");
  const [programName, setProgramName] = useState("");


  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  let userDetails;
  userDetails = useGet("/user/me", false, false, false, (err) => {}, false)[0];

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
  const getPrograms = (catID) => {
    baseApi.get(`/user/final-result/programs`).then((res) => {
      if (catID)
        setPrograms(res.data.data.filter((item) => item.categoryID == catID));
      else setPrograms(res.data.data);
    });
  };

 

  const getCandidates = async (code) => {
    localStorage.setItem("program-code", code);
    setIsLoading(true);
    setProgramCode(code);

    baseApi.get(`/user/final-result/candidates/${code}`).then((res) => {
      setCadidates(res.data.data);
      setIsLoading(false);
    });
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

  const heads = ["SI No", "Chest No", "", "Total Marks",  ];
  return (
    <Portal_Layout activeTabName="Print judge form" userType="controller">
      <h1>Print For Judge</h1>
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
          onChange={(e) =>
            getCandidates(e.value) &
            setProgramName(e.label) &
            localStorage.setItem("program-code", e.value)
          }
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
            style={{ width: "fit-content", height: "70vh" }}
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
                <h2>PLEASE SELECT A PROGRAM TO SHOW CANDIDATES</h2>{" "}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "50rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button onClick={()=> printForJudge(cadidates)}>Print For Judge</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default Dashboard;

const printForJudge = (cadidates) => {
  const doc = new jsPDF("p", "cm", "a4");
  
   doc.addImage("/assets/images/logo.png", "PNG", 8, 1, 5, 5);
  doc.text(5, 5, "JUDGE FORM");
  doc.setFontSize(15);
  doc.text(6, 6, "Program Code: " + localStorage.getItem("program-code"));
  doc.text(7, 7, "Program Name: " + localStorage.getItem("program-name"));
  
   
  doc.autoTable({
    styles: {
      fontSize: 9,
      cellPadding: 14,
      halign: "center",
    },
    head: [["SI No", "Chest No", "Total Marks"]],
    body: cadidates.map((candidate, index) => [
      index + 1,
      candidate.chestNO,

      candidate.totalMarks,
    ]),
    startY: 10,
    theme: "grid",
  });
  doc.save("judge-form.pdf");
   
}
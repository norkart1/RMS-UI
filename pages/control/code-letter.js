import Portal_Layout from "../../components/portal/portal_Layout";
import {
  apiPost,
  uniqueInstitute,
  substractArrays,
  useGet,
  onKeyDown,
} from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/legacy/image";
import styles from "../../styles/control/scoreboard.module.css";
import Input from "../../components/portal/inputTheme";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";
import Select from "react-select";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const [programs, setPrograms] = useState([]);
  const [cadidates, setCadidates] = useState([]);

  const [chestNO, setChestNO] = useState("");
  const [Name, setName] = useState("");

  const [programCode, setProgramCode] = useState("");
  const [programName, setProgramName] = useState("");

  const [codeLetter, setCodeLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const clearForm = () => {
    setChestNO("");
    setName("");
    setCodeLetter("");
  };

  const getCandidates = async (code) => {
    localStorage.setItem("program-code", code);
    setIsLoading(true);
    setProgramCode(code);

    baseApi.get(`/user/final-result/candidateschest/${code}`).then((res) => {
      setCadidates(res.data.data);
      setIsLoading(false);
    });
  };

  const toAddCodeLetter = async (item, e) => {
    const row = e.target.parentElement;
    setName(item.candidate.name);
    setChestNO(item.chestNO);
    setSelectedRow(row);
  };

  const handleRowSubmit = (e) => {
    e.preventDefault();
    const row = e.target.parentElement.parentElement;
    let data = {
      // cp_id: cadidate.id,
      chestNO: row.cells[1].innerText,
      programCode: programCode,
      codeLetter: row.cells[3].children[0].value,
    };
    setIsSubmitting(true);
    apiPost(
      "/user/final-result/candidate/codeletter",
      data,
      false,
      false,
      false,
      () => {
        setIsSubmitting(false);
      }
    );
  };
  const codeLetterSubmitted = () => {
    apiPost(
      `user/final-result/submitCodeLetter/${programCode}`,
      {},
      false,
      () => {
        router.push("/control/final-mark-entry");
      },
      false,
      () => {
        setIsSubmitting(false);
      }
    );
  };

  const submitAll = async (e) => {
    e.preventDefault();
    let cadidatesLength = cadidates.length;
    setIsSubmitting(true);

    for (let i = 1; i <= cadidatesLength; i++) {
      // loop through all rows
      let row = document.getElementById("candidatesTable").rows[i];
      let data = {
        chestNO: row.cells[1].innerText,
        programCode: programCode,
        codeLetter: row.cells[3].children[0].value,
      };
      apiPost(
        "/user/final-result/candidate/codeletter",
        data,
        false,
        false,
        false,
        false,
        i == cadidatesLength
      );
      i == cadidatesLength ? codeLetterSubmitted() : null;
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

  const heads = ["SI No", "Chest No", "Name", "Code Letter"];
  return (
    <Portal_Layout activeTabName="Add Code Letter" userType="controller">
      <h1>Add Code Letters</h1>
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
                <h2>PLEASE SELECT A PROGRAM TO SHOW CANDIDATES</h2>{" "}
              </div>
            ) : isLoading ? (
              <div
                div
                style={{
                  width: "100%",
                  height: "50rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <img src="/assets/gif/loading.gif" alt="" width={"10%"} />{" "}
              </div>
            ) : (
              <div>
                <Data_table
                  cadidates={cadidates}
                  heads={heads}
                  style={{ width: "100%" }}
                  id="candidatesTable"
                >
                  {cadidates.map((item, index) => {
                    return (
                      <tr
                        style={{ width: "100%" }}
                        className={styles.rows}
                        key={index}
                        onClick={(e) => {
                          toAddCodeLetter(item, e);
                        }}
                      >
                        <td style={{ width: "5rem" }}>{index + 1}</td>
                        <td style={{ width: "5rem" }}>{item.chestNO}</td>
                        <td style={{ width: "fit-content" }}>
                          {item.candidate.name}
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
                              onKeyDown(e, 3, index);
                            }}
                            defaultValue={item.codeLetter}
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
                      submitAll(e);
                    }}
                    style={{
                      padding: "1rem",
                      width: "fit-content",
                    }}
                    data-theme="submit"
                  >
                    Submit
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

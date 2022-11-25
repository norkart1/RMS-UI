import React from "react";
import Portal_Layout from "../../components/portal/portal_Layout";
import {
  apiDelete,
  apiPost,
  convertLongPosToShort,
  downloadExcel,
  formatDate,
  useGet,
} from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/image";
import styles from "../../styles/control/scoreboard.module.css";
import Input from "../../components/portal/inputTheme";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";
import Select from "react-select";
import { createRef } from "react";
import { useRouter } from "next/router";

function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [markedCadidates, setMardedCadidates] = useState([]);
  const [cadidates, setCadidates] = useState([]);
  const [position, setPosition] = useState("");

  const [programCode, setProgramCode] = useState("");
  const [seletedcadidates, setSeletedcadidates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState({});

  const programSelctRef = createRef();
  const router = useRouter();

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
    const prCodeFromLocalStorage = localStorage.getItem("program-code");
    setProgramCode(prCodeFromLocalStorage);
    getMarkedCandidates(prCodeFromLocalStorage);
  }, [router]);

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
    code && localStorage.setItem("program-code", code);
    setProgramCode(code);

    baseApi.get(`/user/final-result/marks/programs/${code}`).then((res) => {
      setMardedCadidates(res.data.data);
    });
  };

  const deletePosition = (id) => {
    apiDelete(`/user/final-result/`, id, false, false, () => {
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
  const completeMarking = (id) => {
    apiPost(`/user/final-result/submit/${id}`);
  };

  const incompleteMarking = (id) => {
    apiDelete(`/user/final-result/submit/${id}`);
  };

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
      program,
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
    "Position",
    "Grade",
    "Point",
    "Action",
  ];
  // const heads2 = ['SI No', 'Chest No', 'Name', 'Action']
  const handlePositionClick = (pos, candProId) => {
    setPosition(pos);
    addPosition(candProId);
  };
  // get selected program id
  let selectedProgramId = programs.find(
    (program) => program.programCode == localStorage.getItem("program-code")
  )?.id;

  console.log(
    programs.find(
      (program) => program.programCode == localStorage.getItem("program-code")
    )
  );

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
          ref={programSelctRef}
          options={array}
          onChange={(e) => {
            getMarkedCandidates(e.value);
            setSelectedProgram(e.program);
          }}
          placeholder="Search and Select Program"
        />
      </div>
      {/* <div className={styles.resultPage}> */}

      <div className={styles.selection}>
        <div>
          {/* <h2>Set Positions for {selectedProgram?.name} - {selectedProgram?.programCode}</h2> */}
          <h2>
            Set Positions for{" "}
            {
              programs.find(
                (program) =>
                  program.programCode == localStorage.getItem("program-code")
              )?.name
            }{" "}
            -{" "}
            {
              programs.find(
                (program) =>
                  program.programCode == localStorage.getItem("program-code")
              )?.programCode
            }
          </h2>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "75vh" }}
          >
            <Data_table
              id="markedCadidates"
              heads={heads}
              style={{ minWidth: markedCadidates.length == 0 ? "85vw" : "" }}
              excelTitle={`${programCode} ${
                selectedProgram?.name
              } - ${formatDate(Date.now(), false, true)}`}
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
                      <td
                        style={{
                          width: "fit-content",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {item.totalPoint}
                      </td>
                      <td
                        style={{ width: "auto", display: "flex", gap: "1rem" }}
                      >
                        <button
                          onClick={() =>
                            item.candidateProgram.position == "First"
                              ? deletePosition(item.candidateProgram.id)
                              : addPosition("First", item.candidateProgram.id)
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
                              : addPosition("Second", item.candidateProgram.id)
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
                              : addPosition("Third", item.candidateProgram.id)
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

                      <td
                        style={{
                          width: "fit-content",
                          textAlign: "center",
                          fontSize: "1.7rem",
                          fontWeight: "bold",
                          color:
                            item.candidateProgram.position == "First"
                              ? "#d89f00"
                              : item.candidateProgram.position == "Second"
                              ? "#afafaf"
                              : item.candidateProgram.position == "Third"
                              ? "rgb(102 38 38 / 28%)"
                              : "black",
                        }}
                      >
                        {convertLongPosToShort(item.candidateProgram.position)}
                      </td>
                      <td
                        style={{
                          width: "fit-content",
                          textAlign: "center",
                          fontSize: "1.7rem",
                          fontWeight: "bold",
                        }}
                      >
                        {item.candidateProgram.grade}
                      </td>
                      <td
                        style={{
                          width: "fit-content",
                          textAlign: "center",
                          fontSize: "1.7rem",
                          fontWeight: "bold",
                        }}
                      >
                        {item.candidateProgram.point}
                      </td>
                      <td style={{ width: "fit-content" }}>
                        <button
                          onClick={() => deleteMarks(item.id)}
                          style={{ padding: "1rem" }}
                          data-theme="delete"
                        >
                          Delete
                        </button>
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
                data-theme="submit"
                style={{
                  padding: "1rem",
                  width: "fit-content",
                }}
                onClick={() => completeMarking(selectedProgramId)}
              >
                Completed
              </button>
              <button
                data-theme="delete"
                style={{
                  padding: "1rem",

                  alignSelf: "flex-end",
                }}
                onClick={() => incompleteMarking(selectedProgramId)}
              >
                Incomplete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default Dashboard;

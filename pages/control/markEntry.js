import Portal_Layout from "../../components/portal/portal_Layout";
import { apiPost, substractArrays, useGet } from "../../helpers/functions";
import baseApi from "../../api/baseApi";
import Image from "next/image";
import styles from "../../styles/control/scoreboard.module.css";
import Input from "../../components/portal/inputTheme";
import { useEffect, useState } from "react";
import Data_table from "../../components/portal/data_table";
import Select from "react-select";

function Dashboard() {
  const [programs, setPrograms] = useState([]);
  const [cadidates, setCadidates] = useState([]);

  const [chestNO, setChestNO] = useState("");
  const [Name, setName] = useState("");

  const [programCode, setProgramCode] = useState("");

  const [pointOne, setPointOne] = useState("");
  const [pointTwo, setPointTwo] = useState("");
  const [pointThree, setPointThree] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [markedCadidates, setMardedCadidates] = useState([]);

  let userDetails;
  userDetails = useGet("/user/me", false, false, false, (err) => { }, false)[0];
  let categories = [];
  categories = useGet(`/user/categories/`, true)[0];
  // console.log(categories)

  useEffect(() => {
    baseApi.get(`/user/elimination-result/`).then((res) => {
      setPrograms(res.data.data);
    });
  }, []);

  useEffect(() => {
    baseApi
      .get(`/user/elimination-result/points/${programCode}`)
      .then((res) => {
        setMardedCadidates(res.data.data);
      });
  }, [programCode]);

  const getMarkedCandidates = (code) => {
    baseApi.get(`/user/elimination-result/points/${code}`).then((res) => {
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
    setProgramCode(code);
    let totalCandidates;
    let markedCadidates;
    baseApi.get(`/user/elimination-result/candidates/${code}`).then((res) => {
      totalCandidates = res.data.data;
      baseApi.get(`/user/elimination-result/points/${code}`).then((res) => {
        markedCadidates = res.data.data
        // console.log('markedCadidates',markedCadidates)
      })
        .then(async () => {
          // console.log('totalCandidates',totalCandidates)
          const filteredCandidates = await substractArrays(totalCandidates, markedCadidates, 'chestNO');
          // console.log(filteredCandidates)
          setCadidates(filteredCandidates);
        })
    });
    // substractArrays(cadidates, markedCadidates)
  };
  const tomarkUpload = async (cadidate, e) => {
    const row = e.target.parentElement;
    // console.log(row);
    setName(cadidate.name);
    setChestNO(cadidate.chestNO);
    setSelectedRow(row);
  };

  const handleRowSubmit = (e) => {
    e.preventDefault();
    const row = e.target.parentElement.parentElement;
    console.log(row.cells[4].children[0].value);
    let data = {
      // cp_id: cadidate.id,
      chestNO: row.cells[1].innerText,
      programCode: programCode,
      pointOne: parseFloat(row.cells[3].children[0].value),
      pointTwo: parseFloat(row.cells[4].children[0].value),
      pointThree: parseFloat(row.cells[5].children[0].value),
    };
    console.log(data);
    // console.log(data)
    setIsSubmitting(true);
    apiPost(
      "/user/elimination-result/",
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

  let array = [];
  programs?.map((program) => {
    array.push({
      value: program.programCode,
      label: program.programCode + " " + program.name,
    });
  });

  const heads = [
    "SI No",
    "Ches No",
    "Name",
    "Point_1",
    "Point_2",
    "Point_3",
    "Total_Point",
    "",
  ];

  return (
    <Portal_Layout activeTabName="Mark Entry" userType="controller">
      <h1>Elimination Result</h1>
      <span data-theme="hr"></span>

      <Select options={array} onChange={(e) => getCandidates(e.value)} />

      <div className={styles.resultPage}>
        <div className={styles.markUpload}>
        </div>
        <div style={{ width: "100%" }}>
          <span style={{}}>
            <h2>Cadidates</h2>
          </span>
          <div
            data-theme="table"
            className={styles.candidatesTable}
            style={{ width: "100%", height: "70vh" }}
          >
            <Data_table
              cadidates={cadidates}
              heads={heads}
              style={{ width: "100%" }}
            >
              {cadidates &&
                cadidates?.map((cadidate, index) => {
                  return (
                    <tr
                      style={{ width: "100%" }}
                      key={index}
                      onClick={(e) => {
                        tomarkUpload(cadidate, e);
                      }}
                    >
                      <td style={{ width: "5rem" }}>{index + 1}</td>
                      <td style={{ width: "5rem" }}>{cadidate.chestNO}</td>
                      <td style={{ width: "fit-content" }}>{cadidate.name}</td>
                      <td style={{ width: "10rem" }}><input style={{ fontSize: "2rem" }} type="number"></input></td>
                      <td style={{ width: "10rem" }}><input style={{ fontSize: "2rem" }} type="number"></input></td>
                      <td style={{ width: "10rem" }}><input style={{ fontSize: "2rem" }} type="number"></input></td>
                      <td style={{ width: "20rem" }}>
                        <button
                          onClick={(e) => handleRowSubmit(e)}
                          data-theme="submit"
                        >
                          Submit
                        </button>
                      </td>
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

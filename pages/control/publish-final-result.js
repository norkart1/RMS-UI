import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import Portal_Layout from "../../components/portal/portal_Layout";
import baseApi from "../../api/baseApi";
import Data_table from "../../components/portal/data_table";
import { apiDelete, apiPost } from "../../helpers/functions";
import styles from "../../styles/control/scoreboard.module.css";
import Loader from "../../components/loader";

function PublishFinalResult() {
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  //  announced count, published count, markadded count , marknotadded count
  const [filterValue, setFilterValue] = useState();
  const [announcedCount, setAnnouncedCount] = useState();
  const [publishedCount, setPublishedCount] = useState();
  const [markAddedCount, setMarkAddedCount] = useState();
  const [codeleterAdded, setCodeletterAdded] = useState();
  const [totalcount, setTotalcount] = useState();
  const [totalPramams, setTotalParams] = useState();

  useEffect(() => {
    baseApi
      .get(`/user/categories?session_id=${localStorage.getItem("sessionID")}`)
      .then((res) => {
        setCategories(res.data.data);
      });
    loadPrograms();
    //  filterValue && filterStatus(filterValue)
  }, []);

  let categoriesOpts = [];
  categories?.map((cat) => {
    categoriesOpts.push({
      value: cat.id,
      label: cat.name,
    });
  });
  categoriesOpts.push({
    value: null,
    label: "All",
  });
  let programsOpts = [];
  totalPramams?.map((prog) => {
    programsOpts.push({
      value: prog.programCode,
      label: prog.programCode + " " + prog.name,
    });
  });

  const handleCatChange = (e) => {
    setSelectedCategoryId(e.value);
    loadPrograms(e.value);
  };
  const loadPrograms = (catID) => {
    setLoading(true);

    baseApi
      .get(
        `/user/final-result/programs?sessionID=${localStorage.getItem(
          "sessionID"
        )}`
      )
      .then((res) => {
        filterStatus(filterValue);

        catID
          ? setPrograms(res.data.data.filter((p) => p.categoryID == catID))
          : setPrograms(res.data.data);

        setTotalcount(res.data.data.length);
        setTotalParams(res.data.data);

        setAnnouncedCount(
          res.data.data.filter(
            (program) => program.finalResultPublished == "True"
          ).length
        ),
          setPublishedCount(
            res.data.data.filter(
              (program) => program.privatePublished == "True"
            ).length
          ),
          setMarkAddedCount(
            res.data.data.filter(
              (program) => program.finalResultEntered == "True"
            ).length
          ),
          setCodeletterAdded(
            res.data.data.filter(
              (program) => program.codeLetterSubmitted == "True"
            ).length
          );
      });
    setLoading(false);
  };
  const ppddff = () => {
    console.log("ppddff");
    baseApi
      .get("/pdf", {
        responseType: "arraybuffer",
        // baseURL: 'http://localhost:3003',
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

  const handlePublish = (programCode, process) => {
    if (process == "publish") {
      localStorage.setItem("toPrintCode", programCode);
      apiPost(
        `/user/final-result/private-publish/${programCode}`,
        { null: null },
        false,
        () => {
          loadPrograms(selectedCategoryId);
        },
        false,
        () => {
          ppddff();
        }
      );
    } else if (process == "unPublish") {
      apiDelete(
        `/user/final-result/private-publish/`,
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
    if (process == "publish") {
      apiPost(
        `/user/final-result/publish/${programCode}`,
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
  const twoStatus = [
    { label: "Announced", value: "Announced" },
    { label: "Published", value: "Published" },
    { label: "Postion added", value: "Entered" },
    { label: "Code added", value: "Coded" },
    { label: "Not Entered", value: "NotEntered" },
  ];
  const filterStatus = (e) => {
    setFilterValue(e);

    baseApi.get(`/user/final-result/programs`).then((res) => {
      let data = res.data.data;
      selectedCategoryId
        ? (data = data.filter((p) => p.categoryID == selectedCategoryId))
        : data;

      switch (e?.value) {
        case "Announced":
          setPrograms(
            data.filter((program) => program.finalResultPublished == "True")
          );
          break;
        case "Published":
          setPrograms(
            data.filter((program) => program.privatePublished == "True")
          );
          break;
        case "Entered":
          setPrograms(
            data.filter((program) => program.finalResultEntered == "True")
          );
          break;
        case "Coded":
          setPrograms(
            data.filter((program) => program.codeLetterSubmitted == "True")
          );
          break;
        case "NotEntered":
          setPrograms(
            data.filter(
              (program) =>
                program.finalResultEntered == "False" ||
                program.finalResultEntered == null
            )
          );
          break;
        default:
          break;
      }
    });
  };
  const searchProgram = (e) => {
    baseApi.get(`/user/final-result/programs`).then((res) => {
      let data = res.data.data;
      selectedCategoryId
        ? (data = data.filter((p) => p.categoryID == selectedCategoryId))
        : data;
      data = data.filter((p) =>
        p.programCode.toLowerCase().includes(e.value.toLowerCase())
      );
      setPrograms(data);
    });
  };

  return (
    <Portal_Layout activeTabName="Publish Result" userType="controller">
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>
          <h1>Publish Final Result</h1>

          <Select
            options={categoriesOpts}
            onChange={(e) => handleCatChange(e)}
            placeholder="Select Category"
          />
        </div>

        <div style={{ marginLeft: "3rem" }}>
          <h3>Announced: {announcedCount} </h3>
          <h3>Published: {publishedCount} </h3>
        </div>
        <div style={{ marginLeft: "3rem" }}>
          <h3>Mark and Position Added: {markAddedCount} </h3>
          <h3>Code Letter Added: {codeleterAdded} </h3>
          <h3>Total Prgrams: {totalcount} </h3>
        </div>
        <div style={{ width: "30%", marginLeft: "auto" }}>
          <h1>Search Program</h1>

          <Select
            options={programsOpts}
            onChange={(e) => searchProgram(e)}
            placeholder="Search Program"
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
                onChange={(e) => filterStatus(e)}
                placeholder="Status"
                className={styles.headFilter}
              />
            </th>
            <th>Publish</th>
            <th>Announce</th>
          </tr>

          {!programs ? (
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
              <h2>PLEASE SELECT A CATEGORY </h2>{" "}
            </div>
          ) : loading ? (
            <Loader />
          ) : (
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
                    {item.finalResultPublished == "True" ? (
                      <p style={{ color: "green" }}>Announced</p>
                    ) : item.privatePublished == "True" ? (
                      <p style={{ color: "blue" }}>Published</p>
                    ) : item.finalResultEntered == "True" ? (
                      <p style={{ color: "darkred" }}>
                        Mark and Position Added
                      </p>
                    ) : item.codeLetterSubmitted == "True" ? (
                      <p style={{ color: "maroon" }}>Code Letter Added</p>
                    ) : (
                      <p style={{ color: "black" }}>Not Added Code</p>
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
                        onClick={() =>
                          handlePublish(item.programCode, "publish")
                        }
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
            })
          )}
        </Data_table>
      </div>
    </Portal_Layout>
  );
}

export default PublishFinalResult;

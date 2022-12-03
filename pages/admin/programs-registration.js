import React, { useEffect, useState } from "react";
import Input from "../../components/portal/inputTheme";
import Portal_Layout from "../../components/portal/portal_Layout";
import styles from "../../styles/portals/input_table.module.css";
import Data_table from "../../components/portal/data_table";
import EditIcon from "../../public/assets/svg/edit.svg";
import DeleteIcon from "../../public/assets/svg/delete.svg";
import baseApi from "../../api/baseApi";
import { toast } from "react-toastify";
import { apiPost, useGet } from "../../helpers/functions";
import Select from "react-select";

function ProgramRegistration() {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstiID, setSelectedInstiID] = useState([]);
  const [candidates, setCatidates] = useState([]);
  const [program, setProgram] = useState([]);

  const [isSubmitting, setSubmitting] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const getInstitutes = () => {
    baseApi.get(`admin/institutes?session_id=1`).then((res) => {
      setInstitutes(res.data.data);
    });
  };
  const getProgram = () => {
    baseApi.get(`admin/programs/203`).then((res) => {
      setProgram(res.data.data);
    });
  };
  const getCandidates = (instiID) => {
    baseApi.get(`admin/candidates/${instiID}`).then((res) => {
      setCatidates(res.data.data);
    });
  };

  useEffect(() => {
    getInstitutes();
    getProgram();
  }, []);

  console.log(candidates);

  let institutesOpts = [];
  institutes?.map((insti) => {
    institutesOpts.push({
      value: insti.id,
      label: insti.shortName,
    });
  });
  let candidatesOpts = [];
  candidates?.map((candidate) => {
    candidatesOpts.push({
      value: candidate.chestNO,
      label: candidate.chestNO +" "+ candidate.name,
    });
  });

  const selectInti = (e) => {
    console.log(e);
    setSelectedInstiID(e.value);
    getCandidates(e.value);  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = {
      institute_id: selectedInstiID,
      program_id: 203,
      candidates: candidatesOpts,
    };
    console.log(data);
    apiPost("admin/program-registration", data)
      .then((res) => {
        console.log(res);
        toast.success("Program Registration Successful");
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Program Registration Failed");
        setSubmitting(false);
      });
  };


  const heads = ["ds", "dsd"];

  return (
    <Portal_Layout
      activeTabName="programs"
      activeChildTabName="program registration"
      userType="admin"
    >
      <div className={styles.pageContainer}>
        <h1>Program Registration</h1>
        <span data-theme="hr"></span>
        <div className={styles.dataContainer}>
          <div className={styles.tables}>
            <div className={styles.table_header}>
              <h2>select institute -</h2>
              <Select
                options={institutesOpts}
                onChange={(e) => selectInti(e)}
              />

              <div className="flex-grow"></div>
              
            </div>
            <div className={styles.forms}>
              <h2>Assign candidates</h2>
              <div
                className={styles.formContainer}
                data-theme="formContainer"
                style={{ height: "70vh", width: "fit-content" }}
              >
                 
                <form action="#" style={{ display: "flex" }}>
                  
                  <Input
                    value={name}
                    handleOnChange={() => setName(e.target.value)}
                    label="Program name"
                    placeholder={"Program name"}
                    name="name"
                    isDisabled={true}
                    status="normal"
                  />
                 
                  <p>Candidates</p>
                  {Array.from({ length: 5 }, (x, i) => {
                    return (
                      <div style={{ marginTop: "1rem", width: "100%" }} key={i}>
                        <Select
                          
                          onChange={(index) => handleChange(index)}
                          options={candidatesOpts}
                          placeholder="Select candidate.."
                        />
                      </div>
                    );
                  })}

                  <div className={styles.formBtns} style={{ width: "100%" }}>
                    <button
                      data-theme="submit"
                      style={{
                        marginRight: "5%",
                        width: "fit-content",
                         
                      }}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div data-theme="table">
              {isLoading ? (
                <div style={{ width: "100%", height: "50rem" }}>
                  {" "}
                  <h2>Loading</h2>{" "}
                </div>
              ) : (
                <Data_table id="institutesTable" heads={heads}></Data_table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default ProgramRegistration;

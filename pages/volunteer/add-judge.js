import React, { useState } from "react";
import Input from "../../components/portal/inputTheme";
import Portal_Layout from "../../components/portal/portal_Layout";
import styles from "../../styles/media/news.module.css";
import baseApi from "../../api/baseApi";
import { useEffect } from "react";
import { apiPost } from "../../helpers/functions";
import Data_table from "../../components/portal/data_table";

function Dashboard() {
  const [activeTabName, setActiveTabName] = useState();
  const [activeChildTabName, setActiveChildTabName] = useState();
  // name , email, phone
  const [jedges, setJedges] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const loadJedges = async () => {
    baseApi.get("user/judges").then((res) => {
      setJedges(res?.data?.data);
    });
  };

  useEffect(() => {
    loadJedges();
  }, []);

  // clear all input fields
  const clearFields = () => {
     setName()
      setEmail("")
      setPhone("")
  };

  // post to api user/media/news
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      name: name,
      email: email,
      phoneNo: phone,
    };
   

    // post to api user/media/news
    apiPost("user/judges", postData, false, clearFields(),false,loadJedges);
  };
  //

  const deleteJudge = (id) => {
    baseApi.delete(`user/judges/${id}`).then((res) => {
      loadJedges();
    });
  };
  
 
const heads = ['Name', 'Email', 'Phone', 'Action']

  return (
    <Portal_Layout
      activeTabName="add-judge"
      activeChildTabName=""
      userType="volunteer"
    >
      <div>
        <h1>Add Judge</h1>
        <span data-theme="hr"></span>
      </div>
      <div className={styles.newsPage}>
        <div className={styles.forms}>
          <h2>Add Judge</h2>
          <div className={styles.form} data-theme="formContainer" style={{height:"45vh"}}>
            <form action="#" className={styles.newsadd}>
              <Input
                label="Name"
                type="text_area"
                textAreaRowCount="2"
                value={name}
                handleOnChange={({ target }) => setName(target?.value)}
              />
              <Input
                label="Email"
                type="text_area"
                textAreaRowCount="2"
                value={email}
                handleOnChange={({ target }) => setEmail(target?.value)}
              />

              <Input
                label="Phone"
                type="text_area"
                textAreaRowCount="2"
                value={phone}
                handleOnChange={({ target }) => setPhone(target?.value)}
              />

              <button data-theme="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* display news */}
        <div className={styles.news}>
          <h2>Judges</h2>
          <div className={styles.newsList}>
            {/* table */}
            <Data_table data={jedges}   heads={heads}/>

       

            {jedges?.map((item, index) => (
               
                  <tr key={index}>
                    <td style={{width:"8rem"}}>{item?.name}</td>
                    <td style={{width:"8rem"}}>{item?.email}</td>
                    <td style={{width:"8rem"}}>{item?.phone}</td>
                    <td>
                  

                      <button
                        data-theme="delete"
                        onClick={() => deleteJudge(item?.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                    
                      
                      ))}
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default Dashboard;

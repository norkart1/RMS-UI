import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/login.module.css";
import { Api } from "../../api/base_api";
import { useRouter } from "next/router";
import Head from "next/head";
import baseApi from "../../api/baseApi";
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default function Login() {
  
  const router = useRouter();
  const [error, setError] = useState({ isError: false, message: "" });
  const [message, setMessage] = useState('');
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [endPoint, setEndPoint] = useState('coordinator')
  useEffect(() => {
    document.getElementById('name').select(); // focusses user name on load

  }, []);
  async function submitForm(event) {
    event.preventDefault();
    const data = {
      userName: username,
      password: password,
    };

    const token = await baseApi({
      method: 'post',
      url: `/auth/${endPoint}/login`,
      data: data
    })
      .then( res =>res.data  )
        
      .catch(e => { setError({ isError: true, message: e.message }); return })
      
// console.log(token)
    if (token) {
      console.log(token.data)
      const decoded = jwt_decode(token.data.access_token);
      localStorage.setItem('token', token.data.access_token);
      localStorage.setItem('user', JSON.stringify(decoded));
      console.log(decoded)
      if(decoded?.role == 1){
        router.push('/admin')
      } else if(decoded){
      router.push('/portal/candidates')
      }
       
    }
    
   


     
  }
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.login}>
        <div className={styles.login_form}>
          <div className={styles.btnBack} onClick={() => router.back()}> &larr; Back</div>

          <Image src="/assets/images/logo_rounded.png" width={150} height={150} />

          <form >
            <h1>Login to Sibaq portal</h1>
            {/* change endPoint */}
            <select name="endPoint" id="endPoint" onChange={(e) => setEndPoint(e.target.value)}>
              <option value="coordinator">Coordinator</option>
              <option value="user">Admin</option>
            </select>
            <input
              type="text"
              className={styles.name}
              name="name"
              id="name"
              placeholder=" "
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className={styles.name_label} htmlFor="name">
              User Name
            </label>
            <input
              type="password"
              className={styles.password}
              name="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles.password_label} htmlFor="password">
              Password
            </label>
            <a href={'forgot-password'} className={styles.forgotarea}>
              <p className={styles.forgot}>Forgot Password?</p>
            </a>
            <div
              className={`${styles.error_show} ${error.isError ? styles.isError : ""}`}
            >
              <p>{error.message} </p>
            </div>

            <button type='' className={styles.login_btn}
            onClick={(event) => submitForm(event)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
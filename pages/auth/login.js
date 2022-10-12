import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/login.module.css";
import { Api } from "../../api/base_api";
import { Jwt } from "jsonwebtoken";

export default function Login() {
  const api = new Api();
  const [message, setMessage] = useState(''); 
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    document.getElementById('name').select(); // focusses user name on load
    // try {
    //   const sibaq_data = await api.post("sibaq-data", { sibaq_logo, sibaq_year });
    // } catch (error) {
    //   console.error(error);
    // }
  }, []);
  async function submitForm() {
    const res = await api.post("login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
    }).then(t => t.json())

    const token = res.token

    if (token) {
      localStorage.setItem('token', token)
      window.location.href = '/dashboard'
      
    } else {
      setMessage('Incorrect user name and / or password.')
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.login_form}>
        <Image src="/assets/logo.png" width={150} height={150} />

        <form >
          <h1>Login to Sibaq portal</h1>
          <input
            type="text"
            className={styles.name}
            name="name"
            id="name"
            placeholder=" "
            value={userName}
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
            className={`${styles.error_show} ${message  ? styles.isError : ""}`}
          >
            <p>{message} </p>
          </div>

          <button type='' className={styles.login_btn} onClick={submitForm}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

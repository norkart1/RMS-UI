import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/login.module.css";
import { Api } from "../../api/base_api";

export default function Login() {
  const api = new Api();
  const [isError, setIsError] = useState(false); //to be removed
  useEffect(() => {
    document.getElementById('name').select(); // focusses user name on load
    // try {
    //   const sibaq_data = await api.post("sibaq-data", { sibaq_logo, sibaq_year });
    // } catch (error) {
    //   console.error(error);
    // }
  }, []);
  async function login(event) {
    event.preventDefault();

    const username = event.target.name.value;
    const password = event.target.password.value;

    try {
      const data = await api.post("login", { username, password });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.login_form}>
        <Image src="/assets/logo.png" width={150} height={150} />

        <form onSubmit={login}>
          <h1>Login to Sibaq portal</h1>
          <input
            type="text"
            className={styles.name}
            name="name"
            id="name"
            placeholder=" "
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
          />
          <label className={styles.password_label} htmlFor="password">
            Password
          </label>
          <a href="#" className={styles.forgotarea}>
            <p className={styles.forgot}>Forgot Password?</p>
          </a>
          <div
            className={`${styles.error_show} ${isError ? styles.isError : ""}`}
          >
            <p>Incorrect user name and / or password. </p>
          </div>

          <button className={styles.login_btn} onClick={login}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

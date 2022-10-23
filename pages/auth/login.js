import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/login.module.css";
import { api } from "../../api/base_api";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState({ isError: false, message: "" });
  const [message, setMessage] = useState('');
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    document.getElementById('name').select(); // focusses user name on load

  }, []);
  async function submitForm(event) {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    const token = await axios({
      method: 'post',
      url: '/auth/login',
      baseURL: 'http://localhost:3001', data: data
    })
      .then(t => t.data)
      .catch(e => { setError({ isError: true, message: e.message }); return });

    localStorage.setItem('token', token);

    if (token) {
    } router.push("/dashboard");



    try {
      const tokens = await api.post('login', data);
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  }
  return (
    <div>
      <Head>
        <title>Sibaq Login</title>
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
    <div className={styles.login}>
      <div className={styles.login_form}>
        <div className={styles.btnBack} onClick={() => router.back()}> &larr; Back</div>

          <Image src="/assets/images/logo.png" width={150} height={150} alt="sibaq at 22 darul huda art fest" />

        <form >
          <h1>Login to Sibaq portal</h1>
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
          // onClick={(event) => submitForm(event)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

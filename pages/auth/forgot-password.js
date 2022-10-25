import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/login.module.css";

export default function ForgotPassword() {
  const [isError, setIsError] = useState(false); //to be removed
  useEffect(() => {
    document.getElementById('email').select(); // focusses user name on load
  }, []);
  async function login(event) {
    event.preventDefault();

    const username = event.target.name.value;
    const password = event.target.password.value;

    try {
      const data = await api.post("login", { username, password });
    } catch (error) {
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.login_form}>
        <Image src="/assets/logo.png" width={150} height={150} alt="sibaq 22 Logo" />

        <form onSubmit={login}>
          <h1>Reset  password</h1>
          <input
            type="email"
            className={styles.email}
            name="email"
            id="email"
            placeholder=" "
            required
          />
          <label className={styles.name_label} htmlFor="email">
            Email
          </label>
          <button className={styles.login_btn} onClick={login}>
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}

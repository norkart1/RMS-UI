import Image from "next/image"
import styles from '../styles/login.module.css'
import { Api } from "../api/base_api"

export default function Login() {
  const api = new Api();

  async function login(event) {
    event.preventDefault();

    const username = event.target.name.value;
    const password = event.target.password.value;

    try {
      const data = await api.post("login", { username, password })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.login_form}>
        <Image src="/assets/logo.png" width={200} height={100} />

        <form onSubmit={login}>
          <h1>Login</h1>

          <input type="text" name="name" id="name" placeholder="User Name" />
          <input type="text" name="password" id="password" placeholder="Password" />
          <button className={styles.login_btn}>Login</button>
        </form>
        <p className={styles.forgot}>Forgot <span>Password</span>?</p>
      </div>
    </div>
  )
}
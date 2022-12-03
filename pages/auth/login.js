import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import styles from "../../styles/login.module.css";
import { Api } from "../../api/base_api";
import { useRouter } from "next/router";
import Head from "next/head";
import baseApi from "../../api/baseApi";




export default function Login() {

  const router = useRouter();
  const [error, setError] = useState({ isError: false, message: "" });
  const [message, setMessage] = useState('');
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    document.getElementById('name').select(); // focusses user name on load



  }, []);
  async function submitForm(event) {
    setLoading(true)

    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const token = await baseApi.post('admin/login', data)
      .then(res => res.data
        ? localStorage.setItem('token', res.data.data.access_token) &
        localStorage.setItem('refreshToken', res.data.data.refresh_token) &
        localStorage.setItem("sessionID", 1)
        & router.push('/admin')

        : setError({ isError: true, message: res.data.message }),


        (error) => {


          if (error.response.data.success === false) {
            baseApi.post('/coordinator/login', data)
              .then(res => res.data)
              .then(data => {

                if (data.success === true) {

                  localStorage.setItem('token', data.data.access_token);
                  localStorage.setItem('refreshToken', data.data.refresh_token)
                  router.push('/portal/candidates')
                }
              }, (error) => {
                if (error.response.data.success === false) {

                  // post to api to check if user is a candidate
                  baseApi.post('/user/login', data)
                    .then(res => res.data)
                    .then(data => {
                      if (data.success === true) {
                         

                        localStorage.setItem('token', data.data.access_token);
                        localStorage.setItem('refreshToken', data.data.refresh_token)
                        localStorage.setItem("expiresIn", data.data.expires_in);
                        router.push('/control')

                      }
                    }
                    )


                }
              })
          }
        }


      )

      .catch(e => {
        // setError({ isError: true, message: e.message });
        setError({ isError: true, message: 'Invalid user name or password.' });
        // //
        return
      })
      .finally(() => setLoading(false))


  }




  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.login}>
        <div className={styles.login_form}>
          <div className={styles.btnBack} onClick={() => router.back()}> &larr; Back</div>

          <Image src="/assets/images/logo_rounded.png" width={150} height={150} alt="sibaq logo" />

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
            {/* <a href={'forgot-password'} className={styles.forgotarea}>
              <p className={styles.forgot}>Forgot Password?</p>
            </a> */}
            <div className={`${styles.error_show} ${error.isError ? styles.isError : ""}`}>
              <p>{error.message} </p>
            </div>

            <button type='' className={styles.login_btn}
              onClick={(event) => submitForm(event)}
            >
              {loading ? 'logging in..' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

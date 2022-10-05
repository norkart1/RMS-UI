import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/landing-page.module.css";
import logo from "../public/assets/logo.png"
import Image from "next/image";
import big_logo from "../public/assets/big_logo_.png"
import logo_shadow from "../public/assets/big_logo_shadow.png"
import dhiu from "../public/assets/dhiu.png"
import photo from "../public/assets/user_sample.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Toppers from "../components/toppers";
export default function LandingPage() {
  // update countdown of days  every second



  var date1 = new Date();
  var date2 = new Date("12/04/2022");
  var diff = date2.getTime() - date1.getTime();
  var weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  var days = Math.floor(diff / (1000 * 3600 * 24) - weeks * 7);
  var hours = Math.floor(diff / (1000 * 3600) - days * 24 - weeks * 7 * 24);

  // let hoursLeft = Math.floor(hours - (days * 24) - (weeks * 7 * 24));
  weeks = weeks < 10 ? "0" + weeks : weeks;
  days = days < 10 ? "0" + days : days;
  hours = hours < 10 ? "0" + hours : hours;

  let toppers = ["jkdfsa", "jklsdjf"]
  const categories = ["Bidaya", "Thanawiyya", "Aliya", "Kulliyyah"];


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      <Head>
        <title>Sibaq-22</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.bars} onClick={setIsMenuOpen}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
        <div className={styles.biglogoDiv}>
          <Image className={styles.logo} src={big_logo} layout="responsive"  ></Image>
        </div>
        <div className={styles.bottomImageDiv}>
          <Image className={styles.bottomImage} src={dhiu} layout="responsive"></Image>
        </div>
        <div className={styles.logoShadowDiv}>
          <Image className={styles.logoShadow} src={logo_shadow} layout="responsive"></Image>
        </div>

      </header>
      <menu className={`${styles.menu} ${isMenuOpen && styles.menu_open}`} >
        <button className={styles.BtnMenuClose} onClick={() => setIsMenuOpen(!isMenuOpen)} > <FontAwesomeIcon icon={faAngleRight} /> </button>
        <ul>
          <a href={''}><li>HOME</li></a>
          <a href={'#'}><li>PROGRAMS</li></a>
          <a href={'#'}><li>RESULTS</li></a>
          <a href={'#'}><li>SCHEDULE</li></a>
          <a href={'#'}><li>LIVE</li></a>
          <a href={'#'}><li>ABOUT</li></a>
        </ul>
        <a className={styles.BtnSignIn}>Sign in</a>
      </menu>
      <div className={isMenuOpen && styles.shadow} onClick={() => setIsMenuOpen(false)}></div>

      <section id="about" className={styles.about}>
        <div className={styles.about_container}>
          <div className={styles.about_container_img}>
            <Image src="/assets/dh.png" layout="fill" ></Image>
          </div>
          <h2>ABOUT US</h2>
          <p>Darul Huda Sibaq is the national art fest of DHIU and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help, promote and develop educational activities of concerned students. Participation in the fest is intended to foster high standard and stimulate creativity in various fields.
            Sibaq was held in 2004, 2011, 2014 and 2016 in DHIU and UG campuses under the auspices of Darul Huda in association with its coordination committee. The programme has been instrumental in the development of extra-curricular activities and creative thinking of participants and to cultivate productive interest in upcoming generations.Darul Huda Sibaq is the national art fest of DHIU and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help, promote and develop educational activities of concerned students. Participation in the fest is intended to foster high standard and stimulate creativity in various fields.
            Sibaq was held in 2004, 2011, 2014 and 2016 in DHIU and UG campuses under the auspices of Darul Huda in association with its coordination committee. The programme has been instrumental in the development of extra-curricular activities and creative thinking of participants and to cultivate productive interest in upcoming generations.</p>
        </div>
      </section>

      <section className={styles.coutdownSection}>
        <h2>SIBAQ 22 FINALE - 22 DEC </h2>
        <span className={styles.countSpans}>
          <div className={`${styles.spans} ${styles.weeks}`}>
            <h3>{weeks}</h3>
            <h2>WEEKS</h2>
          </div>
          <span className={styles.verticalLine}></span>
          <div className={`${styles.spans} ${styles.days}`}>
            <h3>{days}</h3>
            <h2> DAYS</h2>
          </div>
          <span className={styles.verticalLine}></span>
          <div className={`${styles.spans} ${styles.hours}`}>
            <h3>{hours}</h3>
            <h2>HOURS</h2>

          </div>
        </span>
      </section>
      <section id="toppers" className={styles.toppers_section}>
        {
          categories.map((category) => {
            return (
              <div className={`${styles.toppers_slide} ${styles.slide1}`}>
                <div className={styles.titles}>
                  <h4>{category}</h4>
                  <span>Toppers</span>
                </div>
                <div className={styles.topper_details}>
                  {
                    toppers.map((topper, index) => {
                      return (
                        <div className={styles.topper}>
                          <div className={styles.topper_img}>
                            <Image src={photo} layout="responsive"></Image>
                          </div>
                          <div className={styles.topper_name}>{topper}</div>
                          <div className={styles.topper_college}>Sample Name of College, Place</div>
                        </div>
                      )
                    }
                    )}

                </div>
              </div>
            )
          })
        }


      </section>
      <section id="toppers" className={styles.toppers_section}>
        {/* <Toppers /> */}

      </section>
    </div>
  );
}

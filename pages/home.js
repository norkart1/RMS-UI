import Head from "next/head";
import styles from "../styles/landing-page.module.css";
import Image from "next/image";
import logo from "../public/assets/big_logo.png"
import dhiu from "../public/assets/dhiu.png"

export default function LandingPage() {
  return (
    <div className="">
      <Head>
        <title>Sibaq-22</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.bars}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>

        </div>
        <div className={styles.biglogoDiv}>
          <Image className={styles.logo} src={logo} width={400} height={400} ></Image>
        </div>
        <div className={styles.bottomImageDiv}>
          <Image className={styles.bottomImage} src={dhiu} layout="responsive"></Image>

        </div>
      </div>


      <section id="about" className={styles.about}>
        <div className={styles.about_container}>
          <Image src="/assets/dh.png" height={100} width={100} />
          <h2>ABOUT US</h2>
          <p>Darul Huda Sibaq is the national art fest of DHIU and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help, promote and develop educational activities of concerned students. Participation in the fest is intended to foster high standard and stimulate creativity in various fields.
            Sibaq was held in 2004, 2011, 2014 and 2016 in DHIU and UG campuses under the auspices of Darul Huda in association with its coordination committee. The programme has been instrumental in the development of extra-curricular activities and creative thinking of participants and to cultivate productive interest in upcoming generations.Darul Huda Sibaq is the national art fest of DHIU and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help, promote and develop educational activities of concerned students. Participation in the fest is intended to foster high standard and stimulate creativity in various fields.
            Sibaq was held in 2004, 2011, 2014 and 2016 in DHIU and UG campuses under the auspices of Darul Huda in association with its coordination committee. The programme has been instrumental in the development of extra-curricular activities and creative thinking of participants and to cultivate productive interest in upcoming generations.</p>
        </div>


        <div>


        </div>
        <div className={styles.coutdownSection}>
          <h2>COUNTDOWN</h2>
          <span className={styles.countSpans}>
            <div className={styles.spans}>
              <h3>00</h3>
              <h2>WEEKS</h2>
            </div>
            <div className={styles.spans}>
              <h3>00</h3>
              <h2>WEEKS</h2>
            </div>
            <div className={styles.spans}>
              <h3>00</h3>
              <h2>WEEKS</h2>
            </div>

          </span>

        </div>

      </section>

      <div className={styles.coutdownSection}>
        <h2>COUNTDOWN</h2>
        <span className={styles.countSpans}>
          <div className={styles.spans}>
            <h3>00</h3>
            <h2>WEEKS</h2>
          </div>
          <div className={styles.spans}>
            <h3>00</h3>
            <h2>WEEKS</h2>
          </div>
          <div className={styles.spans}>
            <h3>00</h3>
            <h2>WEEKS</h2>
          </div>

        </span>


      </div>
    </div>
  );
}

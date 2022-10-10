import Image from "next/image";
import style from "../styles/latestResult.module.css";
import styles from "../styles/currentPrograms.module.css";

import Layout from "../components/layout";



export default function LatestResult() {
  return (
    <div>
      <Layout title={"LATEST \n  RESULTS"}>

        <div className={styles.description}>
          
          <h2>MOST MEMORABLE MOMENTS ARE HERE</h2>
          <p>      the  outcomes of the consistent endeavors and tenacious strives
            are finally disclosed. The hearts beat faster than before and
            expectations are high, but only a high level of magnificence can
            make the victory happen. By the way, best of luck!!!</p>
        </div>
        <section>
          <div className={style.findresult}>
            <h2>FIND RESULTS</h2>
            <div className={style.buttons}>
              <button>BIDAYA</button>
              <button>BIDAYA</button>
              <button>BIDAYA</button>
              <button>BIDAYA</button>
              <button>BIDAYA</button>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}
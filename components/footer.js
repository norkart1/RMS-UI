import { useRouter } from 'next/router';
import React from 'react'
import styles from "../styles/component/comp_footer.module.css";



function footer() {
  const d = new Date();
  let year = d.getFullYear();
  const router = useRouter()
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
      <div className={styles.quick_links}>
          <h2>Quick links</h2>
          <ul>
            <li className={styles.link} onClick={()=> router.push('/about')}>About Sibaq</li>
            <li className={styles.link} onClick={()=> router.push('/results')}>Results</li>
            <li className={styles.link} onClick={()=> router.push('/news')}>News</li>
            <li className={styles.link} onClick={()=> router.push('/notifications')}>Notifications</li>
            <li className={styles.link} onClick={()=> router.push('/programme_schedule')}>Programme schedule</li>
            <li className={styles.link} onClick={()=> router.push('/Current_programs')}>Current programs</li>
            <li className={styles.link} onClick={()=> router.push('http://dhiu.in/')}>dhiu.in</li>
          </ul>

        </div>
        <div className={styles.address}>
          <h2>Address</h2>
          <p>Darul Huda Islamic University <br />
            Hidaya Nagar, Chemmad, Tirurangadi PO <br />
            Malappuram Dist. Pin: 676306, Kerala, India <br />
          </p>
          <p>
            Email : info@dhiu.in | Phone : +91494-2463155 <br />
            Fax : 0494 2460575</p>
          <span className={styles.copyright}>© {year} Sibaq, All rights reserved</span>
        </div>

      </div>
    </footer>
  )
}

export default footer

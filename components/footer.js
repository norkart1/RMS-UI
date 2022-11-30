import { useRouter } from 'next/router';
import React from 'react'
import styles from "../styles/component/comp_footer.module.css";



function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  const router = useRouter()
  return (
    <footer className={styles.footer} style={{padding: '1rem 2rem 2rem 2rem'}}>
      <div className={`${styles.container} container`}>
      <div className={styles.quick_links}>
          <h2 >Quick links</h2>
          <ul style={{marginLeft:'0'}}>
            <li style={{paddingLeft:'0'}} className={styles.link} onClick={() => router.push('/public_portal')}>Score card</li>
            <li style={{paddingLeft:'0'}} className={styles.link} onClick={()=> router.push('/feeds')}>Feeds</li>
            <li style={{paddingLeft:'0'}} className={styles.link} onClick={()=> router.push('/public_portal/schedule')}>Programme schedule</li>
            <li style={{paddingLeft:'0'}} className={styles.link} onClick={()=> router.push('http://dhiu.in/')}>dhiu.in</li>
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

export default Footer

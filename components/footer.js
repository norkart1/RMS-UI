import React from 'react'
import styles from "../styles/component/comp_footer.module.css";



function footer() {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.content}>
          <h2>Address</h2>
          <p>Darul Huda Islamic University <br />
            Hidaya Nagar, Chemmad, Tirurangadi PO <br />
            Malappuram Dist. Pin: 676306, Kerala, India <br />
          </p>
          <p>
            Email : info@dhiu.in | Phone : +91494-2463155 <br />
            Fax : 0494 2460575</p>
          <span className={styles.copyright}>© 2019 Sibaq, All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default footer

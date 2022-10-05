import React from "react";
import styles from "../styles/comp_toppers.module.css";
import Image from "next/image";
import photo from "../public/assets/user_sample.jpg";






// NOT WORKING NOW









function toppers() {
  let toppers = ["jkdfsa", "jklsdjf"];

  return (
    <section id="toppers" className={styles.toppers_section}>
      <div className={`${styles.toppers_slide} ${styles.slide1}`}>
        <div className={styles.titles}>
          <h4>category</h4>
          <span>Toppers</span>
        </div>
        <div className={styles.topper_details}>
          {toppers.map((topper, index) => {
            return (
              <div className={styles.topper}>
                <div className={styles.topper_img}>
                  <Image src={photo} layout="responsive"></Image>
                </div>
                <div className={styles.topper_name}>{topper}</div>
                <div className={styles.topper_college}>
                  Sample Name of College, Place
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default toppers;

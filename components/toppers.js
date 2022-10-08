import React, { useEffect, useState } from "react";
import styles from "../styles/component/comp_toppers.module.css";
import Image from "next/image";
import photo from "../public/assets/user_sample.jpg";
import gsap from "gsap";



function toppers() {
  let toppers_list = [
    {
      category: "Aliya",
      candidates: [
        {
          name: "Muhammed Ashraf",
          college: "College of Engineering, Trivandrum",
          image: photo,
        },
        {
          name: "Sreejith",
          college: "College of Engineering, Trivandrum",
          image: photo,
        },
      ],
    },
    {
      category: "Thaniya",
      candidates: [
        {
          name: "Muhammed Ali",
          college: "College of Engineering, Trivandrum",
          image: photo,
        },
      ],
    },
    {
      category: "Kulliyya",
      candidates: [
        {
          name: "Muhammed Ali",
          college: "College of Engineering, Trivandrum",
          image: photo,
        },
      ],
    },
  ];

  const duration = 4000

  const [current_category, set_current_category] = useState(toppers_list[0]);
  let ind = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.fromTo('#slide', {
        duration: 0,
        opacity: 0,
        // translateX:'20%'
    }, {
        duration: 2,
        opacity: 1,
        translateX:0
    })
      ind = ind >= toppers_list.length - 1 ? 0 : ind + 1;
      set_current_category(toppers_list[ind]);
      // console.log(ind);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="toppers" className={styles.toppers_section}>
      <div
      id='slide'
        className={`${styles.toppers_slide} ${styles.slide1}`}
      >
        <div className={styles.titles}>
          <h4>{current_category.category}</h4>
          <span>Toppers</span>
        </div>
        <div className={styles.topper_details}>
          {current_category.candidates.map((candidate, i) => {
            return (
              <div className={styles.topper} key={i}>
                <div
                  className={styles.topper_img}
                  style={{ backgroundImage: `url(${candidate.image.src})` }}
                >
                  {/* <Image src={candidate.image} layout="fill"></Image> */}
                </div>
                <div className={styles.topper_name}>{candidate.name}</div>
                <div className={styles.topper_college}>{candidate.college}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default toppers;

import React, { useEffect, useState } from "react";
import styles from "../styles/component/comp_toppers.module.css";
import Image from "next/image";
import photo from "../public/assets/images/user_sample.jpg";
import gsap from "gsap";



function toppers() {
  let toppers_list = [
    {
      category: "Aliya",
      candidates: [
        {
          name: "Muhammed Ali",
          chest: "502",
          college: "NRIC, Chamakkala",  //SHORT NAME OF THE INSTITUTTE AND PLACE EXPECTED
          image: photo,
        },
        {
          name: "Muhammed Ashraf",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
        {
          name: "Muhammed Tajudeen CK",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
      ],
    },
    {
      category: "Thaniya",
      candidates: [
        {
          name: "Muhammed Ali",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
        {
          name: "Muhammed Ashraf",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
        {
          name: "Muhammed Tajudeen CK",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
      ],
    },
    {
      category: "Kulliyya",
      candidates: [
        {
          name: "Muhammed Ali",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
        {
          name: "Muhammed Ashraf",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
        {
          name: "Muhammed Tajudeen CK",
          chest: "502",
          college: "NRIC, Chamakkala",
          image: photo,
        },
      ],
    },
  ];

  const duration = 8000
  const anim_duration = duration / 8000

  const [current_category, set_current_category] = useState(toppers_list[0]);
  const [changeColor, setChangeColor] = useState(false)
  const [slideInd, setSlideInd] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeColor(!changeColor)
      gsap.fromTo('#slide', {
        duration: 0,
        translateX: '20%'
      }, {
        duration: anim_duration,
        translateX: 0,
      })
      setSlideInd(i => slideInd == toppers_list.length - 1 ? 0 : i + 1)
      set_current_category(toppers_list[slideInd]);
      // console.log(slideInd);
    }, duration);

    return () => clearInterval(interval);
  },);

  return (
    <section id="toppers" className={`${styles.toppers_section}`}
      style={{ backgroundColor: changeColor ? "var(--primary-color)" : "var(--secondary-color)" }}>
      <h2>LEADING TOPPERS OF SIBAQ' 22 <span> - {current_category.category}</span></h2>
      <div
        id='slide'
        className={`${styles.toppers_slide} ${styles.slide1}`}
        style={{ backgroundColor: changeColor ? "var(--secondary-color)" : "var(--primary-color)" }}
      >
        <div className={styles.titles}>
          <h4
            style={{ color: changeColor ? "var(--primary-color)" : "var(--secondary-color)" }}
          >{current_category.category}</h4>
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
                </div>
                <p className={styles.topper_name}
                  style={{ color: changeColor ? "black" : "white" }}
                >{candidate.name} <br></br>
                  ({candidate.chest})</p>
                <p className={styles.topper_college}>{candidate.college}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default toppers;

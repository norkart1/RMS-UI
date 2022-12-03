import React from "react";
import Layout from "../../components/layout";
import styles from "../../styles/news.module.css";
import Image from "next/legacy/image";

function Venues() {
  let venues = [
    {
      id: "Venue 1",
      name: "BAGHDAD",
      address: "Front Side Darul huda PG block",
       
      // photo: require("/public/assets/stages/1.jpg").default,
    },
    {
      id: "Venue 2",
      name: "BUKHARA",
      address: "Near darul huda  CHS block (secondary section)",
      // photo: require("/public/assets/stages/2.jpg").default,
     },
    {
      id: "Venue 3",
      name: "CORDOBA",
      address: "near darul huda SMS block(senior secondary, degree section)",
      // photo: require("/public/assets/stages/3.jpg").default,
    },
    {
      id: "Venue 4",
      name: "CAIRO",
      address: "PG mini hall  near dining hall",
      // photo: require("/public/assets/stages/4.jpg").default,
    },
    {
      id: "Venue 5",
      name: "SAMARKANTH",
      address:
        "Darul huda auditorium, second floor, Dr. U BAPPUTTY HAJI library",
      // photo: require("/public/assets/stages/5.jpg").default,
    },
    {
      id: "Venue 6",
      name: "TRIPOLI",
      address:
        "Darul hikma conference hall near sms building block (senior secondary, degree section)",
      // photo: require("/public/assets/stages/6.jpg").default,
    },
    {
      id: "Venue 7",
      name: "VENUE 7",
      address: "Seminar hall, first floor, darul huda PG block",
      // photo: require("/public/assets/stages/7.jpg").default,
    },
    {
      id: "Venue 8",
      name: "VENUE 8",
      address:
        "Darul huda computer lab, first floor, Dr. U BAPPUTTY HAJI library",
    },
    {
      id: "Venue 9",
      name: "VENUE 9",
      address: "offstage",
    },
    {
      id: "Venue 10",
      name: "VENUE 10",
      address: "Darul huda masjid hall",
    },
  ];

  return (
    <Layout title="Sibaq 2022 Venues">
      <section className={styles.news_section}>
        <div className={`${styles.container} container`}>
          {/* three button for typew */}

          <div className={styles.news_container}>
            {venues.map((news_item, index) => (
              <div key={index} className={styles.news}>
                {news_item.photo && (
                  <Image
                    className={styles.news_img}
                    src={news_item?.photo}
                    width={300}
                    height={200}
                    layout="responsive"
                    alt="sibaq at 22 darul huda art fest"
                    loading="lazy"
                  ></Image>
                )}

                <div className={styles.news_content}>
                  <h3>{news_item.id} </h3>
                  <h4>{news_item.name}</h4>
                  <p>{news_item.address}</p>
                </div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </section>
    </Layout>
  );
}

export default Venues;
 
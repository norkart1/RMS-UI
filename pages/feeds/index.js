import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout";
import styles from "../../styles/news.module.css";
// import { data } from "../../helpers/newfeeds_data.js";
import Notifications from "../../components/notifications";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import baseApi from "../../api/baseApi";
import { useEffect, useState } from "react";

import ImgHome from "/public/assets/svg/home.svg";
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import RadioIcon from '@mui/icons-material/Radio';
import MovieIcon from '@mui/icons-material/Movie';



function News() {
  const [news, setNews] = useState([]);
  const [newsType, setNewType] = useState("");

  useEffect(() => {
    baseApi.get("/public/media/").then((res) => {
      // filter news
      
      setNews(res.data.data);
    });
  },  []);

  // const tagArrayToString = (tags) => {
  //   let tagString = "#";
  //   return (tagString += tags.join(", #"));
  // };
  
  // filter news
  
  let newss = news.filter((item) => {
    if (newsType === "") {
      return item;
    } else if (item.type === newsType) {
      return item;
    }
  });



  const router = useRouter();
  const sortedNews = newss.sort((a, b) => {
    return b.id - a.id;
  });
  return (
    <Layout title="Sibaq 2022 Feeds">
      <section className={styles.news_section}>
          <div className={styles.news_btns}>
            <button
              className={styles.news_btn}
              onClick={() => setNewType("")}
            >
             Home
             <HomeIcon className={styles.btnHomeImg}></HomeIcon>
            </button>
            
            <button
              className={styles.news_btn}
              onClick={() =>  setNewType("news")}
            >
              News
             <FeedIcon className={styles.btnHomeImg} ></FeedIcon>
            </button>
            <button
              className={styles.news_btn}
              onClick={() =>  setNewType("radio")}
            >
              Radio
             <RadioIcon className={styles.btnHomeImg} ></RadioIcon>
            </button>
            <button
              className={styles.news_btn}
              onClick={() =>  setNewType("video")}
            >
             Video
             <MovieIcon className={styles.btnHomeImg} ></MovieIcon>
            </button>

            </div>
        <div className={`${styles.container} container`}>
          {/* three button for typew */}
            
          <div className={styles.news_container}>
            {sortedNews.map((news_item, index) => (
              <div
                key={index}
                className={styles.news}
                onClick={() => router.push(`/feeds/${news_item.slug}`)}
              >
                {news_item.type == "news" && (
                  <Image
                    className={styles.news_img}
                    src={news_item?.file?.url}
                    layout="responsive"
                    width={500}
                    height={220}
                    alt="sibaq at 22 darul huda art fest"
                  ></Image>
                )}
                {news_item.type == "radio" && (
                  <AudioPlayer
                    // autoPlay
                    src={news_item.file}
                    // onPlay={e => console.log("onPlay")}
                    // other props here
                  />
                )}
                {news_item.type == "video" && (
                  <YoutubeEmbed embedId={news_item.youtube_link} />
                )}
                <div className={styles.news_content}>
                  <h4>{news_item.heading}</h4>
                  <p>
                    {news_item.content.slice(0, 300) + "... "}
                    <span className={styles.read_more}> Read more</span>
                  </p>
                  <div className={styles.news_details}>
                    <p className={styles.news_date}>
                      {" "}
                      {news_item.created_at.slice(0, 10)}
                    </p>
                    <p className={styles.news_tags}>{"#" + news_item.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div></div>
          <div className={styles.notification_container}>
            <h3>Notifications</h3>
            <div className={styles.line}></div>
            <Notifications />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default News;

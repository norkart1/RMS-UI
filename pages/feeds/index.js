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
import Head from "next/head";



function News() {
  const [news, setNews] = useState([]);
  const [newsType, setNewType] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    baseApi.get("/public/media/").then((res) => {
      // filter news

      setNews(res.data.data);
    });
  }, []);

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

  // selected type  news  button style
  const selectedStyle = (type) => {
    if (type === selected) {
      return styles.selected;
    }
  };





  const router = useRouter();
  const sortedNews = newss.sort((a, b) => {
    return b.id - a.id;
  });
  return (
    <div>
      <Head>
        <meta name="keywords" content="Sibaq 2022 news, Sibaq news, news, radio, video" />
        <meta property="" />
        <meta name="author" content="Darul Huda Islamic University" />
        <meta property="og:url" content="https://www.sibaq.in" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sibaq" />
        <meta property="og:image" content="/public/assets/sibaq-gears-up.jpg" />
        <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
         <title>SIBAQ 2022 | FEEDS</title>
      </Head>
      <Layout title="Sibaq 2022 Feeds">
        <section className={styles.news_section}>
          <div className={styles.news_btns}>
            <button className={styles.news_btn} onClick={() => setNewType("")}>
              <p> Home</p>
              <HomeIcon className={styles.btnHomeImg}></HomeIcon>
            </button>

            <button
              className={styles.news_btn}
              onClick={() => setNewType("news")}
            >
              <p> News</p>
              <FeedIcon className={styles.btnHomeImg}></FeedIcon>
            </button>
            <button
              className={styles.news_btn}
              onClick={() => setNewType("radio")}
            >
              <p> Radio</p>
              <RadioIcon className={styles.btnHomeImg}></RadioIcon>
            </button>
            <button
              className={styles.news_btn}
              onClick={() => setNewType("video")}
            >
              <p> Video</p>
              <MovieIcon className={styles.btnHomeImg}></MovieIcon>
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
                    <img
                      className={styles.news_img}
                      src={news_item?.file?.url}


                      alt="sibaq at 22 darul huda art fest"
                    ></img>
                  )}
                  {news_item.type == "radio" && (
                    <div onClick={()=> router.push(`/feeds/${news_item.slug}`)}>
                      <AudioPlayer
                        autoPlay={false}
                        src={news_item?.file?.url}
                        autoPlayAfterSrcChange={false}
                        onPlay={(e) => console.log("onPlay", e.preventDefault() & router.push(`/feeds/${news_item.slug}`))}
                        onCli
                        muted={true}



                      />
                    </div>
                    // play audio


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
    </div>
  );
}

export default News;

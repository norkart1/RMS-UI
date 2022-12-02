import React, { useEffect } from 'react'
import Layout from '../../components/layout.js'
// import { data } from '../../helpers/newfeeds_data.js'
import style from '../../styles/news_item.module.css'
import Image from 'next/image.js'
import { useRouter } from 'next/router.js'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import YoutubeEmbed from "../../components/YoutubeEmbed";

import baseApi from '../../api/baseApi'
import { useState } from 'react'
import Head from 'next/head'



export default function NewsItem() {
  const [news_item, setNews] = useState([]);
  const router = useRouter()
  const { slug } = router.query


  const loadNews = async (slug) => {

    baseApi.get(`/public/media/${slug}`).then((res) => {
      setNews(res.data.data)

    });
  };
  useEffect(() => {
    loadNews(slug);

  }, [slug]);

  // const tagArrayToString = (tags) => {
  //   let tagString = '#'
  //   return tagString += tags.join(', #')
  // }
  const indentedParagraphs = (text) => {
    if (text?.length > 30) {
      return text.split('\n').map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>
      })
    }
    else {
      return text
    }
  }

  return (
    <>
      <Head>
        <meta property="og:image" content={news_item?.file?.url} />
        <meta property="og:title" content={news_item?.heading} />
        <meta name="keywords" content="Sibaq news, sibaq 2022 " />
        <meta property="" />
        <meta name="author" content="Darul Huda Islamic University" />
        <meta property="og:url" content="https://www.sibaq.in" />
        <meta property="og:type" content="website" />
        <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
        <title>SIBAQ {news_item?.type?.toUpperCase()} | {news_item?.heading?.toUpperCase()}</title>
      </Head>
      <Layout title="News" showHeader={false} style={{marginTop:'0'}}>
        <section className={style.section}>
          <div className={style.container}>
            <div className={style.btnBack} onClick={() => router.back()}>
              {" "}
              &larr; Go back
            </div>
            {
              <div className={style.divNewsImage}>
                {news_item?.type == "news" && (
                  <img
                    src={news_item?.file?.url}

                    className={style.newsImage}
                    alt={"Sibaq 2022"+ news_item?.heading}
                  ></img>
                )}
                {news_item?.type == "radio" && (
                  <AudioPlayer
                    autoPlay
                    src={news_item.file.url}

                  // other props here
                  />
                )}
                {news_item?.type == "video" && (
                  <YoutubeEmbed embedId={news_item.youtube_link} />
                )}
                <p className={style.imageDescription}>
                  {" "}
                  <b>{news_item?.imageCaption} </b> {news_item?.image_description}
                </p>
              </div>
            }

            <div className={style.text_area}>
              <h3>{news_item?.heading}</h3>
              <p className={style.news_date}> {news_item?.date} </p>
              <p className={style.news_tag}> {news_item?.tag} </p>
              <div className={style.divNewsContent}>
                <p>{indentedParagraphs(news_item?.content)}</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}








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


export default function NewsItem() {
  const [news_item, setNews] = React.useState([]);

  useEffect(() => {
    baseApi.get(`/public/media/`).then((res) => {
      // filter the data to get the slug
      const news = res.data.data.filter((news) => news.slug === router.query.slug)
      setNews(news[0])
   
      
    });
  }, []);
  


  const router = useRouter()
  // const tagArrayToString = (tags) => {
  //   let tagString = '#'
  //   return tagString += tags.join(', #')
  // }
  const indentedParagraphs = (text) => {
    if(text?.length > 30){
    return text.split('\n').map((paragraph, index) => {
      return <p key={index}>{paragraph}</p>
    })
  }
  else{
    return text
  }
  }
 
  return (
    <Layout title="News" showHeader={false}>
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.btnBack} onClick={() => router.back()}>
            {" "}
            &larr; Go back
          </div>
          {
            <div className={style.divNewsImage}>
              {news_item.type == "news" && (
                <Image
                  src={news_item.file.url}
                  layout="responsive"
                  width={500}
                  height={220}
                  className={style.newsImage}
                  alt="sibaq News"
                ></Image>
              )}
              {news_item.type == "radio" && (
                <AudioPlayer
                  autoPlay
                  src={news_item.file.url}
                  
                  // other props here
                />
              )}
              {news_item.type == "video" && (
                <YoutubeEmbed embedId={news_item.youtube_link} />
              )}
              <p className={style.imageDescription}>
                {" "}
                <b>{news_item.imageCaption} </b> {news_item.image_description}
              </p>
            </div>
          }

          <div className={style.text_area}>
            <h3>{news_item.heading}</h3>
            <p className={style.news_date}> {news_item.date} </p>
            <p className={style.news_tag}> {news_item.tag} </p>
            <div className={style.divNewsContent}>
              <p>{indentedParagraphs(news_item.content)}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
 




 

  
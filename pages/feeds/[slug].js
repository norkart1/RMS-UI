import React, { useEffect } from 'react'
import Layout from '../../components/layout.js'
import { data } from '../../helpers/newfeeds_data.js'
import style from '../../styles/news_item.module.css'
import Image from 'next/image.js'
import { useRouter } from 'next/router.js'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



function NewsItem({ news_item }) {
  const router = useRouter()
  const tagArrayToString = (tags) => {
    let tagString = '#'
    return tagString += tags.join(', #')
  }
  const indentedParagraphs = (text) => {
    return text.split('\n').map((paragraph, index) => {
      return <p key={index}>{paragraph}</p>
    })
  }

  return (
    <Layout title='News'>
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.btnBack} onClick={() => router.back()}> &larr; Go back</div>
          {news_item.image && <div className={style.divNewsImage}>
            
            {news_item.image && news_item.type == 'news' && <Image src={news_item.image} layout='responsive' className={style.newsImage} alt="sibaq News"></Image>}
            {news_item.type == 'audio-broadcast' &&
              <AudioPlayer
                autoPlay
                src={news_item.file}
                onPlay={e => console.log("onPlay")}
              // other props here
              />
            }
            <p className={style.imageDescription}> <b>{news_item.image_caption} </b> {news_item.image_description}</p>
          </div>}

          <div className={style.text_area}>
            <h3>{news_item.heading}</h3>
            <p className={style.news_date}> {news_item.date} </p>
            <p className={style.news_tags}> {tagArrayToString(news_item.tags)} </p>
            <div className={style.divNewsContent}>
              <p>{indentedParagraphs(news_item.news_content)}</p>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  )
}





export async function getStaticPaths() {
  const paths = data.news.map((news_item) => ({
    params: { slug: news_item.slug },
  }))
  return { paths, fallback: false }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    // data.news.
    props: { news_item: data.news.find((news_item) => news_item.slug === context.params.slug) },
  }
}

export default NewsItem
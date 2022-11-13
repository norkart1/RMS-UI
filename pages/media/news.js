import React, { useState } from 'react'
import Input from '../../components/portal/inputTheme'
import Portal_Layout from '../../components/portal/portal_Layout'
import styles from '../../styles/media/news.module.css'
import baseApi from '../../api/baseApi'
import { useEffect } from 'react'


function Dashboard() {
  const [activeTabName, setActiveTabName] = useState()
  const [activeChildTabName, setActiveChildTabName] = useState()
  const [news, setNews] = useState([])
  const [newsTitle, setNewsTitle] = useState()
  const [newsContent, setNewsContent] = useState()
  const [imageCaption, setImageCaption] = useState()
  const [newsTags, setNewsTags] = useState()
  const [photo, setPhoto] = useState()


  useEffect(() => {
    baseApi.get('user/media/news').then((res) => {
      setNews(res?.data?.data)
    })

  }, [news])

  // post to api user/media/news
  const handleSubmit = (e) => {
    e.preventDefault()
    const postData = {
      content: newsContent,
      heading: newsTitle,
      imageCaption: imageCaption,
      tags: newsTags,
      photo: photo
    }
    console.log(postData)
    // post to api user/media/news
    baseApi.post('user/media/news', postData)
      .then((res) => {
        console.log(res)
      }
      )
      .catch((err) => {
        console.log('err', err)
      }
      )
  }
  // console.log(news)

  const deleteNews = (id) => {
    baseApi.delete(`user/media/news/${id}`)

  }
  const editNews = (id) => {
    baseApi.patch(`user/media/news/${id}`, postData)

  }




  return (
    <Portal_Layout activeTabName='news' activeChildTabName='' userType='media'>
      <div>
        <h1>Add News</h1>
        <span data-theme='hr'></span>
      </div>
      <div className={styles.newsPage}>
        <div className={styles.forms}>
          <h2>News add here</h2>
          <div className={styles.form}>
            <form action="#" className={styles.newsadd}>
              <Input label='Heading' type='text_area' textAreaRowCount='2'
                handleOnChange={({ target }) => setNewsTitle(target?.value)} />
              <Input label='Content' type='text_area'
                handleOnChange={({ target }) => setNewsContent(target?.value)} />
              <Input label='image caption' type='text_area' textAreaRowCount='2'
                handleOnChange={({ target }) => setImageCaption(target?.value)} />
              <Input label='Tags' type='text_area' textAreaRowCount='2'
                handleOnChange={({ target }) => setNewsTags(target?.value)} />
              <Input label='Photo' type='file'
                handleOnChange={({ target }) => setPhoto(target?.value)} />

              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
          </div>
        </div>
        {/* display news */}
        <div className={styles.news}>
          <h2>News</h2>
          <div className={styles.newsList}>
            {news?.map((item, index) => {
              return (
                <div className={styles.newsItem} key={index}>
                  <div className={styles.newsItemHeading}>
                    <h3>{item?.heading}</h3>
                    {/* patch  by id*/}
                    <button onClick={() => deleteNews(item.id)}>Delete</button>
                    <button onClick={() => editNews(item.id)}>Edit</button>

                  </div>
                </div>
              )
            })}

          </div>
        </div>




      </div>


    </Portal_Layout>
  )
}

export default Dashboard
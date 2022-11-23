import React, { useState } from 'react'
import Input from '../../components/portal/inputTheme'
import Portal_Layout from '../../components/portal/portal_Layout'
import styles from '../../styles/media/news.module.css'
import baseApi from '../../api/baseApi'
import { useEffect } from 'react'
import { apiPost } from '../../helpers/functions'


function Dashboard() {
  const [activeTabName, setActiveTabName] = useState()
  const [activeChildTabName, setActiveChildTabName] = useState()
  const [newsType, setNewsType] = useState()
  const [news, setNews] = useState([])
  const [newsTitle, setNewsTitle] = useState()
  const [newsContent, setNewsContent] = useState()
  const [imageCaption, setImageCaption] = useState()
  const [newsTags, setNewsTags] = useState()
  const [newsUrl, setNewsUrl] = useState()
  const [youtubeCode, setYoutubeCode] = useState()
  const [photo, setPhoto] = useState()



  useEffect(() => {
    baseApi.get("/public/media/").then((res) => {
      setNews(res?.data?.data);
    });

  }, [])

  // post to api user/media/news
  const handleSubmit = (e) => {
    e.preventDefault()
    const postData = {
      type: newsType,
      youtubeLink: youtubeCode,
      content: newsContent,
      heading: newsTitle,
      imageCaption: imageCaption,
      tag: newsTags,
      slug: newsUrl,
      file: photo,
    };
// console.log(postData)
    // post to api user/media/news
   apiPost('user/media', postData,true)
      
  }
  // 

  const deleteNews = (id) => {
    baseApi.delete(`user/media/${id}`)

  }
  const editNews = (id) => {
    baseApi.patch(`user/media/${id}`, postData)

  }

const feedTypes = [
  { name: "Select Type", id: "" },
  { name: "News", id: "news" },
  { name: "Video", id: "video" },
  { name: "Radio", id: "radio" },
];

  return (
    <Portal_Layout activeTabName="news" activeChildTabName="" userType="media">
      <div>
        <h1>Add News</h1>
        <span data-theme="hr"></span>
      </div>
      <div className={styles.newsPage}>
        <div className={styles.forms}>
          <h2>News add here</h2>
          <div className={styles.form} data-theme="formContainer">
            <form action="#" className={styles.newsadd}>
              {/* dropdown */}
              <div className={styles.dropdown}>
                {/* onselect setnewtype */}
                <Input
                  type="dropdown"
                  dropdownOpts={feedTypes}
                  handleOnChange={({ target }) => setNewsType(target.value)}
                />
              </div>
              {/* if newtype youtube add input */}
              {newsType === "video" && (
                <Input
                  label="Video Code"
                  type="text_area"
                  textAreaRowCount="2"
                  handleOnChange={({ target }) => setYoutubeCode(target.value)}
                />
              )}

              <Input
                label="Heading"
                type="text_area"
                textAreaRowCount="2"
                handleOnChange={({ target }) => setNewsTitle(target?.value)}
              />
              <Input
                label="Content"
                type="text_area"
                handleOnChange={({ target }) => setNewsContent(target?.value)}
              />
              
                
              <Input
                label="Caption"
                type="text_area"
                textAreaRowCount="2"
                handleOnChange={({ target }) => setImageCaption(target?.value)}
              />
             
              <Input
                label="Tags"
                type="text_area"
                textAreaRowCount="2"
                handleOnChange={({ target }) => setNewsTags(target?.value)}
              />
              <Input
                label="Page Url"
                type="text_area"
                textAreaRowCount="2"
                handleOnChange={({ target }) => setNewsUrl(target?.value)}
              />

              {newsType !== "video" && (
                <Input
                  label="Photo"
                  type="file"
                  
                  handleOnChange={({ target }) => setPhoto(target.files[0])}
                />
              )}

              <button data-theme="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </button>
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
                    {/* <button onClick={() => editNews(item.id)}>Edit</button> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Portal_Layout>
  );
}

export default Dashboard
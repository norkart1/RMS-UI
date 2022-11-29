// import React from 'react'
import React, { useState } from 'react';
import Portal_Layout from '../../components/portal/portal_Layout'
import {  apiPost } from "../../helpers/functions";
import Image from 'next/image'
import styles from "../../styles/media/news.module.css";
import baseApi from "../../api/baseApi";

import UploadForm from '../../components/galleryF/UploadForm'
import ImageGrid from '../../components/galleryF/ImageGrid'
import Modal from '../../components/galleryF/Modal'
import { useEffect } from 'react';
import Input from '../../components/portal/inputTheme';


function Dashboard() {
  
  const [selectedImg, setSelectedImg] = useState(null);
  const [photo, setPhoto] = useState();
  const [imageCaption, setImageCaption] = useState();
  const [tag, setTag] = useState();
  const [location, setLocation] = useState();
  const [gallery, setGallery] = useState([])

 
  useEffect(() => {
    baseApi.get("user/media/gallery").then((res) => {
      setGallery(res?.data?.data);
    });
  }, [])

const handleSubmit = (e) => {
    e.preventDefault()
    const postData = {
      imageCaption: imageCaption,
      tag: tag,
      location: location,
      file: photo,
    };
   
    // post to api user/media/news
    apiPost('user/media/gallery', postData,true)
  }

  const deleteGallery = (id) => {
    baseApi.delete(`user/media/gallery/${id}`)
  }
  
   

  return (
    <Portal_Layout activeTabName="Gallery" userType="media">
      <div style={{ overflow:"auto", height: "100%" }}>
        <h1>Gallery</h1>
        <span data-theme="hr"></span>
        <div className={styles.newsPage}>
          <div className={styles.forms}>
            <h2>Gallery add here</h2>
            <div className={styles.form} data-theme="formContainer">
              <form action="#">
                <Input
                  label="Caption"
                  type="text_area"
                  textAreaRowCount="2"
                  handleOnChange={({ target }) =>
                    setImageCaption(target?.value)
                  }
                />
                <Input
                  label="Location"
                  type="text_area"
                  textAreaRowCount="2"
                  handleOnChange={({ target }) => setLocation(target?.value)}
                />

                <Input
                  label="Tags"
                  type="text_area"
                  textAreaRowCount="2"
                  handleOnChange={({ target }) => setTag(target?.value)}
                />
                <Input
                  label="Photo"
                  type="file"
                  handleOnChange={({ target }) => setPhoto(target.files[0])}
                />

                <button data-theme="submit" onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
          {/* display news */}
          <div className={styles.news}>
            <h2>Gallery</h2>
            <div className={styles.images}>
              {gallery?.map((item) => (
                <div className={styles.image} key={item._id}>
                  <Image
                    src={item?.file.url}
                    alt="Picture of the author"
                    width={200}
                    height={200}
                  />
                  <div className={styles.imageCaption}>
                    <h3>{item?.imageCaption}</h3>
                    <p>{item?.location}</p>
                    <p>#{item?.tag}</p>
                    <button onClick={() => deleteGallery(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <UploadForm /> */}
        {/* <ImageGrid
          setSelectedImg={setSelectedImg}
          styels={{ height: "80%", overflowY: "scroll" }}
        /> */}
        {/* {selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )} */}
        {/* display images */}
      </div>
    </Portal_Layout>
  );
}

export default Dashboard
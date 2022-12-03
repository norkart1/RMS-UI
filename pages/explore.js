import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GetAppIcon from '@mui/icons-material/GetApp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ImageGrid from '../components/galleryF/ImageGrid'
import Modal from '../components/galleryF/Modal'
import Layout from '../components/layout'
import styles from "../styles/explore.module.css"
import { useRouter } from 'next/router'
import { BaseApi } from '../helpers/functions';


function Gallery() {

    const [images,setImages] = useState([]);
    const [likedImages,setLikedImages] = useState([]);

    const likeHandler = async (id)=>{

        if (!likedImages.includes(id)) {
            await BaseApi.post('public/media/gallery/like/'+id)         
            console.log(id ,likedImages)
            likedImages.push(id);
            localStorage.setItem('likedImages',likedImages)
            getLike(id);
            getImages();
            console.log(id ,likedImages)
        } else {
            await BaseApi.post('public/media/gallery/unlike/'+id)
            likedImages.splice(likedImages.indexOf(id),1)
            getImages();
        }
        
    }

    const getLike = (id)=>{
        BaseApi.get('public/media/gallery/'+id)
        .then((res)=>{console.log(res.data.data.likes)})
    }


        const getImages = ()=>{
            BaseApi.get("public/media/gallery").then((res)=>{
                setImages(res.data.data)
                console.log('data loaded')
            })
        }
            
  
    useEffect(() => {
    getImages()
     setLikedImages(localStorage.getItem('likedImages'))
    }, [])
    
    return (
        <Layout title='Gallery'>


       <div className={styles.app}>
        <div className={styles.gallery}>
            {images.map((image,) => (
                <div className={styles.images} key={image.id}>
                <div className={styles.top}>
                    <LocationOnIcon className={styles.locationIcon} />
                <div className={styles.location}>{image.location}</div>
                </div>
                <img className= {styles.photo}src={image.file.url} loading="lazy"/>
                <div className={styles.bottom}>
                    <div className={styles.bottom1}>
                        <div className={styles.item}>
                   <ThumbUpIcon className={styles.likes}
                   style={{color: likedImages.includes(image.id) ? "blue" : "white" }}
                   onClick={()=>{likeHandler(image.id)}}/> 
                   {image.likes} likes
                        </div>
                        <div className={styles.item}>
                        <a download={"sibaqgallery.jpg"+image.likes} href={image.file.url} >
                            < GetAppIcon/>
                    download
                        </a>
                        </div>
                    
                    </div>
                    <div className={styles.bottom2}>{image.imageCaption}</div>
                </div>
                </div>
            ))}
           
        </div>
        </div>

        

            {/* <section className={styles.gallery}>
                <ImageGrid setSelectedImg={setSelectedImg} />
                { selectedImg && (
                    <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}
            </section> */}
        </Layout>

    )
    
    
    
}
export default Gallery


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
// import Image from 'next/image'

// import Album from '../components/gallery'

function Gallery() {

    // const router = useRouter();
    const [testImage,setTestImage] = useState([])
    // const [selectedImg, setSelectedImg] = useState(null);
    const [like, setLike] = useState (100)
    const [isLiked, setIsLiked] =useState(false)
    const likedId =null
    const likeHandler =(id)=>{
        if (!isLiked) {
            BaseApi.post('public/media/gallery/like/'+id)
            .then (likedId = id)           
            setIsLiked(!isLiked)
            setLike( like+1)
        } else {
            BaseApi.post('public/media/gallery/unlike/'+id)
            setIsLiked(!isLiked)
            setLike(like-1)
        }
        BaseApi.get('public/media/gallery/'+id).then((res)=>{
            // setLike(like)
            // console.log(res.data.data.likes);
        })
        // setIsLiked(!isLiked)
        setLike(isLiked?like-1:like+1)
    }
    const likeImg =(id)=>{
        if (!isLiked) {
            try{
                BaseApi.post("public/media/gallery/like/"+id);
            }catch(err){
                console.log(err);
            }
            setIsLiked(!isLiked)
            // setLike(like-1)
            // setIsLiked(false)
        }    
         else 
            try {
               BaseApi.post("public/media/gallery/unlike/"+id); 
               console.log(testImage);
            } catch (error) {
                console.log(error);
            }
            setIsLiked(!isLiked)
        }

            // function saveImage(url) {
            //     var gh = url   
            //     var a  = document.createElement('a');
            //     a.href = gh;
            //     a.download = 'sibaqGallery.jpg';
            
            //     a.click()
                
            // }
        
        
        // setLike(isLiked ? like-1 :like+1)
  
    useEffect(() => {
    BaseApi.get("public/media/gallery").then((res)=>{
        setTestImage(res.data.data)
    })
    }, [])
    
    return (
        <Layout title='Gallery'>


       <div className={styles.app}>
        <div className={styles.gallery}>
            {testImage.map((image) => (
                <div className={styles.images}>
                <div className={styles.top}>
                    <LocationOnIcon className={styles.locationIcon} />
                <div className={styles.location}>{image.location}</div>
                </div>
                <img className= {styles.photo}src={image.file.url} loading="lazy"/>
                <div className={styles.bottom}>
                    <div className={styles.bottom1}>
                        <div className={styles.item}>
                   <ThumbUpIcon className={styles.likes}
                   style={{color: isLiked ? "blue" : "white" }}
                   onClick={()=>{likeHandler(image.id)}}/> 
                   {like+image.likes} likes
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


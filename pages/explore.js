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
import Head from 'next/head';
import Cookie from 'js-cookie';
import cookie from 'cookie'
import { parse } from 'cookie';

const parseCookies = (req)=>{
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
// const likedImagesFromLocal = JSON.parse(localStorage.getItem('likedImages')||'[]')
function Gallery({initialRememberValue}) {
    console.log('value : ',initialRememberValue)

    const [images, setImages] = useState([]);
    const [likedImages, setLikedImages] = useState(()=>JSON.parse(initialRememberValue));

    // setLikedImages(JSON.parse(localStore && localStore.getItem('likedImages')));

    useEffect(() => {
        getImages();
            Cookie.set('likedImages',JSON.stringify(likedImages));
        }, [likedImages])

    const likeHandler = async (id) => {

        if (!likedImages.includes(id)) {
            await BaseApi.post('public/media/gallery/like/' + id)
            console.log(id, likedImages)
            likedImages.push(id);
            console.log(id, likedImages)
            Cookie.set('likedImages',JSON.stringify(likedImages));
            // localStorage.setItem('likedImages', JSON.stringify(likedImages));
            getLike(id);
            getImages();
            // console.log(id, likedImages)
        } else {
            await BaseApi.post('public/media/gallery/unlike/' + id)
            likedImages.splice(likedImages.indexOf(id), 1);
            Cookie.set('likedImages',JSON.stringify(likedImages));
            getImages();
            // localStorage.setItem('likedImages', likedImages)
        }

    }

    const getLike = (id) => {
        BaseApi.get('public/media/gallery/' + id)
            .then((res) => { console.log(res.data.data.likes) })
    }


    const getImages = () => {
        BaseApi.get("public/media/gallery").then((res) => {
            setImages(res.data.data)
            // console.log(res.data.data);
            console.log('data loaded')
        })
    }

    
    

    return (
        <div>
            <Head>
                <meta name="keywords" content="Sibaq results, sibaq final results " />
                <meta property="" />
                <meta name="author" content="Darul Huda Islamic University" />
                <meta property="og:url" content="https://sibaq.in/public_portal/explore" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="SIBAQ 2022 EXPLORE PHOTO GALLERY " />

                <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
                <title>SIBAQ 2022 | EXPLORE</title>
                {/* <link rel="icon" href="/assets/images/logo.png" /> */}
            </Head>
            <Layout title='Gallery' style={{ backgroundColor: '#2e0250', marginTop: '-1rem', paddingTop: '2rem' }}>


                <div className={styles.app}>
                    <div className={styles.gallery}>
                        {images.map((image) => (
                            <div className={styles.images}>
                                <div className={styles.top}>
                                    <LocationOnIcon className={styles.locationIcon} />
                                    <div className={styles.location}>{image.location}</div>
                                </div>
                                <img className={styles.photo} src={image.file.url} alt={"sibaq 2022 " + image.imageCaption} loading="lazy" />
                                <div className={styles.bottom}>
                                    <div className={styles.bottom1}>
                                        <div className={styles.item}>
                                            <ThumbUpIcon className={styles.likes}
                                                style={{ color: likedImages.includes(image.id) ? "blue" : "white" }}
                                                onClick={() => { likeHandler(image.id) }} />
                                            {image.likes} likes
                                        </div>
                                        <div className={styles.item}>
                                            <a download={"sibaqgallery.jpg" + image.likes} href={image.file.url} >
                                                < GetAppIcon />
                                                download
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.bottom2}>{image.imageCaption}</div>
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
            </Layout >
        </div >

    )



};

Gallery.getInitialProps = ({req})=>{
    const cookies = parseCookies(req);
    return {
        initialRememberValue : cookies.likedImages

    }
};
export default Gallery


import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/gallery.module.css"
import { useRouter } from 'next/router'
import Image from 'next/image'


function Gallery() {

    const images = [
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            size: '1x2',
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            size: '1x1',
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            size: '2x3',
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            size: '2x1',
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            size: '1x1',
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            size: '2x2',
            likes: 5,
            description: 'somthing got here in the description'
        },

        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            size: '1x1',
            likes: 5,
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            size: '1x1',
            likes: 5,
            description: 'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            size: '1x1',
            likes: 5,
            description: 'somthing got here in the description'
        },

    ]
    // function getSpanEstimate(height, width) {
    //     if (height > width) {
    //         return {
    //             gridRowEnd: `span ${Math.ceil(height / 10)}`,
    //             gridColumnEnd: `span ${Math.ceil(width / 10)}`,
    //         }
    //     }
    //     else{
    //         return {
    //             gridRowEnd: `span ${Math.ceil(height / 10)}`,
    //             gridColumnEnd: `span ${Math.ceil(width / 10)}`,
    //         }
    //     }
    // };
    function getSpanEstimate(size) {
        if (size === '1x1' || size === 'undefined') return { gridColumnEnd: 'span 1', gridRowEnd: 'span 1' }
        if (size === '1x2') return { gridColumnEnd: 'span 1', gridRowEnd: 'span 2' }
        if (size === '2x1') return { gridColumnEnd: 'span 2', gridRowEnd: 'span 1' }
        if (size === '2x2') return { gridColumnEnd: 'span 2', gridRowEnd: 'span 2' }
        if (size === '2x3') return { gridColumnEnd: 'span 2', gridRowEnd: 'span 3' }
    }

    const router = useRouter();
    return (
        <Layout title='Gallery'>
            <section className={styles.gallery}>
                <div className={`${styles.container} container`}>
                    {
                        images.map((img) => (
                            <article style={getSpanEstimate(img.size)} className={styles.imageContainer} key={img.id}>
                                {/* <img className={styles.img} src={img.url} alt={img.alt} loading="lazy" /> */}
                                <Image className={styles.img} src={img.image} layout='responsive' ></Image>
                                {/* <p className={styles.description}>{img.description}</p> */}
                            </article>
                        ))
                        // images.map((img) => (
                        //     <article className={styles.imageContainer} key={img.id}>
                        //         <img className={styles.img} src={img.url} alt={img.alt} loading="lazy" />
                        //         <p className={styles.description}>{img.description}</p>
                        //     </article>
                        // ))
                    }
                </div>
            </section>
        </Layout>

    )
}

export default Gallery
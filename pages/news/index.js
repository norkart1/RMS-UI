import Image from 'next/image'
import React from 'react'
import Layout from '../../components/layout'
import styles from '../../styles/news.module.css'


function News() {
    const news = [
        {
            id: 1,
            title: 'News 1',
            description: 'News 1 description goes here. News 1 description goes here. News 1 description goes here. News 1 description goes here. News 1 description goes here. News 1 description goes here. News 1 description goes here. News 1 description goes here. ',
            image: require('../../public/assets/dhiu_hd.jpg').default,
            date: '2020-01-01',
            tags: ['tag1', 'tag2']
        },
        {
            id: 1,
            title: 'News 1',
            description: 'News 1 description',
            image: require('../../public/assets/dhiu_hd.jpg').default,
            date: '2020-01-01',
            tags: ['tag1', 'tag2']
        },

    ]
    const notifications = [
        {
            id: 1,
            title: 'Notification 1',
            description: ' Notification 1 description. Notification 1 description. ',
            image: require('../../public/assets/sample.png').default,

        },
        {
            id: 1,
            title: 'Notification 1',
            description: ' Notification 1 description. Notification 1 description. ',
            image: require('../../public/assets/sample.png').default,

        },
        {
            id: 1,
            title: 'Notification 1',
            description: ' Notification 1 description. Notification 1 description. ',
            image: require('../../public/assets/sample.png').default,

        },
        {
            id: 1,
            title: 'Notification 1',
            description: ' Notification 1 description. Notification 1 description. ',
            image: require('../../public/assets/sample.png').default,

        },
    ]

    const tagArrayToString = (tags) => {
        let tagString = '#'
        return tagString += tags.join(', #')
    }

    return (
        <Layout title='News'>
            <section className={styles.news_section}>
                <div className={`${styles.container} container`}>
                    <div className={styles.news_container}>
                        {
                            news.map((news_item) => (
                                <div className={styles.news}>
                                    <Image className={styles.news_img} src={news_item.image} layout='responsive' ></Image>
                                    <div className={styles.news_content}>
                                        <h4>{news_item.title} </h4> <p>{news_item.description}</p>
                                        <div className={styles.news_details}>
                                            <p className={styles.news_date}> {news_item.date}</p>
                                            <p className={styles.news_tags}>{tagArrayToString(news_item.tags)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div></div>
                    <div className={styles.notification_container}>
                        <h3>Notifications</h3>
                        <div className={styles.line}></div>
                        <div className={styles.cards}>
                            {notifications.map((notification) => (
                                <div className={styles.card}>
                                    {/* <div> */}
                                        <Image className={styles.card_img} src={notification.image} layout='responsive' ></Image>
                                    {/* </div> */}
                                    <div className={styles.card_content}>
                                        <h4>{notification.title}</h4>
                                        <p className={styles.card_text}>{notification.description} </p>
                                    </div>
                                </div>
                            ))}


                        </div>

                    </div>
                </div>

            </section>
        </Layout >
    )
}

export default News
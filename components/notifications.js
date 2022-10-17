import React from 'react'
import styles from '../styles/component/comp_notifications.module.css'
import { data } from '../pages/news/sample_data'
import Image from 'next/image';
import { useRouter } from 'next/router';

function Notifications() {
    const router = useRouter();
    let notifications = data.notifications

    console.log(notifications);
    return (
        < div className = { styles.cards } >
        {
            notifications.map((notification) => (
                <div className={styles.card} onClick={() => router.push(notification.link)}>
                    <Image className={styles.card_img} src={notification.image} layout='responsive' ></Image>
                    <div className={styles.card_content}>
                        <h4>{notification.title}</h4>
                        <p className={styles.card_text}>{notification.description} </p>
                        <p className={styles.card_date}>{notification.date} </p>
                    </div>
                </div>
            ))
        }
        </div >
    )
}

export default Notifications
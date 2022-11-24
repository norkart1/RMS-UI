import React from 'react'
import styles from '../styles/component/comp_notifications.module.css'
import { data } from '../helpers/newfeeds_data'
import Image from 'next/image';
import { useRouter } from 'next/router';

function Notifications() {
    const router = useRouter();
    let notifications = data.notifications.sort((a, b)=>{
        return b.id - a.id  //this will sort according to .id descending
});

    return (
        < div className={styles.cards} >
            {
                notifications.map((notification, index) => (

                    <div className={styles.card} key={index} onClick={() => router.push(notification.link)}>
                        {/* <div className={styles.card_img_div}>
                            <Image className={styles.card_img} src={notification.image} layout={'responsive'} style={{ width: '30px', width: '30px' }} alt="sibaq logo"></Image>
                        </div> */}
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
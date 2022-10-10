import Image from "next/image";
import styles from "../styles/currentPrograms.module.css";
import big_logo from "../public/assets/big_logo_.png";
import people_icon from "../public/assets/people_icon.png"

import Layout from "../components/layout";

    

export default function CurrentPrograms() {
    return (
        <div>
            <Layout title={"CURRENT \n  PROGRAMMES"}> 
          
            <div className={styles.description}>
                <div className={styles.img}>
                    <Image src={people_icon} layout={"responsive"}></Image>
                </div>
                <h2>New programs are here.</h2>
                <p>At the fest of Sibaq 22, we aim to sharpen the immature skills by several means and through a number of competitions. The various skills of writing, oratory, aptitude, versatility and virtuosity are improved to equip the students with best in class expertise and professionalism. Engagement of 32 UG colleges and more than 2600 candidates leaves nothing more to tell !.</p>
            </div>
            </Layout>
        </div>
    )
}
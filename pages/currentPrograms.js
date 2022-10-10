import Image from "next/image";
import styles from "../styles/currentPrograms.module.css";
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
                <div className={styles.category}>
                <h3>CATEGORY</h3>
                    <a href="http://" target="_blank" rel="noopener noreferrer">BIDAYA</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">UOOLA</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">THANIYA</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">THANAVIYYA</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">ALIYA</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">KULLIYA</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">BIDAYA(NICS)</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">UOOLA(NICS)</a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">THANIYA(NICS)</a>
                </div>
            </Layout>
        </div>
    )
}
import Image from "next/image"
import styles from "../styles/component/comp_aboutUs.module.css"
export default function aboutUs() {
    return (
        <section id="about" className={styles.about}>
            <div className={`${styles.about_container} container`}>
                <div className={styles.about_container_img}>
                    <Image src="/assets/images/logo_rounded.png" layout="fill" ></Image>
                </div>
                <h2>ABOUT SIBĀQ</h2>
                <div className={styles.wrapper}>
                    <h3>Combating destiny<br />Reclaiming legacy</h3>
                    <p>SIBĀQ 2022, Darul Huda National Arts Fest is an intercollegiate arts fest conducted biennially, among under graduate colleges and off campuses of Darul Huda Islamic University. The event is officially sanctioned and supported by Darul Huda Islamic University and its Office of Academic Affairs (OAA) to support and promote development of educational activities of concerned students.</p>
                    <p>SIBĀQ 2022, Darul Huda National Arts Fest, from hereby addressed as the event that explores and stimulates creativity in various trending and traditional fields, and proudly celebrates Muslim traditional and cultural elements. The event, much recognized for enhancing skills, extra-curricular activities, creative thinking and productive interest of the students through skill oriented and talent based contests and programmes, has crucial role in the development of studentship in Darul Huda and is an eminent part of its curriculum.</p>
                </div>
            </div>
        </section>
    )
}

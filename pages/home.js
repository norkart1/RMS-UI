import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../styles/landing-page.module.css";
// images
import LoginBtn from "../public/assets/svg/login.svg";
import big_logo from "../public/assets/images/big_logo_.png"
import logo_shadow from "../public/assets/images/big_logo_shadow.png"
import dhiu from "../public/assets/images/dhiu.png"
import HomeMenu from "../components/homeMenu";
import Toppers from "../components/toppers";
import Footer from "../components/footer";
import Coutdown from "../components/coutdown";
import { useRouter } from "next/router";
import Banner from "../components/banner";
import BellIcon from "../public/assets/svg/bell.svg";
import Notifications from "../components/notifications";
import { useLocalStorage } from "../helpers/functions";
import { data } from '../helpers/newfeeds_data'
import AboutUs from "../components/aboutUs";

export default function LandingPage(  ) {
	const useScroll = () => {
		const [scrollTop, setScrollTop] = useState(0); // default width, detect on server.

		useEffect(() => {
			const handleScroll = () => setScrollTop(window.scrollY);
			handleScroll()
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}, [ ]);
		return scrollTop;
	};
	const router = useRouter()

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [notificationCount, setNotificationCount] = useState( data.notifications.length )
 const [readed , setReaded] = useLocalStorage('readed', false)
	return (
		<div className="">
			<Head>
				<title>Sibaq</title>
				<meta name="keywords" content="Sibaq, sibaq, sibaq-22 ,art fest ,sibaq.in , darul huda, " />
				<meta property="" />
				<meta name="author" content="Darul Huda Islamic University" />
				<meta property="og:url" content="https://www.sibaq.in" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Sibaq" />

				<meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
				<link rel="icon" href="/assets/images/logo.png" />
			</Head>

			<header className={styles.header}>
				<div className={`${styles.navbar} ${ useScroll() > 300 ? styles.scrolled : ''} `}>
					<div className={styles.bars} onClick={setIsMenuOpen}>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
					</div>
					<div className={styles.right}>
							{ readed == false ? 	<span>{notificationCount}</span> : null}
						{/* <LoginBtn onClick={() => router.push('/auth/login')} className={`${styles.navBtn} ${styles.navLoginBtn}`} /> */}
						<BellIcon onClick={() => setIsNotificationOpen(!isNotificationOpen)& setNotificationCount(0) & setReaded(true)   } className={`${styles.navBtn} ${styles.navBellIcon}`} />
					</div>
					<div className={`${styles.notification_container} ${isNotificationOpen ? styles.showing : ''}`}>
						<Notifications />
					</div>
				</div>
				<div className={styles.biglogoDiv}>
					<Image className={styles.logo} src={big_logo} layout="responsive" alt="sibaq 22 Logo" ></Image>
				</div>
				<div className={styles.bottomImageDiv}>
					<Image className={styles.bottomImage} src={dhiu} layout="responsive" alt="darul huda"></Image>
				</div>
				<div className={styles.logoShadowDiv}>
					<Image className={styles.logoShadow} src={logo_shadow} layout="responsive" alt="sibaq 22 Logot"></Image>
				</div>
			</header>
			<div className={isNotificationOpen ? styles.closeNotiTriggerer : ''} onClick={() => setIsNotificationOpen(false)}></div>


			<HomeMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<AboutUs />
			<Banner />
			{/* <Toppers /> */}
			<Coutdown />

			<Footer />

		</div>
	);
}

import Image from "next/image";
import styles from "../styles/currentPrograms.module.css";
import big_logo from "../public/assets/big_logo_.png";


export default function CurrentPrograms() {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Image src={big_logo} layout={"fill"}></Image>
                </div>
                <h1>CURRENT<br />PROGRAMS</h1>
            </header>
        </div>
    )
}
import Image from "next/image";
import styles from "../styles/currentPrograms.module.css";
import people_icon from "../public/assets/people_icon.png"

import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from "react";



export default function CurrentPrograms() {
    let [one,setOne] =useState('animate')
    let [two,setTwo] =useState(' ')
    let [three,setThree] =useState(' ')
    
    const router = useRouter()
    return (
        <div>
            <Layout title={"CURRENT \n  PROGRAMMES"}>

                <div className={`${styles.description} container`}>
                    <div className={styles.img}>
                        <Image src={people_icon} layout={"responsive"}></Image>
                    </div>
                    <h2>
                        <p className={`${styles[one]}`} onAnimationEnd={()=>{
 setOne(' '), setTwo('animate')
                        }}>New programs are here.</p>
                        <p className={`${styles[two]}`} onAnimationEnd={()=>{
                            setTwo(' '),setThree('animate')
                        }

                        }>Don't miss it.</p>
                        <p className={`${styles[three]}`} onAnimationEnd={()=>{
                            setThree(' '),setOne('animate')}}
                            >Make it soon.</p>
                    </h2>
                    <p>At the fest of Sibaq 22, we aim to sharpen the immature skills by several means and through a number of competitions. The various skills of writing, oratory, aptitude, versatility and virtuosity are improved to equip the students with best in class expertise and professionalism. Engagement of 32 UG colleges and more than 2600 candidates leaves nothing more to tell !.</p>
                </div>
                <div className={styles.category}>
                    <h3>CATEGORY</h3>
                    <ul>
                        <li onClick={()=>router.push('/category_BIDAYA')}>BIDAYA</li>
                        <li onClick={()=>router.push('/category_UOOLA')}>UOOLA</li>
                        <li onClick={()=>router.push('/category_THANIYA')}>THANIYA</li>
                        <li onClick={()=>router.push('/category_THANAVIYYA')}>THANAVIYYA</li>
                        <li onClick={()=>router.push('/category_ALIYA')}>ALIYA</li>
                        <li onClick={()=>router.push('/category_KULLIYA')}>KULLIYA</li>
                        <li onClick={()=>router.push('/category_BIDAYA-NICS')}>BIDAYA -NICS</li>
                        <li onClick={()=>router.push('/category_UOOLA-NICS')}>UOOLA -NICS</li>
                        <li onClick={()=>router.push('/category_THANIYA-NICS')}>THANIYA -NICS</li>
                    </ul>
                </div>
            </Layout>a
        </div>
    )
}


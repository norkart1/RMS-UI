import React, { useState } from 'react'
import styles from '../styles/component/comp_pagination.module.css'
import PreviousIcon from '../public/assets/svg/back.svg'

export default function pagination({ total, count, LoadTable }) {
    const [CurrentPage, setCurrentPage] = useState(1);
    { console.log(CurrentPage) }
    return (
        <div>
            <div className={styles.pagination}>
                <button className={styles.PaginationButton} onClick={() => { setCurrentPage(CurrentPage - 1); LoadTable(CurrentPage-1) }}><PreviousIcon height={16} /></button>
                {/* <p>page {CurrentPage} of {total/count}</p> */}
                <p>page {CurrentPage} of {30 / 10}</p>
                <button className={styles.PaginationButton} onClick={() => { setCurrentPage(CurrentPage + 1); LoadTable(CurrentPage+1) }}><PreviousIcon height={16} /></button>
            </div>
        </div>
    )
}

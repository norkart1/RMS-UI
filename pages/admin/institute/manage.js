import React, { useEffect, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'
// import styles from '../../../styles/manage.module.scss'
import styles from '../../../styles/portals/insti_manage.module.css'
import sampleData from '../../../helpers/sampleData/institute.json'


function Candidates() {
    const [activeTabName, setActiveTabName] = useState()
    const [activeChildTabName, setActiveChildTabName] = useState()
    // useEffect(() => {
    //     setExpandedTabName('Institutes')
    // })
    return (
        <Portal_Layout activeTabName='institutes' activeChildTabName='manage institutes' userType='admin'>
            <div>
                <div className={styles.pageContainer}>

                <h1>Institute Management</h1>
                <span theme='hr'></span>
                <div className={styles.dataContainer}>
                    <div className={styles.forms}>
                        <h2>Add or Edit Institute</h2>
                        <div className={styles.formContainer}>
                            <form action="#">
                                <label htmlFor="shortName" >Short Name</label><input theme='text' type="text" name='short' id='"shortName"' required />
                                <p theme="helper" >Eg:DHIU</p>
                                <label htmlFor="place">Place</label><input theme='text' type="text" name='place' id='"place"' required />
                                <p theme="helper">Eg: Chemmad</p>
                                <label htmlFor="FullName">Full Name</label><input theme='text' type="text" name='fullName' id='"FullName"' required />
                                <p theme="helper">Eg:Darul Huda</p>
                                <label htmlFor="email">Email</label><input theme='text' type="email" name='email' id='"email"' required />
                                <p theme="helper">Eg: mail@example.com</p>
                                {/* <label htmlFor="phone">Mobile</label><input theme='text' type="tel" name='phone' id='"phone"' required />
                                <p theme="helper">Eg: 1234567890</p> */}
                            </form>
                            <button theme='submit'>+ ADD</button>
                        </div>
                    </div>
                    <div className={styles.tables}>
                        <h2>Added Institutes</h2>
                        <table >
                            <tr>
                                <th>Month</th>
                                <th>Savings</th>
                                <th>Month</th>
                                <th>Savings</th>
                                <th>Month</th>
                                <th>Savings</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$100</td>
                                <td>1</td>
                                <td>$100</td>
                                <td>1</td>
                                <td>$100</td>
                            </tr>

                        </table>
                    </div>
                </div>
                </div>

            </div>
        </Portal_Layout>
    )
}

export default Candidates
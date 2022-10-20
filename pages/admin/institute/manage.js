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
                <h1>Institute Management</h1>
                <span type='hr'></span>
                <div className={styles.dataContainer}>
                    <div className={styles.forms}>
                        <h2>Add or Edit Institute</h2>
                        <div className={styles.formContainer}>
                            <form action="#">
                                <label htmlFor="shortName">Short Name</label><input type="text" />
                                <p type="helper">eg:DHIU</p>
                                <label htmlFor="place">Place</label><input type="text" />
                                <p type="helper">eg: Chemmad</p>
                                <label htmlFor="FullName">Full Name</label><input type="text" />
                                <p type="helper">eg:Darul Huda</p>
                                <label htmlFor="email">Email</label><input type="text" />
                                <p type="helper">eg: mail@example.com</p>
                                <label htmlFor="phone">Mobile</label><input type="text" />
                                <p type="helper">eg: 1234567890</p>
                            </form>
                            <button>+ ADD</button>
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
        </Portal_Layout>
    )
}

export default Candidates
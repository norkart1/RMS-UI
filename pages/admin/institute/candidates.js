import React, { useEffect, useState } from 'react'
import Portal_Layout from '../../../components/portal_Layout'


function Candidates() {
    const [activeTabName, setActiveTabName] = useState()
    const [activeChildTabName, setActiveChildTabName] = useState()
    // useEffect(() => {
    //     setExpandedTabName('Institutes')
    // })
    return (
        <Portal_Layout activeTabName='institutes' activeChildTabName='candidates' userType='admin'>
            <div>
                <h1>Candidates</h1>
            </div>
        </Portal_Layout>
    )
}

export default Candidates
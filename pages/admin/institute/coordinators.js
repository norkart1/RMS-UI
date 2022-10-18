import React, { useEffect, useState } from 'react'
import Portal_Layout from '../../../components/portal/portal_Layout'


function Coordinators() {
    const [activeTabName, setActiveTabName] = useState()
    const [activeChildTabName, setActiveChildTabName] = useState()
    // useEffect(() => {
    //     setExpandedTabName('Institutes')
    // })
    return (
        <Portal_Layout activeTabName='institutes' initExpandedTabName='institutes' activeChildTabName='coordinators' userType='admin'>
            <div>
                <h1>Coordinators</h1>
            </div>
        </Portal_Layout>
    )
}

export default Coordinators
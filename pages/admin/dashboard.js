import React, { useState } from 'react'
import Portal_Layout from '../../components/portal_Layout'

function Dashboard() {
    const [activeTabId, setActiveTab] = useState()
    const [activeChildTabId, setActiveChildTab] = useState()

    return (
        <Portal_Layout activeTabId = {1}>
            <div>

            </div>
        </Portal_Layout>
    )
}

export default Dashboard
import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'

function Dashboard() {
    return (
        <Portal_Layout activeTabName='dashboard' userType='institute'>
            <h1>Dashboard</h1>
        </Portal_Layout>
    )
}

export default Dashboard
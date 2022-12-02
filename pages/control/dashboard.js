import React from 'react'
import DashboardStats from '../../components/DashboardStats'
import Portal_Layout from '../../components/portal/portal_Layout'

function dashboard() {
    return (
        <Portal_Layout   activeTabName="Dashboard" userType="controller" useDefaultStyles={false} style={{gridArea:'page', overflowY:'auto', padding:'8rem 2rem 8rem 2rem'}}>
            <DashboardStats />
        </Portal_Layout>
    )
}

export default dashboard
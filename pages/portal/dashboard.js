import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions'

function Dashboard() {
    let userDetails
    userDetails = useGet('/coordinator/me', false, false, false, (err) => { }, false)[0]

    return (
        <Portal_Layout activeTabName='dashboard' userType='institute'  >
            <h1>Dash board</h1>
        </Portal_Layout>
    )
}

export default Dashboard
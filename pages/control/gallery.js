import React from 'react'
import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions'
import Image from 'next/image'

function Dashboard() {
  let userDetails
  userDetails = useGet('/user/me', false, false, false, (err) => { }, false)[0]

  // url    user/gallery/
//  post   sessionID
//  post   image
//  post   description

  
   

  return (
    <Portal_Layout activeTabName='Gallery' userType='controller'  >
      <h1>Gallary</h1>
 


    </Portal_Layout>

  )
}

export default Dashboard
import { useRouter } from 'next/router'
import React from 'react'
import s from '../styles/quick_links.module.css'

function QuickLinks() {
  const router = useRouter()
  const links = [
    {
      name: 'RESULTS',
      link: '/public_portal'
    },
    // {
    //   name: 'SCAN QR CODE',
    //   link: '/public_portal/scan_qr_code'
    // },
    // {
    //   name: 'LOGIN',
    //   link: '/auth/login'
    // },
    // {
    //   name: 'Scan QR Code',
    //   link: '/auth/login'
    // },

    
  ]
  return (
    <div className={s.container}>
      <ul>
        {links.map((link, index) => (
          <li key={index} onClick={()=> router.push(link.link)} className='isSpecial'>
            {link.name}
          </li>
        ))}

      </ul>
    </div>
  )
}

export default QuickLinks

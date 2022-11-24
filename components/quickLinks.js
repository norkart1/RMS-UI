import { useRouter } from 'next/router'
import React from 'react'
import s from '../styles/quick_links.module.css'

function QuickLinks() {
  const router = useRouter()
  const links = [
    {
      name: 'Go to results',
      link: '/public_portal/elimination_results'
    },
    {
      name: 'Login',
      link: '/auth/login'
    },
    // {
    //   name: 'Scan QR Code',
    //   link: '/auth/login'
    // },

    
  ]
  return (
    <div className={s.container}>
      <ul>
        {links.map((link, index) => (
          <li key={index} onClick={()=> router.push(link.link)}>
            {link.name}
          </li>
        ))}

      </ul>
    </div>
  )
}

export default QuickLinks

import React from 'react'
import s from '../styles/quick_links.module.css'

function QuickLinks() {
  const links = [
    {
      name: 'About Us',
      link: '/about'
    },
    {
      name: 'Contact Us',
      link: '/contact'
    },
    {
      name: 'FAQs',
      link: '/faqs'
    },
    
  ]
  return (
    <div className={s.container}>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {link.name}
          </li>
        ))}

      </ul>
    </div>
  )
}

export default QuickLinks

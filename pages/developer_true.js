import React from 'react'
import { useEffect } from 'react'

export default function _() {
    useEffect(() => {
        
        localStorage.setItem('developer','true')  
        alert('Developer mode enabled: '+localStorage.getItem('developer'))
    }, [])
    
  return (
    <div>
    </div>
  )
}

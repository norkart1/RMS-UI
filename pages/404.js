import React from 'react'

function Error() {
  return (
    <div style={{textAlign:'center', height: '100vh',  display:'flex', flexDirection:'column' }}>
        <div style={{flexGrow: '1'}}></div>
        <h1 style={{flexGrow: '0', flexShrink:'1',margin: '.7rem', color:'gray', fontSize:'3rem' }}>404</h1>
        <h1 style={{flexGrow: '0', flexShrink:'1',margin: '.7rem', color:'gray', fontSize:'3rem' }}>Invalid url or <br /> Page is not active now.</h1>
        <a href={'/'} style={{flexGrow: '0', flexShrink:'1',margin: '.7rem', color:'gray', fontSize:'1.5rem', textDecoration:'underline' }}>Back to Home page</a>
        <h1 style={{flexGrow: '0', flexShrink:'1',margin: '.7rem', color:'gray', fontSize:'1.5rem' }}>&copy; Sibaq.dhiu.in</h1>
        
        <div style={{flexGrow: '1'}}></div>
    </div>
  )
}

export default Error
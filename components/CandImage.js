import React from 'react'

function CandImage({ src, width = '10rem', height = '15rem', style = {}, className }) {
  return (
    <div
      className={className}
      style={{
        margin: 'auto',
        backgroundImage: `url(${src})`,
        flex: '0 0 0',
        height: { height },
        borderRadius: '1rem',
        border: '.2rem solid #15151f4e',
        width: { width },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...style
      }}>
    </div >

  )
}

export default CandImage

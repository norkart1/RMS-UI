import React from 'react'
import LoadingSvg from '../public/assets/svg/loading.svg'

function Loader() {
  return (
    <div className='loader__container'>
      {/* <img className='loader' src="" alt="" /> */}
      <LoadingSvg className='loader' />
    </div>
  )
}

export default Loader

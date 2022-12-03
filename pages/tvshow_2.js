import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TvShowTable from '../components/TvShowTable'

export default function Tvshow_1() {
  const router = useRouter()
  const [maxCount, setMaxCount] = useState(50)
  useEffect(() => {
    setTimeout(() => {

      router.push('/tvshow_1')

    }, 1000 * 60 * 2);


  }, [])
  return (
    <div>
      <TvShowTable sessionID={2} maxCount={maxCount} />
    </div>
  )
}

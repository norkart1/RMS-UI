import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TvShowTable from '../components/TvShowTable'

export default function Tvshow_1() {
  const defaultMaxCount = 20
  const router = useRouter()
  const [maxCount, setMaxCount] = useState(defaultMaxCount)

  useEffect(() => {
    setTimeout(() => {

      router.push('/tvshow_2')

    }, 1000 * 60 * 2);
    localStorage.getItem('maxCount') ? setMaxCount(localStorage.getItem('maxCount')) : setMaxCount(defaultMaxCount)
  }, [])

  return (
    <div>
      <TvShowTable maxCount={maxCount} />
    </div>
  )
}

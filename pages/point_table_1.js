import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PointTable from '../components/pointtable'
import TvShowTable from '../components/TvShowTable'

export default function Tvshow_1() {
  const defaultCat = 1
  const router = useRouter()
  const [cat, setCat] = useState(defaultCat)

  useEffect(() => {
    // setTimeout(() => {

    //   router.push('/tvshow_2')

    // }, 1000 * 60 * 2);
    localStorage.getItem('categoryID') ? setCat(localStorage.getItem('categoryID')) : setCat(defaultCat)
  }, [])

  return (
    <div>
      <PointTable sessionID={1} categoryID={cat} />
    </div>
  )
}

import React from 'react'
import ResultCard from '../components/ResultCard'

export default function Test2() {
  return (
    <div>
      <a
        download href={`/api/saveimg2?candidate[name]=${'item.candidate.name'}&candidate[photo][url]=${'item.candidate.photo?.url'}&candidate[chestNO]=${'item.candidate.chestNO'}&grade=${'item.grade'}&position=${'item.position'}`}
      >
        <button>download</button>
        
      </a>
      <ResultCard />
    </div>
  )
}

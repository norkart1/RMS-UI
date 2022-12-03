import { toJpeg } from 'html-to-image'
import React from 'react'
import ResultCard from '../components/ResultCard'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default function Test2() {

  // const photo = "https://www.w3schools.com/howto/img_avatar.png"

  
  return (
    <div>

      <a
        href={`/api/saveimg2?candidate[name]=${'item.candidate.name'}&candidate[photo][url]=${'item.candidate.photo?.url'}&candidate[chestNO]=${'item.candidate.chestNO'}&grade=${'item.grade'}&position=${'item.position'}`}
      >
        <button>download</button>

      </a>
      <button onClick={async () => {

        const photo_canvas = document.getElementById('photo_canvas');




        domtoimage.toBlob(document.getElementById('result_card')).then(function (blob) {
          // window.saveAs(blob, 'my-node.png');
          saveAs(blob, 'my-node.png');
        })
      }}>
        dow 2</button>
      <ResultCard />
      <img src="" alt="" id="img" />
    </div>
  )
}

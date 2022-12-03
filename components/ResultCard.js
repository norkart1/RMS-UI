// import React from 'react';
// import imgResultCard from '../public/assets/score_card/card.jpg'
// import { render } from 'react-dom';
// import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from 'konva';

import { useEffect } from "react"

function ResultCard({ name = "John Doe", programName = "Program Name", position = "First", grade = "A", photo = "https://last-db.s3.amazonaws.com/candidate-12.jpg" }) {
    const width = 1440
    const height = 2560
    const result_card_imgs = [
        '/assets/score_card/first.jpg',
        '/assets/score_card/second.jpg',
        '/assets/score_card/third.jpg',

    ]

    const imgResultCard = 'assets/score_card/card.jpg'

    const resolution = '200px'
    const resNum = parseInt(resolution.replace('px', ''))

    useEffect(() => {
        const photo_canvas = document.getElementById('photo_canvas');
        const photo_ctx = photo_canvas.getContext('2d');
        const photo_img = new Image();
        photo_img.crossOrigin="anonymous"
        photo_img.src = photo;
        photo_img.onload = () => {
            photo_ctx.drawImage(photo_img, 0, 0, resNum, resNum);
        }

    }, [])

    return (


        <div style={{
            top: 0,
            left: 0,
            overscrollBehavior: 'none',
            position: 'relative',
            margin: '0',
            fontSize: '20px',
            color: 'white',
            width: `calc(${resolution} * 4)`,
            height: `calc(${resolution} * 5)`,
            backgroundImage: `url(${imgResultCard})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
        }}
            id='result_card'>
            <div style={{
                position: 'absolute',
                zIndex: 2,
                top: `calc(${resolution} * 1 )`,
                left: `calc(${resolution} * 1.2 )`,
                fontWeight: 'bold',
            }}>
                {/* <div id="candPhoto" style={{
                    backgroundImage: `url(${photo})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: `calc(${resolution} * .6 )`,
                    height: `calc(${resolution} * .7 )`,
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
                }}

                >
                </div> */}
                <img src={`${photo}`} alt="" />
                <canvas
                    width={resNum * .6}
                    height={resNum * .7}
                    style={{
                        border: '1px solid red',
                    }}
                    object-fit='cover'

                    id='photo_canvas'
                />

                <div style={{
                    marginTop: `calc(${resolution} * .3 )`,
                    color: position.toLowerCase() == 'first' ? 'gold' : position.toLowerCase() == 'second' ? 'silver' : position.toLowerCase() == 'third' ? '#f19191' : 'white',
                    fontSize: `calc(${resolution} * .2 )`,
                }}>{position.toUpperCase()}</div>
                <div style={{
                    fontSize: `calc(${resolution} * .15 )`,
                }}>{grade.toUpperCase()}</div>
                <div style={{
                    marginTop: `calc(${resolution} * .3 )`,
                }}>{name.toUpperCase()}</div>
                <div >{programName.toUpperCase()}</div>
            </div>

            {/* <img src={imgResultCard} width="100%" ></img> */}
        </div>




        // <div className={`${s.resulCard} ${isResultCardShown ? '' : s.isNotShown}`}>
        //     <div>
        //         sdfasd
        //         <canvas className={s.canvas} id='canvas2' width={width} height={height} ></canvas>
        //         <canvas className={s.canvas} id='canvas' width={width} height={height} ></canvas>
        //     </div>
        // </div>
    )
}

export default ResultCard
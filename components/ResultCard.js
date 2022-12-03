import s from '../styles/result_card.module.css'
import React, { Component } from 'react';
import { useEffect } from 'react';
import Image from 'next/image'
// import imgResultCard from '../public/assets/score_card/card.jpg'
// import { render } from 'react-dom';
// import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from 'konva';

function ResultCard({ name = "John Doe", programName = "Program Name", position = "Position", grade = "Grade", photo = "https://www.w3schools.com/howto/img_avatar.png" }) {
    const width = 1440
    const height = 2560
    const result_card_imgs = [
        '/assets/score_card/first.jpg',
        '/assets/score_card/second.jpg',
        '/assets/score_card/third.jpg',

    ]

    const imgResultCard =  'assets/score_card/card.jpg'

    return (

        <div className={s.resultCard} >
            <div className={s.card}>
                <div className={s.contents}>
                    <div className={s.name}>{name}</div>
                    <div className={s.programName}>{programName}</div>
                    <div className={s.position}>{position}</div>
                    <div className={s.grade}>{grade}</div>
                </div>

                <img src={imgResultCard}  ></img>
            </div>
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
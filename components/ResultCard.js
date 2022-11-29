import s from '../styles/result_card.module.css'
import React, { Component } from 'react';
import { useEffect } from 'react';
// import { render } from 'react-dom';
// import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from 'konva';

function ResultCard({ isResultCardShown = true }) {
    const width = 1440
    const height = 2560
    const result_card_imgs = [
        '/assets/score_card/first.jpg',
        '/assets/score_card/second.jpg',
        '/assets/score_card/third.jpg',

    ]







    return (
        <div className={`${s.resulCard} ${isResultCardShown ? '' : s.isNotShown}`}>
            <div>

                <canvas className={s.canvas} id='canvas2' width={width} height={height} ></canvas>
                <canvas className={s.canvas} id='canvas' width={width} height={height} ></canvas>
            </div>


            

        </div>
    )
}

export default ResultCard
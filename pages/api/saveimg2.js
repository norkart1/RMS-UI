import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import ResultCard from "../../components/ResultCard";
import s from '../../styles/result_card.module.css'
// import imgResultCard from '../public/assets/score_card/card.jpg'

export const config = {
    runtime: "experimental-edge",
};


export default function handler(req) {
    const name = "John Doe"
    const programName = "Program Name"
    const position = "First"
    const grade = "A"
    const photo = "https://www.w3schools.com/howto/img_avatar.png"
    try {
        const { searchParams } = new URL(req.url);

        function Q(q) {
            return searchParams.get(q);
        }

        return new ImageResponse(
            (
                // <div style={{color:'green'}}>I AM ASHRAF</div>

                // <img src={photo} alt="" />
                // <ResultCard />

                <div style={{
                    top: 0,
                    left: 0,
                    overscrollBehavior: 'none',
                    position: 'relative',
                    margin: '0',
                    fontSize: '20px',
                    color: 'white',
                    width: `calc(200px * 4)`,
                    height: `calc(200px * 5)`,
                    backgroundImage: `url(assets/score_card/card.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    overflow: 'hidden',
                }}>
                    <p>HI KLASDJFLDJSKFL</p>
                    <div style={{
                        position: 'absolute',
                        zIndex: 2,
                        top: `calc(200px * 1 )`,
                        left: `calc(200px * 1.2 )`,
                        fontWeight: 'bold',
                    }}>
                        <div id="candPhoto" style={{
                            // backgroundImage: `url(${photo})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width: `calc(200px * .6 )`,
                            height: `calc(200px * .7 )`,
                            borderRadius: '10px',
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
                        }}>
                        </div>
                        <div style={{
                            marginTop: `calc(200px * .3 )`,
                            // color: position.toLowerCase() == 'first' ? 'gold' : position.toLowerCase() == 'second' ? 'silver' : position.toLowerCase() == 'third' ? '#f19191' : 'white',
                            fontSize: `calc(200px * .2 )`,
                        }}>'position.toUpperCase()</div>
                        <div style={{
                            fontSize: `calc(200px * .15 )`,
                        }}>grade.toUpperCase()</div>
                        <div style={{
                            marginTop: `calc(200px * .3 )`,
                        }}>name.toUpperCase()</div>
                        <div >programName.toUpperCase()</div>
                    </div>

                    {/* <img src={imgResultCard} width="100%" ></img> */}
                </div>


            ),
            {
                width: 800,
                height: 1000,
                // width: 850,
                // height: 1000,
            }
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import ResultCard from "../../components/ResultCard";
import s from '../../styles/result_card.module.css'
// import imgResultCard from '../public/assets/score_card/card.jpg'

export const config = {
  runtime: "experimental-edge",
};


export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    function Q(q) {
      return searchParams.get(q);
    }

    return new ImageResponse(
      (
        // <div style={{fontSize:'5rem'}}>I AM ASHRAF</div>

        <ResultCard />
        // <div
        //   style={{
        //     backgroundColor: "white",
        //     backgroundSize: "150px 150px",
        //     height: "100%",
        //     width: "100%",
        //     display: "flex",
        //     textAlign: "center",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     flexDirection: "column",
        //     flexWrap: "nowrap",
        //     color: "black",
        //     // backgroundImage: `url("/firstframe.png")`,
        //   }}
        // >
        //   <div>{Q("candidate[name]")}</div>
        //   <div>{Q("programName")}</div>
        //   <div style={{ fontSize: "30px", color: "red" }}>{Q("position")}</div>
        //   <div style={{ fontSize: "30px", color: "blue" }}>{Q("grade")}</div>
        //   <div
        //     style={{
        //       width: "200px",
        //       display: "flex",
        //       height: "200px",
        //       borderRadius: "50%",
        //       overflow: "hidden",
        //     }}
        //   >
        //     <img height={"200px"} src={Q("candidate[photo][url]")} />
        //   </div>

        //   <div
        //     style={{
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       justifyItems: "center",
        //     }}
        //   ></div>
        // </div>
      ),
      {
        width: 200,
        height: 250,
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

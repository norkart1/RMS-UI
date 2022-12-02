import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
// import { Frame1 } from "../media/svgfuntions";  

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
        <div
          style={{
            backgroundColor: "blue",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            color: "black",
            // focus on the image center
            backgroundPosition: "center",

            // scale the image to fit the container
            backgroundSize: "cover",

          }}
        >
           
          <div>{Q("candidate[name]")}</div>
          <div>{Q("programName")}</div>
          <div style={{ fontSize: "30px", color: "red" }}>{Q("position")}</div>
          <div style={{ fontSize: "30px", color: "blue" }}>{Q("grade")}</div>
          <div
            style={{
              width: "200px",
              display: "flex",
              height: "200px",
              borderRadius: "50%",
              // focus on the image center
              backgroundPosition: "center",
              overflow: "hidden",
            }}
          >
            <img height={"200px"} src={Q("candidate[photo][url]")} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          ></div>
        </div>
      ),
      {
        width: 850,
        height: 1000,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

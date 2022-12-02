var download = function (href, name) {
  var link = document.createElement("a");
  link.download = name;
  link.style.opacity = "0";
  document.body.append(link);
  link.href = href;
  link.click();
  link.remove();
};

function GenImg({ pic, name }) {
  if (typeof window !== "undefined") {
    let data = `<svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  
   <style>
    .small {
      font: italic 13px sans-serif;
    }
    .heavy {
      font: bold 30px sans-serif;
    }

    /* Note that the color of the text is set with the    *
     * fill property, the color property is for HTML only */
    .Rrrrr {
      font: italic 40px serif;
      fill: red;
      text-align: center;
    }
  </style>
    <rect width="390" height="844" fill="white"/>
  <ellipse cx="195" cy="330.5" rx="89" ry="91.5" fill="url(#pattern0)"/>


  <text x="50%" y="390"   class="Rrrrr" text-anchor="middle">TEXT</text>    
  
 

  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_1_3" transform="translate(-0.489775 -0.116336) scale(0.000465293 0.00045258)"/>
  </pattern>
  <image id="image0_1_3" width="3912" height="2608" xlink:href=""/>
  </defs>
  </svg>
`;
    var DOMURL = window.URL || window.webkitURL || window;

    // var img = new Image();
    var svg = new Blob([data], {
      type: "image/svg+xml;charset=utf-8",
    });
    var url = DOMURL.createObjectURL(svg);
    let image = document.createElement("img");
    image.src = url;
    let canvas = document.createElement("canvas");
    let dataURL;
    image.onload = function () {
      let width = image.width;
      let height = image.height;
      canvas.width = width;
      canvas.height = height;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);

      dataURL = canvas.toDataURL("image/png");
      let jpeg = canvas.toDataURL("image/jpg");
      download(jpeg, "image.png");
    };
  }
}

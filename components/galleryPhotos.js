// // const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

// // const unsplashLink = (id, width, height) =>
// //     `https://source.unsplash.com/${id}/${width}x${height}`;

// // const unsplashPhotos = [
// //     { id: "Osq7UAVxIOI", width: 1080, height: 780 },
// //     { id: "Dhmn6ete6g8", width: 1080, height: 1620 },
// //     { id: "RkBTPqPEGDo", width: 1080, height: 720 },
// //     { id: "Yizrl9N_eDA", width: 1080, height: 721 },
// //     { id: "KG3TyFi0iTU", width: 1080, height: 1620 },
// //     { id: "Jztmx9yqjBw", width: 1080, height: 607 },
// //     { id: "-heLWtuAN3c", width: 1080, height: 608 },
// //     { id: "xOigCUcFdA8", width: 1080, height: 720 },
// //     { id: "1azAjl8FTnU", width: 1080, height: 1549 },
// //     { id: "ALrCdq-ui_Q", width: 1080, height: 720 },
// //     { id: "twukN12EN7c", width: 1080, height: 694 },
// //     { id: "9UjEyzA6pP4", width: 1080, height: 1620 },
// //     { id: "sEXGgun3ZiE", width: 1080, height: 720 },
// //     { id: "S-cdwrx-YuQ", width: 1080, height: 1440 },
// //     { id: "q-motCAvPBM", width: 1080, height: 1620 },
// //     { id: "Xn4L310ztMU", width: 1080, height: 810 },
// //     { id: "ls94iFAQerE", width: 1080, height: 1620 },
// //     { id: "X48pUOPKf7A", width: 1080, height: 160 },
// //     { id: "GbLS6YVXj0U", width: 1080, height: 810 },
// //     { id: "9CRd1J1rEOM", width: 1080, height: 720 },
// //     { id: "xKhtkhc9HbQ", width: 1080, height: 1440 },
// // ];

// // const photos = unsplashPhotos.map((photo) => {
// //     const width = breakpoints[0];
// //     const height = (photo.height / photo.width) * width;

// //     return {
// //         src: unsplashLink(photo.id, width, height),
// //         width,
// //         height,
// //         images: breakpoints.map((breakpoint) => {
// //             const height = Math.round((photo.height / photo.width) * breakpoint);
// //             return {
// //                 src: unsplashLink(photo.id, breakpoint, height),
// //                 width: breakpoint,
// //                 height,
// //             };
// //         }),
// //     };
// // // });

// // export default photos;

// const photos = [
//     {
//         id: 1,
//         // image: require('../public/assets/banners/art.jpg').default,
//         src: '../public/assets/banners/art.jpg',
//         likes: 5,
//         size: '2x1',
//         height : 200,
//         width: 100,
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 1,
//         image: require('../public/assets/gallery-images/1x1_4.jpg').default,
//         likes: 5,
//         size: '2x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 1,
//         image: require('../public/assets/gallery-images/2x2_2.png').default,
//         likes: 5,
//         size: '2x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 2,
//         image: require('../public/assets/gallery-images/2x3_6.jpg').default,
//         likes: 5,
//         size: '2x3',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 3,
//         image: require('../public/assets/gallery-images/1x1_3.png').default,
//         likes: 5,
//         size: '1x1',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 4,
//         image: require('../public/assets/gallery-images/1x1_1.jpg').default,
//         likes: 5,
//         size: '1x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 5,
//         image: require('../public/assets/gallery-images/1x1_2.jpg').default,
//         likes: 5,
//         size: '2x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 6,
//         image: require('../public/assets/gallery-images/2x2_3.jpg').default,
//         likes: 5,
//         size: '2x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 7,
//         image: require('../public/assets/gallery-images/2x2_1.jpg').default,
//         likes: 5,
//         size: '2x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 8,
//         image: require('../public/assets/gallery-images/2x3_1.jpg').default,
//         likes: 5,
//         size: '2x3',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 9,
//         image: require('../public/assets/gallery-images/2x3_2.jpg').default,
//         likes: 5,
//         size: '2x3',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 10,
//         image: require('../public/assets/gallery-images/2x3_3.jpg').default,
//         likes: 5,
//         size: '2x2',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 11,
//         image: require('../public/assets/gallery-images/2x3_4.jpg').default,
//         likes: 5,
//         size: '1x3',
//         description: 'somthing got here in the description'
//     },
//     {
//         id: 12,
//         image: require('../public/assets/gallery-images/2x3_5.jpg').default,
//         likes: 5,
//         size: '1x3',
//         description: 'somthing got here in the description'
//     },
// ]

// export default photos
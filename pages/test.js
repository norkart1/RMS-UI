// import React from 'react'
// import Select from 'react-select'
// import Layout from '../../components/public_portal/Layout'
// import s from '../../styles/public_portal/fin_result.module.css'
// import baseApi from '../../api/baseApi'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { catIdtoName, reverseArray, share, timeToAgo } from '../../helpers/functions'
// import Loader from '../../components/loader'
// import CandImage from '../../components/CandImage'
// import { useRouter } from 'next/router'
// import ShareIcon from '@mui/icons-material/Share';

// export default function FinalResults() {
//   const [publishedPrograms, setPublishedPrograms] = useState([]);
//   const [searchOptions, setSearchOptions] = useState([]);
//   const [categoryOpts, setCategoryOpts] = useState([]);
//   const [isResultShown, setIsResultShown] = useState(false);
//   const [selectedProgram, setSelectedProgram] = useState();
//   const [programResults, setProgramResults] = useState([]);
//   const [sessionId, setSessionId] = useState("1");
//   const [isListLoading, setIsListLoading] = useState(true);

//   const [isResultLoading, setIsResultLoading] = useState(false);
//   const router = useRouter()

//   useEffect(() => {
//     const prCodeFromUrl = window.location.href.includes('#') ? window.location.href.substring(window.location.href.lastIndexOf('#') + 1) : null;
//     window.prCodeFromUrl = prCodeFromUrl
     
//     if (prCodeFromUrl != undefined) {
//       showResult({ programCode: prCodeFromUrl.toUpperCase() })
//     }
//     // getPrograms()
//     setIsListLoading(true);
//     baseApi
//       .get(`public/final-result/programs/published?sessionID=${sessionId}`)
//       .then((res) => {
//         setPublishedPrograms(res.data.data);
         
//         setSearchOptions([]);
//         res.data.data.map((program) => {
//           setSearchOptions((prev) => [
//             ...prev,
//             {
//               value: program.id,
//               label: program.name + " - " + catIdtoName(program.categoryID),
//               programCode: program.programCode,
//               program,
//             },
//           ]);
//         });
//       })
//       .finally(() => {
//         setIsListLoading(false);
//       });
//     baseApi
//       .get(`/public/final-result/categories?sessionID=${sessionId}`)
//       .then((res) => {
//         setCategoryOpts([{ value: null, label: "ALL" }]);
//         res.data.data.map((category) => {
//           setCategoryOpts((prev) => [
//             ...prev,
//             { value: category.id, label: category.name, category },
//           ]);
//         });
//       });
//   }, [sessionId]);

//   const handleProgramClick = (program) => {
//     // router
//     showResult(program);
//   };
//   const handleSearchSelectionChange = (program) => {
//     showResult(program);
//   };
//   const handleCategorySelectChange = (category) => {
//     // setPublishedPrograms(programs => programs.filter(p => p.categoryID == category.id))
//     category ? getPrograms(category.id) : getPrograms();
//     //
//   };
//   const getPrograms = (catID) => {
//     baseApi
//       .get(`public/final-result/programs/published?sessionID=${sessionId}`)
//       .then((res) => {
//         if (catID)
//           setPublishedPrograms(
//             res.data.data.filter((item) => item.categoryID == catID)
//           );
//         else setPublishedPrograms(res.data.data);
//         //  
//       });
//   };
//   const showResult = (program) => {
//     setSelectedProgram(program)
//     baseApi.get(`public/final-result/program/${program.programCode}`).then((res) => {
//       setProgramResults(res.data.data)
//       //  
//     }).then(() => {
//       setIsResultShown(true)
//     })
//   }

//   const sessionOpts = [
//     { value: "1", label: "NON-NIICS" },
//     { value: "2", label: "NIICS" },
//   ];



//   const handleShareClick = () => {
    
//     const url = window.location.href
//     //  
//     if (url.includes('#')) {
//       share(url.substring(0, url.lastIndexOf('#')) + '#' + selectedProgram.programCode)
//     }
//     else {
//       share(url + '#' + selectedProgram.programCode)
//     }

//     const urlToShare = url.substring(0, url.lastIndexOf('#')) + '#' + selectedProgram.programCode
//     navigator?.clipboard?.writeText(urlToShare).then(()=>alert('copied'))
//     //  
//     // alert('Link copied to clipboard '+ urlToShare)
//     //  
//     // share(urlToShare)
//   }

//   return (
//     <Layout openedTabName={`final results`}>
//       <div className={s.pageContainer}>
//         <div className={s.header}>
//           <h1 style={{ margin: "0" }}>Final Round Results</h1>
//           <div className="flex-grow"></div>
//           <Select
//             className={s.selectSession}
//             isSearchable={false}
//             options={sessionOpts}
//             onChange={(e) => setSessionId(e.value)}
//             placeholder={"NON-NIICS"}
//           ></Select>
//         </div>
//         <div className={`${s.searchAreaIn1} ${s.stickySearch}`}>
//           <img className={s.SearchImg} src="/assets/png/search.png" alt="" />
//           <Select
//             className={s.searchSelect}
//             options={categoryOpts}
//             onChange={(e) => handleCategorySelectChange(e.category)}
//             placeholder="Select Category"
//             styles={{ width: "fit-content" }}
//           ></Select>
//           <Select
//             className={s.searchSelect}
//             options={searchOptions}
//             onChange={(e) => handleSearchSelectionChange(e.program)}
//             placeholder="Search and Select Programs"
//           ></Select>
//           <h4 style={{ color: "#ba81c4", padding: "1rem", margin: 0 }}>
//             Total results published: {publishedPrograms.length}
//           </h4>
//         </div>
//         <div className={s.programCards}>
//           {isListLoading ? (
//             <Loader />
//           ) : (
//             publishedPrograms.map((item, index) => {
//               const SiNo = index + 1;
//               return (
//                 <div
//                   className={s.programItem}
//                   key={index}
//                   onClick={() => handleProgramClick(item)}
//                 >
//                   <p>
//                     {SiNo}. {item.name} ({catIdtoName(item.categoryID)})
//                   </p>
//                   <div className="flex-grow"></div>
//                   <p>{timeToAgo(item.updated_at).toString()}</p>
//                   {/* <p>{new Date(item.updated_at).toString()}</p> */}
//                   {/* <p>Just now</p> */}
//                 </div>
//               );
//             })
//           )}
//         </div>

//         <div className={`${s.resultShow} ${isResultShown ? s.isShown : ""}`}>
//           <div
//             className={s.divCloseBtn}
//             style={{ marginBottom: "2rem" }}
//             onClick={() => setIsResultShown(false)}
//           >
//             <img className={s.btnClose} src="/assets/svg/close.svg" />
//           </div>
//           <button onClick={handleShareClick} className='btn_share'
//           style={{marginLeft:'2rem'}}
//           >
//             <ShareIcon />
//           </button>
//           <h1 style={{ marginLeft: '2rem' }}>RESULTS OF <br /> {programResults[0]?.programName} {catIdtoName(programResults[0]?.categoryID)} </h1>

//           <div className={s.resultCards}>
//             {programResults.map((item, index) => (
//               <div
//                 className={s.card}
//                 key={index}
//                 data-pos={item.position}
//                 id={index}
//               >
//                 <div className={s.resultContents} data-pos={item.position}>
//                   <h2 className={s.pos}>{item.position?.toUpperCase()}</h2>
//                   <h2 className={s.grade}>{item.grade} GRADE</h2>
//                   <h3 className={s.instiName}>{item.institute?.shortName}</h3>
//                   <h3 className={s.instiShortName}>{item.institute?.name.toUpperCase()}</h3>
//                   {
//                     item.program.type == 'group' ? '' :
//                       <div className={s.candDetails} >
//                         <div className={s.candImage} style={{ backgroundImage: `url(${item.candidate.photo.url})` }}></div>
//                         {/* <CandImage src={item.candidate.photo.url} height='90rem' /> */}
//                         <div>

//                           <p style={{ maxWidth: '15rem' }}><b>{item.candidate.name.toUpperCase()}</b></p>
//                           <p>{item.candidate.chestNO}</p>

//                         </div>
//                       </div>
//                   }
                  
//                 </div>
//                 <div
//                   className={s.instiPhoto}
//                   style={{
//                     backgroundImage: `url(${item.institute?.coverPhoto?.url})`,
//                   }}
//                 ></div>

//                 {/* <p>{item.institute?.shortName}</p> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }


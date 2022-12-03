// import "../styles/globals.css";
// import Message from "../components/Message";
// import Head from "next/head";
// import Script from "next/script";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
// import { useRef } from 'react';

// function chat({ Component, pageProps }) {
//   const tawkMessengerRef = useRef();

//   const handleMinimize = () => {
//     tawkMessengerRef.current.minimize();
//   };
//   return (
//     <>
//       <Component {...pageProps} />
//       <button onClick={handleMinimize}> Minimize the Chat </button>

//       <TawkMessengerReact
//         propertyId={process.env.PUBLIC_TWAKTO_PROPERTY_ID}
//         widgetId={process.env.PUBLIC_TWAKTO_WIDGET_ID}
//         useRef={tawkMessengerRef}
//       />
//     </>
//   );
// }



import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

function Chat() {
  return (
    <div className="App" >
      <TawkMessengerReact
        propertyId="635ffbbeb0d6371309cc8277"
        widgetId="1ggneuoq1" />
    </div>
  );
}
export default Chat;
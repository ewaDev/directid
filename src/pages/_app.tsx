import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
      <div className="main">
        <Component {...pageProps} />
      </div>
  );
}
export default MyApp;

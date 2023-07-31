import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className="main">
        <Component {...pageProps} />
      </div>
  );
}
export default MyApp;

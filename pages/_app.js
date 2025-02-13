import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Drawers from "../pages/slidebar"
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Drawers>
      <Component {...pageProps} />
      </Drawers>
      </SessionProvider>
     
      
  );
}

export default MyApp;

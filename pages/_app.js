import { SessionProvider } from "next-auth/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect } from "react";
import Drawers from "../pages/slidebar"
const theme = createTheme();

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

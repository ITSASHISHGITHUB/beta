import { Sidebar } from "lucide-react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import Frame from "../pages/sidebar"
import SignIn from "../pages/auth/login"
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
}

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session started. Setting logout timer for 10 minutes...");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        console.log("Session expired. Logging out...");
        signOut({ callbackUrl: "/auth/signin" }); 
      }, 600 * 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  if (!session) {
    return <SignIn/>

  }
  if (session) {
    return (
     <Frame/>
    );
  }

  return children;
}

export default MyApp;
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { signIn, signOut } from "next-auth/react";

const providers = [{ id: "google", name: "Google" }];

export default function OAuthSignInPage() {
  const theme = useTheme();
  const [error, setError] = React.useState(null);
  const timeoutRef = React.useRef(null); // Use useRef for timeout ID

  const handleSignIn = async (provider) => {
    if (!provider || !provider.id) {
      console.error("❌ Error: Provider is undefined or missing an ID!", provider);
      return;
    }

    console.log(`✅ Attempting sign-in with ${provider.id}`);
    try {
      const result = await signIn(provider.id, { callbackUrl: "/sidebar" });

      if (result?.error) {
        console.error("❌ Sign-in error:", result.error);
        setError(result.error);
        return;
      }

      console.log("✅ Sign-in successful. Setting logout timer...");

      // Clear any existing timeout
      if (timeoutRef.current) {
        console.log("🧹 Clearing existing timeout...");
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to log out the user after 10 seconds
      timeoutRef.current = setTimeout(() => {
        console.log("⏰ Session expired. Logging out...");
        signOut({ callbackUrl: "/" }); // Log out the user and redirect to the sign-in page
      }, 10000); // 10 seconds

      console.log("⏱️ Timeout set for 10 seconds.");
    } catch (error) {
      console.error("❌ Sign-in error:", error.message);
      setError(error.message);
    }
  };

  // Clear the timeout when the component unmounts
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        console.log("🧹 Clearing timeout on unmount...");
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AppProvider theme={theme}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <SignInPage signIn={handleSignIn} providers={providers} />
    </AppProvider>
  );
}
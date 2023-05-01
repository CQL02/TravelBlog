import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/country.css";
import "@/styles/home.css";
import "@/styles/create.css";
import "@/styles/settings.css";
import "@/styles/viewPost.css";
import "@/styles/userprofile.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

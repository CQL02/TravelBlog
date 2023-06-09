import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/country.css";
import "@/styles/home.css";
import "@/styles/create.css";
import "@/styles/settings.css";
import "@/styles/viewPost.css";
import "@/styles/userprofile.css";
import { UserProvider } from "../component/auth";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

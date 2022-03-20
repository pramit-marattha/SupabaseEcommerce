import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import ChatwootWidget from "@/components/ChatwootWidget";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <ChatwootWidget />
    </>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Menu />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

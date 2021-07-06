import "../styles/globals.css";
import type { AppProps } from "next/app";
/* eslint-disable-next-line import/extensions */
// import Header from "../components/Header";
/* eslint-disable-next-line import/extensions */
import Menu from "../components/Menu";
/* eslint-disable-next-line import/extensions */
import Footer from "../components/footer";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <div>
    //   <Header />
    //   <Menu />
    //   <div className="absolute top-20 bottom-10 md:left-64 md:width-screen-64 w-full -z-10">
    //     <Component {...pageProps} />
    //   </div>
    //   <Footer />
    //   <div id="modal-div" />
    // </div>
    <div>
      <div className="flex md:flex-row flex-col">
        <div className="md:w-64 w-full md:pt-4 md:pl-4 bg-white md:z-10">
          <Menu />
        </div>
        <div className="md:width-screen-64 w-full -z-20 md:z-0">
          <Component {...pageProps} />
        </div>
      </div>
      <Footer />
      <div id="modal-div" />
    </div>
  );
}

export default wrapper.withRedux(MyApp);

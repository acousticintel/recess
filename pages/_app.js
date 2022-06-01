import "../styles/globals.css";
import dynamic from "next/dynamic";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
//custom
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { ProvideData } from "../context/dataContext";
const Layout = dynamic(() => import("../components/layout"));

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <ProvideData>
        <Layout path={router.route}>
          <Component {...pageProps} />
        </Layout>
      </ProvideData>
    </SessionProvider>
  );
}

export default MyApp;

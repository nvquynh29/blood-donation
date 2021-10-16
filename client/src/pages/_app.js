import NProgress from "nprogress";
import Router from "next/router";

import "tailwindcss/tailwind.css";
import "nprogress/nprogress.css";
import "antd/dist/antd.css";
import "../../assets/styles/global.scss";

import MainLayout from "../layouts/main-layout/Default";

// Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
export const config = { amp: true };
function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;

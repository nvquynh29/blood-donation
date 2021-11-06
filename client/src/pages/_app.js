/* Component import */
import NProgress from 'nprogress'
import Router from 'next/router'
/* CSS import */
import 'tailwindcss/tailwind.css'
import 'nprogress/nprogress.css'
import 'antd/dist/antd.css'
import '../../assets/styles/global.scss'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

import MainLayout from '../layouts/main-layout/Default'

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
export const config = { amp: true }
function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
   
  )
}

export default MyApp

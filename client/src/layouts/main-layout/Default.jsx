import React from 'react'
import Head from 'next/head'
import NavigatorBar from '../../components/navigator-bar/NavigatorBar'
import Carousel from '../../components/carousel/Carousel'
import dynamic from 'next/dynamic'
const ContactBar = dynamic(() => import('../../components/contact-bar/ContactBar'), { ssr: false })

function MainLayout({ children }) {
  return (
    <div className="bg-red-900 ">
      <Head>
        <title>Hiến máu trao yêu thương</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="header block h-[fit-content]">
        <ContactBar />
        <div className="navigator-bar bg-black">
          <NavigatorBar />
        </div>
      </div>

      <div className="content block">{children}</div>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default MainLayout

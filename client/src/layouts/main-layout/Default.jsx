import React from 'react'
import Head from 'next/head'
import NavigatorBar from '../../components/navigator-bar/NavigatorBar'
import Carousel from '../../components/carousel/Carousel'
import dynamic from 'next/dynamic'
import Footer from '../../components/footer/Footer'
<<<<<<< HEAD
const ContactBar = dynamic(
  () => import('../../components/contact-bar/ContactBar'),
  { ssr: false },
)
=======
const ContactBar = dynamic(() => import('../../components/contact-bar/ContactBar'), { ssr: false })
>>>>>>> 5bef568 (styling footer)

function MainLayout({ children }) {
  return (
    <div className="bg-red-900 ">
      <Head>
        <title>Hiến máu trao yêu thương</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="header block h-[fit-content]">
        <ContactBar />
      </div>
      <NavigatorBar />
      <div className="content block">{children}</div>
<<<<<<< HEAD
=======

>>>>>>> 5bef568 (styling footer)
      <hr />
      <Footer />
    </div>
  )
}

export default MainLayout

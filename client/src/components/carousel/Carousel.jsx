import React, { useEffect } from 'react'
import { Carousel } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  SwapRightOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

// import './styles.scss'
function MyCarousel() {
  const events = [
    {
      id: 1,
      name: 'Hiến máu, cứu người !',
      sologan: 'Sự đóng góp của bạn Có thể mang lại cơ hội cho người khác',
      imgUrl: '/images/slider-1.jpg',
    },
    {
      id: 2,
      name: 'Hiến máu, cứu người !',
      sologan: 'Sự đóng góp của bạn Có thể mang lại cơ hội cho người khác',
      imgUrl: '/images/slider-1.jpg',
    },
    {
      id: 3,
      name: 'Hiến máu, cứu người !',
      sologan: 'Sự đóng góp của bạn Có thể mang lại cơ hội cho người khác',
      imgUrl: '/images/slider-1.jpg',
    },
  ]
  return (
    <div className="carousel !font-Dosis">
      <Carousel
        autoplay
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {events.map((event) => (
          <div className="relative" key={event.id}>
            <div className="slider-info absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 h-1/2 w-3/4 ">
              <div className="content text-center">
                <h3 className="text-[2vw] text-base">{event.name}</h3>
                <h2 className="font-Dosis text-[3.6rem]">{event.sologan}</h2>

                <Link href="/event">
                  <a className="custom-btn inline-flex items-center p-2 mr-4 mt-5">
                    <span className="px-2">Đăng ký hiến máu</span>{' '}
                    <SwapRightOutlined className="text-3xl" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="block object-contain ">
              <img src={event.imgUrl} alt="" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MyCarousel

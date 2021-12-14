import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  SwapRightOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { getAllEvent, getOngoingEvent } from '../../api/event'
import { env } from '../../../next.config'

// import './styles.scss'
function MyCarousel({ events }) {
  return (
    <div className="carousel !font-Dosis">
      <Carousel
        // autoplay
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {events.map((event) => (
          <div className="relative" key={event.id}>
            <div className="slider-info absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50  w-3/4 !z-50">
              <div className="content text-center">
                <h3 className="text-[2vw] text-base !tracking-widest">
                  {event.name}
                </h3>
                <h2 className="font-Dosis text-[3.6vw] !mt-0">
                  {event.organization_id.name}
                </h2>
                <p className="text-center text-sm italic ">
                  Địa chỉ:{event.organization_id.address}
                </p>

                <Link href={'/event/' + event._id + '/donate-booking/'}>
                  <a className="custom-btn inline-flex items-center p-2 mr-4 mt-5">
                    <span className="px-2">Đăng ký hiến máu</span>{' '}
                    <SwapRightOutlined className="text-3xl" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="block  h-full object-contain bg-slidePlaceHolder">
              {/* <img src={'/' + event.organization_id.img_path} alt="" /> */}
              <img
                className="block absolute z-10 h-full object-contain"
                src={
                  event.organization_id.img_path
                    ? `${env.API_URL}/getFile?img_path=${event.organization_id.img_path}`
                    : '/images/slider-1.jpg'
                }
                alt="Man looking at item at a store"
              />
              <img
                src="/images/slider-1.jpg"
                alt=""
                className="opacity-0 z-0"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MyCarousel

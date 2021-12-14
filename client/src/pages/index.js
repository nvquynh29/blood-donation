import { Form, Input, Button, Checkbox, Card } from 'antd'
import { fillVolunteer } from '../store/actions/volunteerAction'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import MyCarousel from '../components/carousel/Carousel'
import CustomCard from '../components/card/Card'
import Link from 'next/link'
import MainLayout from '../layouts/main-layout/Default'
import ResgiterForm from '../components/reg-form/ResgiterForm'
import router from 'next/router'
import VolunteerForm from '../components/vonlunteer-form/VolunteerForm'
import { ReactReduxContext } from 'react-redux'
import Advise from '../components/advise-section/Advise'
import { getOngoingEvent } from '../api/event'
import { env } from '../../next.config'
import EventList from '../components/event-list'
import React, { useState, useEffect, useContext } from 'react'
const Home = () => {
  const { store } = useContext(ReactReduxContext)
  const [events, setEvents] = useState([])
  // const fetchEvents = async () => {
  //   const { data } = await getOngoingEvent()
  //   setEvents(data)
  // }

  // useEffect(() => {
  //   fetchEvents()
  // }, [])
  useEffect(() => {
    try {
      getOngoingEvent(4).then((res) => {
        setEvents(res.data)
      })
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <MainLayout className="font-Dosis">
      <div className="landingPage">
        <div>
          {/* SLIDER */}
          <div className="carousel  bg-red-500">
            {<MyCarousel events={events} />}
          </div>
          {/* RECUITMENT */}
          <div className="recuitment my-10">
            <div className="bg-[#F8F9FA] px-20 py-10 text-[#333333]">
              <div className="container flex flex-wrap justify-evenly items-center">
                <div className="w-2/3">
                  <h2 className="font-Dosis text-4xl">
                    Chúng luôn cố gắng giúp đỡ mọi người
                  </h2>
                  <p className=" text-[#777777] font-[400] tracking-widest	text-[18px/28px]">
                    Bạn có thể cho máu tại bất kỳ địa điểm hiến máu nào của
                    chúng tôi. Hiến máu hôm nay, giọt máu bạn cho đi có thể cứu mạng sống của nhiều người.
                  </p>
                </div>
                <div className="w-1/3">
                  <div className="ml-5">
                    <Link href="/event">
                      <a className="custom-btn inline-flex border border-solid border-white items-center mr-5 ml-5 ">
                        <span className="p-2 xl:text-3xl lg:text-base md:text-base">
                          Đặt lịch
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* DONATION PROCESS */}
          <div className="donation-process">
            <div className="container mx-auto">
              <div className="title">
                <h2 className="section-heading relative font-Dosis text-5xl font-[400] text-center text-black after:bg-separator after:bg-center	after:bg-no-repeat after:absolute after:h-10 after:w-full after:top-1/2 after:left-1/2 after:block after:transform after:-translate-x-1/2 after:translate-y-1/2">
                  <span>Quá trình</span> Hiến máu
                </h2>
                <p className="section-subheading py-10 text-[22px] font-Dosis text-[#4d4d4d] text-center">
                  Quá trình hiến máu từ khi bạn đến trung tâm cho đến khi bạn
                  rời đi
                </p>
              </div>
              <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2 px-10">
                <CustomCard
                  cardTitle="Đăng ký"
                  subTitle="Bước 1"
                  imgUrl="images/process_1.jpg"
                  cardDescription="Bạn cần hoàn thành một biểu mẫu đăng ký rất đơn giản, chứa tất cả thông tin liên hệ bắt buộc để nhập vào quá trình quyên góp."
                />
                <CustomCard
                  cardTitle="Xét nghiệm"
                  subTitle="Bước 2"
                  imgUrl="images/process_2.jpg"
                  cardDescription="Một giọt máu từ ngón tay của bạn sẽ được dùng làm xét nghiệm đơn giản để đảm bảo rằng lượng sắt trong máu của bạn đủ thích hợp cho quá trình hiến tặng."
                />
                <CustomCard
                  cardTitle="Hiến máu"
                  subTitle="Bước 3"
                  imgUrl="images/process_3.jpg"
                  cardDescription="Sau khi đảm bảo và vượt qua kiểm tra sàng lọc thành công, bạn sẽ được chuyển đến giường của người hiến tặng để hiến tặng. Quá trình này chỉ mất 6-10 phút."
                />
                <CustomCard
                  cardTitle="Nghỉ ngơi"
                  subTitle="Bước 4"
                  imgUrl="images/process_4.jpg"
                  cardDescription="Bạn cũng có thể ở trong phòng khách cho đến khi bạn cảm thấy đủ khỏe để rời khỏi trung tâm của chúng tôi. Bạn sẽ nhận được đồ uống tuyệt vời từ chúng tôi trong khu vực quyên góp."
                />
              </div>
            </div>
          </div>
          {/* RESGISTER FORM */}
          <div className="register-form">{/* <ResgiterForm /> */}</div>
        </div>
        <div className="flex justify-center">
          <div className="asidePicRequestBloodForm">
            <img
              src="https://templates.bwlthemes.com/blood_donation/images/appointment.jpg"
              alt="appointment image"
            />
          </div>
          <VolunteerForm
            defaultValue={{}}
            onFinish={(values) => {
              store.dispatch(fillVolunteer(values))
              router.push('/organization')
            }}
            onFinishFailed={(error) => {
              console.error(error)
            }}
          />
        </div>
        <EventList events={events} />
        <Advise />
      </div>
    </MainLayout>
  )
}

export default Home

import { LoadingOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import faker from 'faker'
import React, { memo, useMemo, useState, useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { getAllEvent } from '../../api/event'

const { Option } = Select
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)
const bloodType = ['A', 'AB', 'O', 'B']
function index(props) {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const labels = ['', '', '', '', '', '', '', '', '', '', '', '']
  //4 con số tổng đã hiến trong quá khứ, tổng sk đã dixẽn ra, tổng số đơn đăng ký tiếp nhận máu, tổng số máu đã cho đi

  //1 bảng 4 input là tên ngày , tổng số đơn đã nhận và tổng lượng máu dự kiến  của sự kiện sắp diễn ra

  //pie chart tổng lượng máu  chưa hiến và đã hiến
  //pie chart đơn đăng ký  chưa hiến và đã hiến

  //sự kiện đã diễn ra có biểu đồ cơ cấu theo nhóm máu
  //biểu đồ 2 số lượng đơn và số lượng máu

  const [linData, setLinData] = useState({
    labels: '',
    datasets: [
      {
        label: 'Số lượng đơn hiến máu',
        data: faker.datatype.number({ min: 0, max: 1000 }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Tổng lượng máu',
        data: faker.datatype.number({ min: 0, max: 1000 }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })
  const [bloodTemp, setBloodTemp] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgb(62 156 214)',
          'rgb(234 117 26)',
          'rgb(95 162 28)',
          'rgb(230 74 29)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })
  const handleChangeEvent = (data, e) => {}
  useEffect(async () => {
    getAllEvent().then((res) => {
      setEvents(res.data)
    })
  }, [])
  useEffect(() => {
    const temp = {
      labels: [],
      datasets: [
        {
          label: 'Số lượng đơn hiến máu',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Tổng lượng máu',
          data: [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
    const bloodTemp = {
      labels: [],
      datasets: [
        {
          label: '# of Votes',
          data: [],
          backgroundColor: [
            'rgb(62 156 214)',
            'rgb(234 117 26)',
            'rgb(95 162 28)',
            'rgb(230 74 29)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    const abloodType = { A: 0, B: 0, AB: 0, O: 0 }
    props.data.part4?.done_events.forEach((element) => {
      const ev = events.find((e) => e._id === element._id)
      temp.labels.push(ev?.name)
      temp.datasets[0].data.push(element.done_donations_count)
      temp.datasets[1].data.push(element.done_amount)
      abloodType.A += element.group_a_amount
      abloodType.B += element.group_b_amount
      abloodType.AB += element.group_ab_amount
      abloodType.O += element.group_o_amount
    })
    bloodTemp.labels = Object.keys(abloodType)
    bloodTemp.datasets[0].data = Object.values(abloodType)
    setBloodTemp(bloodTemp)
    setLoading(false)
    setLinData(temp)
  }, [props, events])
  // useEffect(() => {}, [])
  return (
    <div>
      <div>
        <p>Thống kê các sự kiện đã diễn ra</p>
        <div>
          {loading ? (
            <LoadingOutlined className="text-3xl" />
          ) : (
            <div className="flex justify-between">
              <div className="max-w-4xl flex-1">
                <Line data={linData} />
              </div>

              <div className="max-w-md flex flex-col flex-1 items-end ">
                <Doughnut data={bloodTemp} />
              </div>
            </div>
          )}
          {/* <LoadingOutlined className="text-3xl" /> */}
        </div>
      </div>
      <div className="max-w-xl flex flex-col flex-1  items-end ">
        <div className="flex">
          {/* <Select
            placeholder="-- Chọn sự kiện --"
            style={{ width: 240 }}
            onChange={handleChangeEvent}
          >
            {events.map((event) => {
              return (
                <Option key={event._id} value={event.name}>
                  {event.name}
                </Option>
              )
            })}
          </Select> */}
        </div>
      </div>
    </div>
  )
}

export default memo(index)

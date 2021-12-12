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
import React, { memo, useMemo } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'

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

function index(props) {
  const bloodType = useMemo(() => {
    return {
      labels: ['A', 'B', 'AB', 'O'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 5, 2, 3],
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
  }, [])
  const labels = ['', '', '', '', '', '', '', '', '', '', '', '']
  //4 con số tổng đã hiến trong quá khứ, tổng sk đã dixẽn ra, tổng số đơn đăng ký tiếp nhận máu, tổng số máu đã cho đi

  //1 bảng 4 input là tên ngày , tổng số đơn đã nhận và tổng lượng máu dự kiến  của sự kiện sắp diễn ra

  //pie chart tổng lượng máu  chưa hiến và đã hiến
  //pie chart đơn đăng ký  chưa hiến và đã hiến

  //sự kiện đã diễn ra có biểu đồ cơ cấu theo nhóm máu
  //biểu đồ 2 số lượng đơn và số lượng máu
  const lineData = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Số lượng đơn hiến máu',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Tổng lượng máu',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
  }, [])
  const dataTb = [
    {
      key: '1',
      name: 'John Brown',
      date: new Date().toLocaleDateString(),
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      date: new Date().toLocaleDateString(),
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      date: new Date().toLocaleDateString(),
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
  const handleChangeBloodType = (data, e) => {
    console.log(data, e)
  }
  return (
    <div>
      <div className="flex">
        <div className="max-w-4xl flex-1">
          <Line data={lineData} />
        </div>
        <div className="max-w-md flex flex-col flex-1  items-end p-10">
          <Doughnut data={bloodType} />
        </div>
      </div>
      <div className="">
        <Select
          defaultValue="lucy"
          style={{ width: 240 }}
          onChange={handleChangeBloodType}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        {/* <div className="flex">
          <Doughnut data={bloodType} />
          <Doughnut data={bloodType} />
        </div> */}
      </div>
      {/* <div className="grid grid-cols-2">
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="title w-16">Chart info</div>
            <div className="title w-16">Chart info</div>
            <div className="title w-16">Chart info</div>
          </div>
          <div className="max-w-[200px] block flex-1">
            <Doughnut data={bloodType} />
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default memo(index)

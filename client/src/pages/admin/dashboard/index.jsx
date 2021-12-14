import React, { useState, useEffect } from 'react'
import SideBar from '../../../components/sidebar'
import dynamic from 'next/dynamic'
import MiniDrawer from '../../../layouts/trial/MiniDrawer'
import MultiStepForm from '../../../components/multistep-form/form'
import { Card } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { Modal, Button } from 'antd'
import { getDashbroad } from '../../../api/organization'
import moment from 'moment'
import Link from 'next/link'

const Chart = dynamic(() => import('../../../components/chart'), {
  ssr: false,
})

function index() {
  const [dashbroadData, setDashbroadData] = useState({})
  const [part1, setPart1] = useState({})
  const [part2, setPart2] = useState({})
  const [part3, setPart3] = useState({})
  const [part4, setPart4] = useState({})
  const [dataTb, setDataTb] = useState([])

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, data) => {
        return (
          <Link href={'/admin/event/' + data.key + '/setting'}>
            <a target="_blank">{text}</a>
          </Link>
        )
      },
    },
    {
      title: 'Ngày diễn ra',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Lượng máu cần thiết',
      dataIndex: 'count_blood',
      key: 'count_blood',
    },
    {
      title: 'Số đơn hiến máu đã tiếp nhận',
      key: 'count_donation',
      dataIndex: 'count_donation',
    },
  ]
  const getDashbroadData = async () => {
    getDashbroad().then((res) => {
      setDashbroadData(res.data)
    })
  }
  useEffect(() => {
    setPart1(dashbroadData.part1)
    setPart2(dashbroadData.part2)
    setPart3(dashbroadData.part3)
    setPart4(dashbroadData.part4)
  }, [dashbroadData])

  useEffect(() => {
    const table = dashbroadData.part2?.future_events.map((item) => {
      return {
        key: item._id,
        name: item.name,
        date:
          new Date(item.start_date).toLocaleDateString() +
          ' - ' +
          moment().add(item.duration, 'days').format('DD/MM/YYYY'),
        count_blood: item.count_blood,
        count_donation: item.count_donation,
      }
    })
    setDataTb(table)
  }, [dashbroadData.part2])
  useEffect(() => {}, [dashbroadData.part3])
  useEffect(() => {
    getDashbroadData()
  }, [])
  useEffect(() => {}, [dashbroadData.part4])

  return (
    <MiniDrawer>
      <div className=" w-full grid gap-4 grid-cols-4 mb-5">
        <Card
          className="font-Dosis shadow-md"
          style={{
            borderLeft: '4px solid red',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <span className="text-3xl  font-bold">{part1?.donated_blood}</span>
          <p className="text-xl">tổng lượng máu đã tiếp nhận </p>
        </Card>
        <Card
          className="font-Dosis shadow-md"
          style={{
            borderLeft: '4px solid red',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <span className="text-3xl  font-bold">{part1?.count_old_event}</span>
          <p className="text-xl">tổng sự kiện đã diễn ra</p>
        </Card>
        <Card
          className="font-Dosis shadow-md"
          style={{
            borderLeft: '4px solid red',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <span className="text-3xl  font-bold">
            {part1?.count_blood_requests}
          </span>
          <p className="text-xl">tổng số đơn đăng ký tiếp nhận máu</p>
        </Card>
        <Card
          className="font-Dosis shadow-md"
          style={{
            borderLeft: '4px solid red',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <span className="text-3xl  font-bold">
            {part1?.count_given_blood_amount}
          </span>
          <p className="text-xl">tổng số máu đã cho đi</p>
        </Card>
      </div>
      <div className="w-full block">
        <Table columns={columns} dataSource={dataTb} />
      </div>
      <Chart data={dashbroadData} />
    </MiniDrawer>
  )
}

export async function getServerSideProps(context) {
  // const res = await axios

  return {
    props: {}, // will be passed to the page component as props
  }
}
export default index

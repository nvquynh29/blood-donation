import React, { useState, useEffect } from 'react'
import SideBar from '../../../components/sidebar'
import dynamic from 'next/dynamic'
import MiniDrawer from '../../../layouts/trial/MiniDrawer'
import MultiStepForm from '../../../components/multistep-form/form'
import { Card } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { Modal, Button } from 'antd'
const Chart = dynamic(() => import('../../../components/chart'), {
  ssr: false,
})

function index() {
  const [visible, setVisible] = useState(false)
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
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ngày diễn ra',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
  ]
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
          <span className="text-3xl  font-bold"> 11</span>
          <p className="text-xl">tổng đã hiến trong quá khứ</p>
        </Card>
        <Card
          className="font-Dosis shadow-md"
          style={{
            borderLeft: '4px solid red',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <span className="text-3xl  font-bold"> 8</span>
          <p className="text-xl">tổng sk đã dien ra</p>
        </Card>
        <Card
          className="font-Dosis shadow-md"
          style={{
            borderLeft: '4px solid red',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <span className="text-3xl  font-bold"> 18</span>
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
          <span className="text-3xl  font-bold"> 25</span>
          <p className="text-xl">tổng số máu đã cho đi</p>
        </Card>
      </div>
      <div className="w-full block">
        <Table columns={columns} dataSource={dataTb} />
      </div>
      <Chart />
    </MiniDrawer>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
export default index

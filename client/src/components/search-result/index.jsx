import React from 'react'
import moment from 'moment'
import { normalizeString } from '../../utils'
import { Table } from 'antd'

function SearchResult({ hidden, data }) {
  let dataSource = []
  const columns = [
    {
      title: 'Lần',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Lượng máu (ml)',
      dataIndex: 'amount',
      key: 'amount',
    },
  ]

  if (data.history) {
    dataSource = data.history.map((donate, index) => {
      return {
        key: index + 1,
        time: moment(donate.time).format('DD/MM/YYYY HH:mm'),
        address: donate.eventAddress,
        amount: donate.amount,
      }
    })
  }
  return (
    <div className="w-full h-screen flex flex-col items-center" hidden={hidden}>
      <h1 className="text-3xl font-bold mt-8">CHỨNG NHẬN HIẾN MÁU TÌNH NGUYỆN</h1>
      <span>BCĐ vận động hiến máu tình nguyện Tỉnh/Thành phố: Hà Nội</span>
      <h3 className="font-bold text-xl">Chứng nhận</h3>
      <span>Ông/Bà: {data.name}</span>
      <span>Sinh ngày: {moment(data.date_of_birth).format('DD/MM/YYYY')}</span>
      <span>Số CCCD/CMND: {data.citizenID}</span>
      <span>Số điện thoại: {data.phone}</span>
      <span>Địa chỉ: {normalizeString(data.address)}</span>
      <span>Nhóm máu: {data.blood_type}</span>
      <h3 className="font-bold text-xl">Đã hiến máu tình nguyện</h3>
      <span>Số lần: {data.count}</span>
      <span>Lượng máu đã hiến: {data.totalAmount} ml</span>
      <h3 className="font-bold text-lg">Người bệnh luôn ghi ơn tấm lòng nhân ái của Ông/Bà.</h3>
      <h3>Lịch sử hiến máu:</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  )
}

export default SearchResult

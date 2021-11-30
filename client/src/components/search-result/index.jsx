import React from 'react'
import moment from 'moment'
import { normalizeString } from '../../utils'
import { Row, Table } from 'antd'

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
    <div className="searchResult">
      <div className="header">
        <h1 className="text-3xl font-bold ">CHỨNG NHẬN HIẾN MÁU TÌNH NGUYỆN</h1>
        <span>BCĐ vận động hiến máu tình nguyện Tỉnh/Thành phố: Hà Nội</span>
        <h3 className="font-bold text-xl">Chứng nhận</h3>
      </div>

      <div className="info">
        <div className="info1">
          <div className="info1D">
            <span>Ông/Bà: </span>
            <p>{data.name}</p>
          </div>
          <div className="info1D">
            <span>Sinh ngày: </span>
            <p>{moment(data.date_of_birth).format('DD/MM/YYYY')}</p>
          </div>
          <div className="info1D">
            <span>Số CCCD/CMND: </span>
            <p>{data.citizenID}</p>
          </div>
          <div className="info1D">
            <span>Số điện thoại:</span>
            <p> {data.phone}</p>
          </div>
          <div className="info1D">
            <span>Nhóm máu:</span>
            <p> {data.blood_type}</p>
          </div>
        </div>
        <div className='info1D'>
          <span >Địa chỉ:</span>
          <p> {normalizeString(data.address)}</p>
        </div>
        <div className="info0">
          <div className="info2">
            <h3 className="font-bold text-xl" style={{ color: '#FE3C47' }}>Đã hiến máu tình nguyện</h3>
            <div className="info2D">
              <div className="info1D">
                <span>Số lần:</span>
                <p> {data.count}</p>
              </div>
              <div className="info1D">
                <span>Lượng máu đã hiến:</span>
                <p> {data.totalAmount} ml</p>
              </div>
            </div>
          </div>
          <div className="imgCotainer">
            <img src="https://previews.123rf.com/images/arcady31/arcady311510/arcady31151000025/46534837-certified-gold-seal.jpg" height="900px" width="auto" alt="certificate" />
          </div>
        </div>
        <h3 className="font-bold text-lg">Người bệnh luôn ghi ơn tấm lòng nhân ái của Ông/Bà.</h3>
      </div>


      <div className="dataTable">
        <h3>Lịch sử hiến máu:</h3>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </div>
  )
}

export default SearchResult

import React, { useState, useEffect } from 'react'
import CustomTable from '../../../components/custom-table'
import moment from 'moment'
import * as requestBloodApi from '../../../api/requestBlood'
import { notification } from 'antd'

function BloodRequest() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(data)
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(async () => {
    try {
      const res = await requestBloodApi.getRequests()
      const requests = res.data.map((request) => {
        return { ...request, key: request._id }
      })
      setData(requests)
      setFilterData(requests)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const openNotificationSuccess = () => {
    notification.success({
      type: 'success',
      message: 'Chấp nhận đăng ký tiếp nhận máu thành công!',
    })
  }

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      align: 'center',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      render: (gender) => (gender === 'male' ? 'Nam' : 'Nữ'),
    },
    {
      title: 'CCCD',
      dataIndex: 'identity_card',
      key: 'identity_card',
      align: 'center',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
    },
    {
      title: 'Lượng máu (ml)',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'blood_type',
      key: 'blood_type',
      align: 'center',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: '30%',
      align: 'center',
    },
  ]

  const onSelectChange = (selectedRowKeys) => {
    setSelectedKeys(selectedRowKeys)
  }
  const rowSelection = {
    selectedKeys,
    onChange: onSelectChange,
  }
  const onAccept = async () => {
    try {
      await requestBloodApi.markAsAccepted(selectedKeys)
      setData(data.filter((element) => !selectedKeys.includes(element.key)))
      setFilterData(
        filterData.filter((element) => !selectedKeys.includes(element.key)),
      )
      setSelectedKeys([])
      openNotificationSuccess()
    } catch (error) {
      console.log(error)
    }
  }
  const searchRequest = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = data.filter(
      (request) =>
        request.name.toLowerCase().includes(value) ||
        request.phone_number.toLowerCase().includes(value) ||
        request.identity_card.toLowerCase().includes(value) ||
        request.blood_type.toLowerCase().includes(value),
    )
    setFilterData(filtered)
  }

  return (
    <div>
      <CustomTable
        data={filterData}
        columns={columns}
        addBtnText="Chấp nhận đơn đăng ký"
        onAddBtnClick={onAccept}
        searchPlaceHolder="Tìm kiếm..."
        onChange={searchRequest}
        rowSelection={rowSelection}
      />
    </div>
  )
}

export default BloodRequest

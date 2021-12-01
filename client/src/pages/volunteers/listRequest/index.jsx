import React, { useState } from 'react'
import { Space, Modal, notification } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons'
import CustomTable from '../../../components/custom-table'
import * as volunteerApi from '../../../api/volunteer'
import moment from 'moment'
import router from 'next/router'
import { data } from 'autoprefixer'
function VolunteerRequests({ volunteers }) {
  const [data, setData] = useState(volunteers)
  const [filterData, setFilterData] = useState(data)

  const searchVolunteer = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = data.filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(value) ||
        volunteer.phone.toLowerCase().includes(value) ||
        volunteer.email.toLowerCase().includes(value) ||
        volunteer.address.toLowerCase().includes(value)
    )
    setFilterData(filtered)
  }

  const openNotificationSuccess = () => {
    notification.success({
      icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
      duration: 3,
      message: 'Đã xoá thành công tình nguyện viên',
    })
  }

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: '35%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ]

  const [selectedKeys, setSelectedKeys] = useState([])
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedKeys(selectedRowKeys);
  }
  const rowSelection = {
    selectedKeys,
    onChange: onSelectChange,
  }
  return (
    <div>
      <CustomTable
        data={filterData}
        columns={columns}
        addBtnText="Chấp nhận Đơn đăng ký"
        // onAddBtnClick={}
        searchPlaceHolder="Tìm kiếm..."
        onChange={searchVolunteer}
        rowSelection={rowSelection}
      />
    </div>
  )
}

VolunteerRequests.getInitialProps = async (ctx) => {
  try {
    let res = await volunteerApi.getVolunteers()
    
    return { volunteers: res.data.map(data => { 
        return {...data, key: data._id}
    }) }
  } catch (error) {
    console.log(error)
    return {}
  }
}

export default VolunteerRequests

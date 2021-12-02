import React, { useState, useEffect } from 'react'
import { notification } from 'antd'
import CustomTable from '../../../components/custom-table'
import * as volunteerApi from '../../../api/volunteer'
import moment from 'moment'
function VolunteerRequests() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(data)

  useEffect(async () => {
    try {
      const res = await volunteerApi.getOrgRequests()
      setData(res.data.map(data => { 
        return {...data, key: data._id}
      }))
      setFilterData(res.data.map(data => { 
        return {...data, key: data._id}
      }))
    } catch (error) {
      console.log(error)
    }
  }, [])
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
      type: "success",
      message: 'Chấp nhận tình nguyện viên thành công!',
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
    setSelectedKeys(selectedRowKeys);
  }
  const rowSelection = {
    selectedKeys,
    onChange: onSelectChange,
  }

  const onAccept = async () => {
    try {
      await volunteerApi.markAsAccepted(selectedKeys)
      setData(data.filter((element) => !(selectedKeys.includes(element.key))))
      setFilterData(filterData.filter((element) => !(selectedKeys.includes(element.key))))
      setSelectedKeys([])
      openNotificationSuccess()
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div>
      <CustomTable
        data={filterData}
        columns={columns}
        addBtnText="Chấp nhận đơn đăng ký"
        onAddBtnClick={onAccept}
        searchPlaceHolder="Tìm kiếm..."
        onChange={searchVolunteer}
        rowSelection={rowSelection}
      />
    </div>
  )
}

export default VolunteerRequests

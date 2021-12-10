import React, { useState, useEffect } from 'react'
import { notification } from 'antd'
import CustomTable from '../../../../components/custom-table'
import * as volunteerApi from '../../../../api/volunteer'
import moment from 'moment'
import router from 'next/router'
import { data } from 'autoprefixer'
import MiniDrawer from '../../../../layouts/trial/MiniDrawer'
function VolunteerRequests() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(data)

  useEffect(async () => {
    try {
      const res = await volunteerApi.getOrgRequests()
      setData(res.data.map(data => {
        return { ...data, key: data._id }
      }))
      setFilterData(res.data.map(data => {
        return { ...data, key: data._id }
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
      await volunteerApi.markAsAccepted({ listID: selectedKeys })
      setData(data.filter((element) => !(selectedKeys.includes(element.key))))
      setFilterData(filterData.filter((element) => !(selectedKeys.includes(element.key))))
      setSelectedKeys([])
      openNotificationSuccess()
      router.push('/admin/volunteers')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MiniDrawer>
      <div className='volunteers'>
        <div className="adminTitle">
          Danh sách đăng ký tình nguyện viên
        </div>
        <CustomTable
          data={filterData}
          columns={columns}
          addBtnText="Chấp nhận Đơn đăng ký"
          onAddBtnClick={onAccept}
          searchPlaceHolder="Tìm kiếm..."
          onChange={searchVolunteer}
          rowSelection={rowSelection}
        />
      </div>
    </MiniDrawer>
  )
}

export default VolunteerRequests

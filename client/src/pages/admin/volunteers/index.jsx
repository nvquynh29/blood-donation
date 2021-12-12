import React, { useState, useEffect } from 'react'
import { Space, Modal, notification } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons'
import { Button } from 'antd'
import CustomTable from '../../../components/custom-table'
import * as volunteerApi from '../../../api/volunteer'
import moment from 'moment'
import router from 'next/router'
import MiniDrawer from '../../../layouts/trial/MiniDrawer'
import Link from 'next/link'

function Volunteers() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const header = {
    name: 'Họ và tên',
    date_of_birth: 'Ngày sinh',
    gender: 'Giới tính',
    phone: 'SĐT',
    address: 'Địa chỉ',
    email: 'Email',
  }

  useEffect(async () => {
    try {
      const res = await volunteerApi.getVolunteers()
      const volunteers = res.data.map((volunteer) => {
        return { ...volunteer, key: volunteer._id }
      })
      setData(volunteers)
      setFilterData(volunteers)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const addVolunteer = () => {
    // TODO: implement function
    router.push('volunteers/add')
  }
  const editVolunteer = (id) => {
    // TODO: implement function
    // await volunteerApi.updateVolunteer(id, newVolunteer)
    router.push(`volunteers/${id}`)
  }

  const removeVolunteer = (id) => {
    let updatedData = filterData.filter((volunteer) => volunteer._id !== id)
    setFilterData(updatedData)
    updatedData = data.filter((volunteer) => volunteer._id !== id)
    setData(updatedData)
  }

  const searchVolunteer = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = data.filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(value) ||
        volunteer.phone.toLowerCase().includes(value) ||
        volunteer.email.toLowerCase().includes(value) ||
        volunteer.address.toLowerCase().includes(value),
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

  const deleteVolunteer = (id) => {
    Modal.confirm({
      title: 'Xoá tình nguyện viên',
      icon: <CloseCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xoá tình nguyện viên này không?',
      onOk: async () => {
        try {
          await volunteerApi.deleteVolunteer(id)
          removeVolunteer(id)
          openNotificationSuccess()
        } catch (error) {
          console.log(error)
        }
      },
      onCancel: () => {},
      centered: true,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
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
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: '_id',
      render: (id) => (
        <Space size="middle">
          <EditOutlined
            className="cursor-pointer"
            onClick={() => editVolunteer(id)}
          />
          <DeleteOutlined
            className="cursor-pointer"
            onClick={() => deleteVolunteer(id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <MiniDrawer>
      <div className="volunteers">
        <div className="adminTitle">Danh sách tình nguyện viên</div>
        <Link href="volunteers/list-request">
          <Button>Danh sách đơn đăng ký</Button>
        </Link>
        <CustomTable
          data={filterData}
          columns={columns}
          header={header}
          addBtnText="Thêm tình nguyện viên"
          onAddBtnClick={addVolunteer}
          searchPlaceHolder="Tìm kiếm tình nguyện viên"
          onChange={searchVolunteer}
        />
      </div>
    </MiniDrawer>
  )
}

export default Volunteers

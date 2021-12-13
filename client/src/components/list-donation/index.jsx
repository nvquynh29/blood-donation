import React, { useState, useEffect } from 'react'
import { Space, Modal, notification, Select } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons'
import { Button } from 'antd'
import CustomTable from '../../components/custom-table'
import {
  getEventDonation,
  deleteDonation,
  updateDonationStatus,
} from '../../api/donation'
import moment from 'moment'
import { useRouter } from 'next/router'
import MiniDrawer from '../../layouts/trial/MiniDrawer'
import Link from 'next/link'

function DonationList() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  const router = useRouter()
  const { id } = router.query
  useEffect(async () => {
    try {
      const res = await getEventDonation(id)
      const donations = res.data.map((donation) => {
        return { ...donation, key: donation._id }
      })
      console.log(res.data)
      setData(donations)
      setFilterData(donations)
    } catch (error) {
      console.log(error)
    }
  }, [router])

  const addDonation = () => {
    // TODO: implement function
    router.push(`/admin/event/${router.query.id}/setting/add-donation`)
  }
  const editDonation = (id) => {
    // TODO: implement function
    // await volunteerApi.updateVolunteer(id, newVolunteer)
    router.push(`/volunteers/${id}`)
  }

  const removeDonation = (id) => {
    let updatedData = filterData.filter((donation) => donation._id !== id)
    setFilterData(updatedData)
    updatedData = data.filter((donation) => donation._id !== id)
    setData(updatedData)
  }

  const searchDonation = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = data.filter(
      (donation) =>
        donation.name.toLowerCase().includes(value) ||
        donation.phone.toLowerCase().includes(value) ||
        donation.email.toLowerCase().includes(value),
    )
    setFilterData(filtered)
  }

  const openNotificationSuccess = () => {
    notification.success({
      icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
      duration: 3,
      message: 'Đã xoá thành công đơn hiến máu',
    })
  }

  const updateStatus = async (id, status) => {
    try {
      await updateDonationStatus(id, { status: status })
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteDonation = (id) => {
    Modal.confirm({
      title: 'Xoá đơn hiến máu',
      icon: <CloseCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xoá đơn hiến máu này không?',
      onOk: async () => {
        try {
          await deleteDonation(id)
          removeDonation(id)
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
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Lượng máu (ml)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Số chứng minh nhân dân',
      dataIndex: 'citizenID',
      key: 'citizenID',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_done',
      key: 'is_done',
      align: 'center',
      render: (isDone, record) => (
        <Select
          defaultValue={isDone ?? false}
          onChange={(status) => updateStatus(record._id, status)}
          style={{ width: 140 }}
        >
          <Option value={true}>Đã hiến máu</Option>
          <Option value={false}>Đang tiến hành</Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: '_id',
      render: (id) => (
        <Space size="middle">
          <EditOutlined
            className="cursor-pointer"
            onClick={() => editDonation(id)}
          />
          <DeleteOutlined
            className="cursor-pointer"
            onClick={() => onDeleteDonation(id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <div className="volunteers">
      <div className="adminTitle">Danh sách đơn hiến máu</div>
      <CustomTable
        data={filterData}
        columns={columns}
        addBtnText="Thêm đơn hiến máu"
        onAddBtnClick={addDonation}
        searchPlaceHolder="Tìm kiếm đơn hiến máu"
        onChange={searchDonation}
      />
    </div>
  )
}

export default DonationList

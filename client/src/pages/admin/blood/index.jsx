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
import * as requestBloodApi from '../../../api/requestBlood'
import moment from 'moment'
import router from 'next/router'
import MiniDrawer from '../../../layouts/trial/MiniDrawer'
import Link from 'next/link'

function BloodRequestAccepted() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  useEffect(async () => {
    try {
      const res = await requestBloodApi.getAcceptedRequests()
      const requests = res.data.map((request) => {
        return { ...request, key: request._id }
      })
      setData(requests)
      setFilterData(requests)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const addRequest = () => {
    router.push('blood/request/add')
  }
  const editRequest = (id) => {
    router.push(`blood/request/${id}`)
  }

  const removeRequest = (id) => {
    let updatedData = filterData.filter((request) => request._id !== id)
    setFilterData(updatedData)
    updatedData = data.filter((request) => request._id !== id)
    setData(updatedData)
  }

  const searchRequest = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = data.filter(
      (request) =>
        request.name.toLowerCase().includes(value) ||
        request.phone_number.toLowerCase().includes(value) ||
        request.identity_card.toLowerCase().includes(value),
    )
    setFilterData(filtered)
  }

  const openNotificationSuccess = () => {
    notification.success({
      icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
      duration: 3,
      message: 'Đã xoá thành công yêu cầu',
    })
  }

  const deleteRequest = (id) => {
    Modal.confirm({
      title: 'Xoá yêu cầu',
      icon: <CloseCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xoá yêu cầu nhận hỗ trợ này không?',
      onOk: async () => {
        try {
          await requestBloodApi.deleteRequest(id)
          removeRequest(id)
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
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: '_id',
      render: (id) => (
        <Space size="middle">
          <EditOutlined
            className="cursor-pointer"
            onClick={() => editRequest(id)}
          />
          <DeleteOutlined
            className="cursor-pointer"
            onClick={() => deleteRequest(id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <MiniDrawer>
      <div className="request-blood">
        <div className="adminTitle">Danh sách đơn xin hỗ trợ máu</div>
        <Link href="blood/request">
          <Button>Danh sách đơn đăng ký</Button>
        </Link>
        <CustomTable
          data={filterData}
          columns={columns}
          addBtnText="Thêm yêu cầu"
          onAddBtnClick={addRequest}
          searchPlaceHolder="Tìm kiếm đơn xin hỗ trợ"
          onChange={searchRequest}
        />
      </div>
    </MiniDrawer>
  )
}

export default BloodRequestAccepted

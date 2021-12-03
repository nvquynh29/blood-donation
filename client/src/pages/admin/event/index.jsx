import React, { useState, useEffect } from 'react'
import { Space, Modal, notification } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons'
import CustomTable from '../../../components/custom-table'
import { getAllEvent, deleteEvent } from '../../../api/event'
import moment from 'moment'
import router from  'next/router'

function Event() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  useEffect(async () => {
    try {
      const res = await getAllEvent()
      res.data.map((el) => {return {...el, key: el._id}})
      setData(res.data)
      setFilterData(res.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const addEvent = () => {
    // TODO: implement function
    router.push('/admin/event/add')
  }
  const onDetailEvent = (id) => {
    router.push(`/admin/event/${id}`)
  }

  const removeEvent = (id) => {
    let updatedData = filterData.filter((event) => event._id !== id)
    setFilterData(updatedData)
    updatedData = data.filter((event) => event._id !== id)
    setData(updatedData)
  }

  const searchEvent = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = data.filter(
      (event) =>
        event.name.toLowerCase().includes(value) ||
        event.address.toLowerCase().includes(value)
    )
    setFilterData(filtered)
  }

  const openNotificationSuccess = () => {
    notification.success({
      icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
      duration: 3,
      message: 'Đã xóa thành công sự kiện!',
    })
  }

  const onDeleteEvent = (id) => {
      console.log(id)
    Modal.confirm({
      title: 'Xoá sự kiện',
      icon: <CloseCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xoá sự kiện này không?',
      onOk: async () => {
        try {
          await deleteEvent(id)
          removeEvent(id)
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (start_date) => moment(start_date).format('DD/MM/YYYY'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (_, record) => {
        return moment(record.start_date).add(record.duration, 'days').format('DD/MM/YYYY')
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: '35%',
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: '_id',
      render: (id) => (
        <Space size="middle">
          <EditOutlined className="cursor-pointer" onClick={() => onDetailEvent(id)} />
          <DeleteOutlined className="cursor-pointer" onClick={() => onDeleteEvent(id)} />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <CustomTable
        data={filterData}
        columns={columns}
        addBtnText="Thêm sự kiện"
        onAddBtnClick={addEvent}
        searchPlaceHolder="Tìm kiếm sự kiện "
        onChange={searchEvent}
      />
    </div>
  )
}

export default Event

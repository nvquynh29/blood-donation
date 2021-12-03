import React, {useState, useEffect} from 'react'
import CustomTable from '../custom-table'
import {getVolunteers} from '../../api/volunteer'
import {getEventVolunteer, updateEvent} from '../../api/event'
import router from 'next/router'
import moment from 'moment'
import {notification} from 'antd'


export default function VolunteerList() {
    const [currentVolunteerId, setCurrentVolunteerId] = useState([])
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState(data)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    useEffect(async () => {
        try {
            const res = await Promise.all([getVolunteers(), getEventVolunteer(router.query.id)])
            setCurrentVolunteerId(res[1].data)
            const tableData = res[0].data.map((element) => {
                return {
                    ...element,
                    key: element._id,
                }
            })
            setData(tableData)
            setFilterData(tableData)
            setSelectedRowKeys(res[1].data)
            console.log(res[1].data)
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

      const onSelectChange = selectedKeys => {
        setSelectedRowKeys(selectedKeys)
      }
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    
      const onAccept = async () => {
        try {
          await updateEvent(router.query.id, {
              volunteers: selectedRowKeys
          })
          openNotificationSuccess()
        } catch (error) {
          console.log(error)
        }
      }
    return (
    
        <div className='volunteers'>
          <div className="adminTitle">
            Danh sách tình nguyện viên
          </div>
          <CustomTable
            data={filterData}
            columns={columns}
            addBtnText="Lưu danh sách tình nguyện viên của sự kiện"
            onAddBtnClick={onAccept}
            searchPlaceHolder="Tìm kiếm..."
            onChange={searchVolunteer}
            rowSelection={rowSelection}
          />
        </div>
    )
}
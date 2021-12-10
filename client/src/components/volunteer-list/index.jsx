import React, {useState, useEffect} from 'react'
import CustomTable from '../custom-table'
import {getVolunteers} from '../../api/volunteer'
import {getEventVolunteer, updateEvent} from '../../api/event'
import router from 'next/router'
import moment from 'moment'
import {notification} from 'antd'


export default function VolunteerList() {
    const [currentVolunteerId, setCurrentVolunteerId] = useState([])
    const [currentVolunteers, setCurrentVolunteers] = useState([])
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState(data)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [currentMode, setCurrentMode] = useState('view')
    useEffect(async () => {
        try {
            const res = await Promise.all([getVolunteers(), getEventVolunteer(router.query.id)])
            setCurrentVolunteerId(res[1].data.map((element) => element._id))
            setCurrentVolunteers(res[1].data)
            const tableData = res[0].data.map((element) => {
                return {
                    ...element,
                    key: element._id,
                }
            })
            setData(tableData)
            setFilterData(res[1].data)
            setSelectedRowKeys(res[1].data.map((element) => element._id))
       } catch (error) {
           console.log(error)
       }
    }, [])

    const searchVolunteer = (e) => {
        const value = e.target.value?.toLowerCase()
        const filtered = currentMode != 'view' ? data.filter(
          (volunteer) =>
            volunteer.name.toLowerCase().includes(value) ||
            volunteer.phone.toLowerCase().includes(value) ||
            volunteer.email.toLowerCase().includes(value) ||
            volunteer.address.toLowerCase().includes(value)
        ) : currentVolunteers.filter(
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
          if (currentMode != 'view') {
            await updateEvent(router.query.id, {
              volunteers: selectedRowKeys
            })
            openNotificationSuccess()
            setFilterData(currentVolunteers)
            try {
              const res = await Promise.all([getVolunteers(), getEventVolunteer(router.query.id)])
              setCurrentVolunteerId(res[1].data.map((element) => element._id))
              setCurrentVolunteers(res[1].data)
              const tableData = res[0].data.map((element) => {
                  return {
                      ...element,
                      key: element._id,
                  }
              })
              setData(tableData)
              setFilterData(res[1].data)
              setSelectedRowKeys(res[1].data.map((element) => element._id))
            } catch (error) {
                console.log(error)
            }
            setCurrentMode('view')
            
          } else {
            setCurrentMode('edit')
            setFilterData(data)
          }
          console.log(selectedRowKeys)
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
            addBtnText={ currentMode != 'view' ? "Lưu danh sách tình nguyện viên của sự kiện" : "Chọn tình nguyện viên" }
            onAddBtnClick={onAccept}
            searchPlaceHolder="Tìm kiếm..."
            onChange={searchVolunteer}
            rowSelection={currentMode != 'view' ? rowSelection : null}
          />
        </div>
    )
}
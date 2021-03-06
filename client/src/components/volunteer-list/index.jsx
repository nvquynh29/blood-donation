import React, { useState, useEffect } from 'react'
import CustomTable from '../custom-table'
import { getVolunteers } from '../../api/volunteer'
import { getEventVolunteer, updateEvent } from '../../api/event'
import router from 'next/router'
import moment from 'moment'
import { notification } from 'antd'
import { getGenderVie } from '../../utils'

export default function VolunteerList() {
  const [currentVolunteerId, setCurrentVolunteerId] = useState([])
  const [currentVolunteers, setCurrentVolunteers] = useState([])
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState(data)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [currentMode, setCurrentMode] = useState('view')
  useEffect(async () => {
    try {
      const res = await Promise.all([
        getVolunteers(),
        getEventVolunteer(router.query.id),
      ])
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
    const filtered =
      currentMode != 'view'
        ? data.filter(
            (volunteer) =>
              volunteer.name.toLowerCase().includes(value) ||
              volunteer.phone.toLowerCase().includes(value) ||
              volunteer.email.toLowerCase().includes(value) ||
              volunteer.address.toLowerCase().includes(value),
          )
        : currentVolunteers.filter(
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
      type: 'success',
      message: 'Ch???p nh???n t??nh nguy???n vi??n th??nh c??ng!',
    })
  }

  const columns = [
    {
      title: 'H??? v?? t??n',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ng??y sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'Gi???i t??nh',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => getGenderVie(gender),
    },
    {
      title: 'S??T',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '?????a ch???',
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

  const onSelectChange = (selectedKeys) => {
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
          volunteers: selectedRowKeys,
        })
        openNotificationSuccess()
        setFilterData(currentVolunteers)
        try {
          const res = await Promise.all([
            getVolunteers(),
            getEventVolunteer(router.query.id),
          ])
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

  const header = {
    name: 'H??? v?? t??n',
    date_of_birth: 'Ng??y sinh',
    gender: 'Gi???i t??nh',
    phone: 'S??T',
    address: '?????a ch???',
    email: 'Email',
  }

  const mapFields = {
    male: 'Nam',
    female: 'N???',
  }

  const additionalFields = {
    accepted: true,
    organization_id: true,
    model: 'volunteer',
  }

  return (
    <div className="volunteers">
      <div className="adminTitle">Danh s??ch t??nh nguy???n vi??n</div>
      <CustomTable
        data={filterData}
        columns={columns}
        header={header}
        mapFields={mapFields}
        additionalFields={additionalFields}
        disableExcel={currentMode === 'edit'}
        disableImport={true}
        addBtnText={
          currentMode != 'view'
            ? 'L??u danh s??ch t??nh nguy???n vi??n c???a s??? ki???n'
            : 'Ch???n t??nh nguy???n vi??n'
        }
        onAddBtnClick={onAccept}
        searchPlaceHolder="T??m ki???m..."
        onChange={searchVolunteer}
        rowSelection={currentMode != 'view' ? rowSelection : null}
      />
    </div>
  )
}

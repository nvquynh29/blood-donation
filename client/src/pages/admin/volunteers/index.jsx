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
import { getGenderVie } from '../../../utils'

function Volunteers() {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

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
    router.push('/admin/volunteers/add')
  }
  const editVolunteer = (id) => {
    // TODO: implement function
    // await volunteerApi.updateVolunteer(id, newVolunteer)
    router.push(`/admin/volunteers/${id}`)
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
      message: '???? xo?? th??nh c??ng t??nh nguy???n vi??n',
    })
  }

  const deleteVolunteer = (id) => {
    Modal.confirm({
      title: 'Xo?? t??nh nguy???n vi??n',
      icon: <CloseCircleOutlined />,
      content: 'B???n c?? ch???c ch???n mu???n xo?? t??nh nguy???n vi??n n??y kh??ng?',
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
      okText: 'X??c nh???n',
      cancelText: 'Hu???',
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
    {
      title: 'H??nh ?????ng',
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
    <MiniDrawer>
      <div className="volunteers">
        <div className="adminTitle">Danh s??ch t??nh nguy???n vi??n</div>
        <Link href="/admin/volunteers/list-request">
          <Button>Danh s??ch ????n ????ng k??</Button>
        </Link>
        <CustomTable
          data={filterData}
          columns={columns}
          header={header}
          mapFields={mapFields}
          additionalFields={additionalFields}
          addBtnText="Th??m t??nh nguy???n vi??n"
          onAddBtnClick={addVolunteer}
          searchPlaceHolder="T??m ki???m t??nh nguy???n vi??n"
          onChange={searchVolunteer}
        />
      </div>
    </MiniDrawer>
  )
}

export default Volunteers

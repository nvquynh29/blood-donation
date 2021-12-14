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
  updateDonation,
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
    router.push(`/admin/event/${router.query.id}/setting/${id}/view-donation`)
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
      width: '18%',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'Căn cước công dân',
      dataIndex: 'citizenID',
      key: 'citizenID',
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
      width: '10%',
    },
    {
      title: 'Ngày hiến',
      dataIndex: 'done_date',
      key: 'done_date',
      render: (done_date) => {
        return <span>{moment(done_date).format('DD/MM/YYYY')}</span>
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
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
      title: 'Nhóm máu',
      dataIndex: 'blood_type',
      key: 'blood_type',
      align: 'center',
      render: (bloodType, record) => (
        <Select
          defaultValue={bloodType ?? 'A'}
          onChange={(blood_type) => updateDonation(record._id, { blood_type })}
          style={{ width: 70 }}
        >
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="O">O</Option>
          <Option value="AB">AB</Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: '_id',
      width: '5%',
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

  const header = {
    name: 'Họ và tên',
    date_of_birth: 'Ngày sinh',
    citizenID: 'Căn cước công dân',
    phone: 'SĐT',
    email: 'Email',
    amount: 'Lượng máu (ml)',
    done_date: 'Ngày hiến',
    time: 'Thời gian',
    is_done: 'Trạng thái',
    blood_type: 'Nhóm máu',
    gender: 'Giới tính',
    city_1: 'Tỉnh/Thành phố',
    district_1: 'Quận/Huyện',
    ward_1: 'Phường/Xã',
  }

  const mapFields = {
    truthy: 'Đã hiến máu',
    falsy: 'Đang tiến hành',
    male: 'Nam',
    female: 'Nữ',
  }

  const listAnswer = {
    'Trước đây bạn đã từng hiến máu chưa?': 'true',
    'Quý vị đã từng mắc các bệnh  như  thần kinh, hô hấp, vàng da/viêm gan, tim mạch, huyết áp thấp/cao, bệnh thận, ho kéo dài, bệnh máu,  lao, ung thư,v.v??':
      'false',
    'Sút cân >= 4kg không rõ nguyên nhân? Nổi hạch kéo dài?': 'true',
    'Phẫu thuật?': 'true',
    'Được truyền máu, chế phẩm máu?': 'true',
    'Sử dụng ma túy, tiêm chích?': 'true',
    'Quan hệ tình dục với người nhiễm hoặc có nguy cơ nhiễm HIV/AIDS, viêm gan':
      'true',
    'Quan hệ tình dục với nhiều người và/hoặc không có biện pháp an toàn tránh lây nhiễm?':
      'false',
    'Tiêm vác xin phòng bệnh?': 'false',
    'Có liên quan đến/ở vùng có dịch lưu hành(sốt xuất huyết, sốt rét, bò điên,...?':
      'false',
    'Bị cúm, ho, nhức đầu, sốt?': 'false',
    'Dùng thuốc khác sinh, Aspirin, Corticoid?': 'false',
    'Xăm hình, xỏ lỗ tai, xỏ lỗ mũi,châm cứu?': 'true',
    'Đi khám sức khỏe, làm xét nghiệm, chữa răng?': 'false',
    ' Quý vị hiện là đối tượng tàn tật hoặc hưởng trợ cấp tàn tật hoặc nạn nhân chất độc màu da cam không?':
      'false',
  }

  const additionalFields = {
    address_1: ' ',
    fulladdress_1: ' ',
    address_2: ' ',
    city_2: ' ',
    district_2: ' ',
    ward_2: ' ',
    is_done: true,
    major: ' ',
    uid_place: ' ',
    user_role_uid: ' ',
    event_id: id,
    list_answer: listAnswer,
    model: 'donation',
  }

  return (
    <div className="volunteers">
      <div className="adminTitle">Danh sách đơn hiến máu</div>
      <CustomTable
        data={filterData}
        columns={columns}
        header={header}
        mapFields={mapFields}
        additionalFields={additionalFields}
        addBtnText="Thêm đơn hiến máu"
        onAddBtnClick={addDonation}
        searchPlaceHolder="Tìm kiếm đơn hiến máu"
        onChange={searchDonation}
      />
    </div>
  )
}

export default DonationList

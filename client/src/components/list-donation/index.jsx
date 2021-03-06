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
      message: '???? xo?? th??nh c??ng ????n hi???n m??u',
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
      title: 'Xo?? ????n hi???n m??u',
      icon: <CloseCircleOutlined />,
      content: 'B???n c?? ch???c ch???n mu???n xo?? ????n hi???n m??u n??y kh??ng?',
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
      okText: 'X??c nh???n',
      cancelText: 'Hu???',
    })
  }

  const columns = [
    {
      title: 'H??? v?? t??n',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
    },
    {
      title: 'Ng??y sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'C??n c?????c c??ng d??n',
      dataIndex: 'citizenID',
      key: 'citizenID',
    },
    {
      title: 'S??T',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'L?????ng m??u (ml)',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%',
    },
    {
      title: 'Ng??y hi???n',
      dataIndex: 'done_date',
      key: 'done_date',
      render: (done_date) => {
        return <span>{moment(done_date).format('DD/MM/YYYY')}</span>
      },
    },
    {
      title: 'Th???i gian',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'is_done',
      key: 'is_done',
      align: 'center',
      render: (isDone, record) => (
        <Select
          defaultValue={isDone ?? false}
          onChange={(status) => updateStatus(record._id, status)}
          style={{ width: 140 }}
        >
          <Option value={true}>???? hi???n m??u</Option>
          <Option value={false}>??ang ti???n h??nh</Option>
        </Select>
      ),
    },

    {
      title: 'Nh??m m??u',
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
      title: 'H??nh ?????ng',
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
    name: 'H??? v?? t??n',
    date_of_birth: 'Ng??y sinh',
    citizenID: 'C??n c?????c c??ng d??n',
    phone: 'S??T',
    email: 'Email',
    amount: 'L?????ng m??u (ml)',
    done_date: 'Ng??y hi???n',
    time: 'Th???i gian',
    is_done: 'Tr???ng th??i',
    blood_type: 'Nh??m m??u',
    gender: 'Gi???i t??nh',
    city_1: 'T???nh/Th??nh ph???',
    district_1: 'Qu???n/Huy???n',
    ward_1: 'Ph?????ng/X??',
  }

  const mapFields = {
    truthy: '???? hi???n m??u',
    falsy: '??ang ti???n h??nh',
    male: 'Nam',
    female: 'N???',
  }

  const listAnswer = {
    'Tr?????c ????y b???n ???? t???ng hi???n m??u ch??a?': 'true',
    'Qu?? v??? ???? t???ng m???c c??c b???nh  nh??  th???n kinh, h?? h???p, v??ng da/vi??m gan, tim m???ch, huy???t ??p th???p/cao, b???nh th???n, ho k??o d??i, b???nh m??u,  lao, ung th??,v.v??':
      'false',
    'S??t c??n >= 4kg kh??ng r?? nguy??n nh??n? N???i h???ch k??o d??i?': 'true',
    'Ph???u thu???t?': 'true',
    '???????c truy???n m??u, ch??? ph???m m??u?': 'true',
    'S??? d???ng ma t??y, ti??m ch??ch?': 'true',
    'Quan h??? t??nh d???c v???i ng?????i nhi???m ho???c c?? nguy c?? nhi???m HIV/AIDS, vi??m gan':
      'true',
    'Quan h??? t??nh d???c v???i nhi???u ng?????i v??/ho???c kh??ng c?? bi???n ph??p an to??n tr??nh l??y nhi???m?':
      'false',
    'Ti??m v??c xin ph??ng b???nh?': 'false',
    'C?? li??n quan ?????n/??? v??ng c?? d???ch l??u h??nh(s???t xu???t huy???t, s???t r??t, b?? ??i??n,...?':
      'false',
    'B??? c??m, ho, nh???c ?????u, s???t?': 'false',
    'D??ng thu???c kh??c sinh, Aspirin, Corticoid?': 'false',
    'X??m h??nh, x??? l??? tai, x??? l??? m??i,ch??m c???u?': 'true',
    '??i kh??m s???c kh???e, l??m x??t nghi???m, ch???a r??ng?': 'false',
    ' Qu?? v??? hi???n l?? ?????i t?????ng t??n t???t ho???c h?????ng tr??? c???p t??n t???t ho???c n???n nh??n ch???t ?????c m??u da cam kh??ng?':
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
      <div className="adminTitle">Danh s??ch ????n hi???n m??u</div>
      <CustomTable
        data={filterData}
        columns={columns}
        header={header}
        mapFields={mapFields}
        additionalFields={additionalFields}
        addBtnText="Th??m ????n hi???n m??u"
        onAddBtnClick={addDonation}
        searchPlaceHolder="T??m ki???m ????n hi???n m??u"
        onChange={searchDonation}
      />
    </div>
  )
}

export default DonationList

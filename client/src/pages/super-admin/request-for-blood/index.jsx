import MiniDrawerSuperAdmin from '../../../layouts/super-admin/MiniDrawerSuperAdmin'
import React, { useState, useEffect } from 'react'
import { Space, Modal, notification } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    CloseCircleOutlined,
    CheckCircleTwoTone,
} from '@ant-design/icons'
import { Button } from 'antd'
import CustomTable from '../../../components/custom-table/index'
import * as organizationApi from '../../../api/organization'
import * as bloodApi from '../../../api/requestBlood'
import moment from 'moment'
import router from 'next/router'
import Link from 'next/link'

export default function superAdmin() {
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    useEffect(async () => {
        try {
            const res = await bloodApi.getPendingRequests();
            const volunteers = res.data.map((volunteer) => {
                return { ...volunteer, key: volunteer._id }
            })
            setData(volunteers)
            setFilterData(volunteers)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }, [])

    const addVolunteer = () => {
        // TODO: implement function
        router.push('request-for-blood/add')
    }
    const editVolunteer = (id) => {
        // TODO: implement function
        // await volunteerApi.updateVolunteer(id, newVolunteer)
        router.push(`request-for-blood/${id}`)
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
                volunteer.date_of_birth.toLowerCase().includes(value) ||
                volunteer.gender.toLowerCase().includes(value) ||
                volunteer.identity_card.toLowerCase().includes(value) ||
                // volunteer.note.toLowerCase().includes(value) ||
                // volunteer.amount.toLowerCase().includes(value) ||
                volunteer.blood_type.toLowerCase().includes(value) ||
                volunteer.phone_number.toLowerCase().includes(value),
        )
        setFilterData(filtered)
    }

    const openNotificationSuccess = () => {
        notification.success({
            icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
            duration: 3,
            message: 'Đã xoá thành công tổ chức',
        })
    }

    const deleteVolunteer = (id) => {
        Modal.confirm({
            title: 'Xoá tình tổ chức',
            icon: <CloseCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xoá tổ chức này không?',
            onOk: async () => {
                try {
                    await bloodApi.deleteRequest(id)
                    removeVolunteer(id)
                    openNotificationSuccess()
                } catch (error) {
                    console.log(error)
                }
            },
            onCancel: () => { },
            centered: true,
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
        })
    }

    const columns = [
        {
            title: 'Họ và tên ',
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
            render: (gender) => (gender === 'male' ? 'Nam' : 'Nữ'),
        },
        {
            title: 'CCCD',
            dataIndex: 'identity_card',
            key: 'identity_card',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Lượng máu (ml)',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Nhóm máu',
            dataIndex: 'blood_type',
            key: 'blood_type',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
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
        <MiniDrawerSuperAdmin>
            <div className='volunteers'>
                <div className="adminTitle">
                    Danh sách đơn đăng ký nhận máu
                </div>
                <CustomTable
                    data={filterData}
                    columns={columns}
                    disableExcel={true}
                    addBtnText="Thêm đơn đăng ký nhận máu"
                    onAddBtnClick={addVolunteer}
                    searchPlaceHolder="Tìm kiếm đơn đăng ký nhận máu"
                    onChange={searchVolunteer}
                />
            </div>
        </MiniDrawerSuperAdmin>
    )
}

import MiniDrawerSuperAdmin from '../../../layouts/super-admin/MiniDrawerSuperAdmin'
import React, { useState, useEffect } from 'react'
import { Space, Modal, notification } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    CloseCircleOutlined,
    CheckCircleTwoTone,
    UserOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import CustomTable from '../../../components/custom-table/index'
import * as organizationApi from '../../../api/organization'
import moment from 'moment'
import router from 'next/router'
import Link from 'next/link'

export default function superAdmin() {
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    useEffect(async () => {
        try {
            const res = await organizationApi.getAllOrganizations()
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
        router.push('organization/add')
    }
    const editVolunteer = (id) => {
        // TODO: implement function
        // await volunteerApi.updateVolunteer(id, newVolunteer)
        router.push(`organization/${id}`)
    }
    const adminView = (id) => {
        // TODO: implement function
        // await volunteerApi.updateVolunteer(id, newVolunteer)
        router.push(`organization/${id}/admins`)
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
                volunteer.description.toLowerCase().includes(value) ||
                volunteer.address.toLowerCase().includes(value),
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
                    await organizationApi.deleteOrganization(id)
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
            title: 'Tên tổ chức',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: '30%'
        },
        {
            title: 'Có là ngân hàng máu ',
            dataIndex: 'is_blood_bank',
            key: 'is_blood_bank',
            render: (key) => (key == 1 ? 'Có' : 'Không'),
        },
        {
            title: 'Hành động',
            key: 'action',
            dataIndex: '_id',
            render: (id) => (
                <Space size="middle">
                    <UserOutlined
                        className="cursor-pointer"
                        onClick={() => adminView(id)}
                    />
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
                    Danh sách tổ chức
                </div>
                <CustomTable
                    data={filterData}
                    columns={columns}
                    addBtnText="Thêm tổ chức"
                    onAddBtnClick={addVolunteer}
                    searchPlaceHolder="Tìm kiếm tổ chức"
                    onChange={searchVolunteer}
                />
            </div>
        </MiniDrawerSuperAdmin>
    )
}

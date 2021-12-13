import {
    CheckCircleTwoTone, CloseCircleOutlined, DeleteOutlined, EditOutlined
} from '@ant-design/icons'
import { Modal, notification, Space } from 'antd'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { getOrgAdmins } from '../../../../../api/organization'
import { deleteUser } from '../../../../../api/user'
import CustomTable from '../../../../../components/custom-table/index'
import MiniDrawerSuperAdmin from '../../../../../layouts/super-admin/MiniDrawerSuperAdmin'
import { env } from "../../../../../../next.config"

function OrganizationAdmins({ admins }) {
    const [data, setData] = useState(admins)
    const [filterData, setFilterData] = useState(admins)

    const addVolunteer = () => {
        // TODO: implement function
        router.push(`/super-admin/organization/${router.query.id}/admins/add/`)
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
                volunteer.email.toLowerCase().includes(value),
        )
        setFilterData(filtered)
    }

    const openNotificationSuccess = () => {
        notification.success({
            icon: <CheckCircleTwoTone twoToneColor="#16ed31" />,
            duration: 3,
            message: 'Đã xoá thành công quà tặng',
        })
    }

    const deleteVolunteer = (id) => {
        Modal.confirm({
            title: 'Xoá tình tổ chức',
            icon: <CloseCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xoá quà tặng này không?',
            onOk: async () => {
                try {
                    //TODO
                    await deleteUser(id)
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
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Hành động',
            key: 'action',
            dataIndex: '_id',
            render: (id) => (
                <Space size="middle">
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
                    Danh sách admin
                </div>
                <CustomTable
                    data={filterData}
                    columns={columns}
                    addBtnText="Thêm admin"
                    onAddBtnClick={addVolunteer}
                    searchPlaceHolder="Tìm kiếm admin"
                    onChange={searchVolunteer}
                />
            </div>
        </MiniDrawerSuperAdmin>
    )
}

OrganizationAdmins.getInitialProps = async (ctx) => {
    try {
        const res = await getOrgAdmins(ctx.query.id);
        const admins = res.data.map((admin) => {
            return { ...admin, key: admin._id }
        })
        return {
            admins
        }
    } catch (error) {
        console.log(error)
    }
} 

export default OrganizationAdmins
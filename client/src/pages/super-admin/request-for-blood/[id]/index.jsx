import React, { useState } from 'react'
import { Form, Input, Button, notification, Select, DatePicker } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { addEvent } from '../../../../api/event'
import MiniDrawerSuperAdmin from '../../../../layouts/super-admin/MiniDrawerSuperAdmin';
const { Option } = Select;

const AddOrganizationSuperAdmin = () => {
    const onFinish = async (values) => {
        try {
            //TODO:
            // call api add
            console.log(values);
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Đăng ký tổ chức mới thành công!"
            })
            router.push('/super-admin/request-for-blood')
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <MiniDrawerSuperAdmin>
            <div className="addEvent">
                <div className="title">
                    Chỉnh sửa đơn xin hiến máu
                </div>
                <hr />
                <div className="formContainer">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập họ và tên!',
                                },
                            ]}
                            label="Họ và tên"
                            className="lable"
                        >

                            <Input placeholder='Họ và tên' style={{ height: '40px' }} />
                        </Form.Item>
                        <Form.Item
                            name='date_of_birth'
                            label='Ngày sinh'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập ngày sinh!',
                                },
                            ]}
                        >
                            <DatePicker></DatePicker>
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn giới tính!',
                                },
                            ]}
                            label="Giới tính"
                            className="lable">
                            <Select style={{ width: "20%" }} defaultValue="--Chọn giới tính--">
                                <Option value='male'>Nam</Option>
                                <Option value='female'>Nữ</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="identity_card"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập CCCD!',
                                },
                            ]}
                            label="CCCD"
                        >

                            <Input placeholder='CCCD' />
                        </Form.Item>
                        <Form.Item
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập số điện thoại!',
                                },
                            ]}
                            label="SĐT"
                        >

                            <Input placeholder='SĐT' />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập lượng máu!',
                                },
                            ]}
                            label="Lượng máu (ml)"
                        >

                            <Input placeholder='Lượng máu' />
                        </Form.Item>
                        <Form.Item
                            name="blood_type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập nhóm máu!',
                                },
                            ]}
                            label="Nhóm máu"
                        >

                            <Input placeholder='Nhóm máu' />
                        </Form.Item>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                        >

                            <Input style={{ paddingBottom: "100px" }} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="addEvenBtn">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </MiniDrawerSuperAdmin>
    )
}

export default AddOrganizationSuperAdmin
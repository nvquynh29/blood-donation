import React from 'react'
import { Form, Input, Button, notification, DatePicker } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { addEvent } from '../../../../api/event'
import MiniDrawer from '../../../../layouts/trial/MiniDrawer';

export default function AddEventPage() {
    const onFinish = async (values) => {
        try {
            values.startDate = values.start_date._d.toLocaleDateString('en-CA')
            await addEvent(values)
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Đăng ký sự kiện mới thành công!"
            })
            router.push('/admin/event')
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <MiniDrawer>
            <div className="addEvent">
                <div className="title">
                    Thêm sự kiện

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
                                    message: 'Nhập tên!',
                                },
                            ]}
                            label="Tên"
                            className="lable"
                        >

                            <Input placeholder='Tên' style={{ height: '40px' }} />
                        </Form.Item>
                        <Form.Item
                            name="start_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập mgày bắt đầu!',
                                },
                            ]}
                            className="date"
                            label="Ngày bắt đầu"
                        >

                            <DatePicker placeholder='Ngày bắt đầu' style={{ height: '40px' }} />
                        </Form.Item>
                        <Form.Item
                            name="duration"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập số ngày diễn ra!',
                                },
                            ]}
                            label="Số ngày diễn ra"
                        >
                            <Input placeholder='Nhập số ngày diễn ra' style={{ height: "40px" }} />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập địa chỉ!',
                                },
                            ]}
                            label="Địa chỉ"
                        >

                            <Input placeholder='Địa chỉ' style={{ height: "100px" }} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="addEvenBtn">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </MiniDrawer >
    )
}

import React from 'react'
import { Form, Input, Button, notification, DatePicker } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { updateEvent, getEventDetail } from '../../../../api/event'
import MiniDrawer from '../../../../layouts/trial/MiniDrawer';

function EditEventPage({ event }) {

    const onFinish = async (values) => {
        try {
            values.startDate = values.start_date._d.toLocaleDateString('en-CA')
            await updateEvent(router.query.id, values)
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Chỉnh sửa sự kiện thành công!"
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
                    Chỉnh sửa thông tin sự kiện
                </div>
                <hr />
                <div className="formContainer">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={{
                            name: event.name,
                            start_date: moment(event.start_date),
                            duration: event.duration,
                            address: event.address,
                        }}
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
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value > 0 && value <= 31) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            "Số ngày diễn ra phải lớn hơn 0 và nhỏ hơn 31!"
                                        )
                                    }
                                })
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
                            <Button type="primary" htmlType="submit"
                                className="addEvenBtn">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </MiniDrawer>
    )
}

EditEventPage.getInitialProps = async (ctx) => {
    const event = await getEventDetail(ctx.query.id)
    return {
        event: event.data
    }
}

export default EditEventPage
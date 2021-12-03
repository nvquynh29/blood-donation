import React from 'react'
import { Form, Input, Button, notification, DatePicker } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { updateEvent, getEventDetail } from '../../../../api/event'  

function EditEventPage({event}) {

    const onFinish =async (values) => {
        try {
            values.startDate = values.start_date._d.toLocaleDateString('en-CA')
            await updateEvent(router.query.id ,values)
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Chỉnh sửa sự kiện thành công!"
            })
            router.push('/admin/event')
        } catch(error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div className="addEvent">
            <div className="volunteerForm">
                <div className="formContain">
                    <div className="formHeader"><h3 style={{ color: '#ffffff' }}>Đăng ký sự kiện mới</h3></div>
                    <div className="formMain">
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
                            >
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập tên!',
                                    },
                                ]}
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
                                >
                                    <DatePicker placeholder='Ngày bắt đầu' style={{ height: '40px' }} />
                                </Form.Item>
                               
                            

                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập địa chỉ!',
                                    },
                                ]}

                            >
                                <Input placeholder='Địa chỉ' style={{ height: "100px" }} />
                            </Form.Item>
                            <Form.Item
                                name="duration"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập số ngày diễn ra!',
                                    },
                                ]}

                            >
                                <Input placeholder='Nhập số ngày diễn ra' style={{ height: "100px" }} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit"
                                    className="loginBtn"
                                    style={{
                                        height: '40px',
                                        "font-weight": "400",
                                        "text-transform": "uppercase",
                                        "font-size": "18px",
                                        'letter-spacing': '0.02em',
                                        "background-color": "#FE3C47"
                                    }}>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

EditEventPage.getInitialProps = async (ctx) => {
    const event = await getEventDetail(ctx.query.id)
    return {
        event: event.data
    }
}

export default EditEventPage
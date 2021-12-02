import React, { useState } from 'react'
import { Form, Input, Button, Select, DatePicker, notification } from 'antd';
import { addRequestBlood } from '../../api/requestBlood'
import router from 'next/router'
// TODO: Add input gender to volunteerForm + input blood amount to requestBloodForm
const RequestBloodForm = () => {
    const { Option } = Select
    const { TextArea } = Input
    const onFinish =async (values) => {
        values.birthday = values.birthday._d.toLocaleDateString('en-CA')
        values.date_of_birth = values.birthday
        delete values.birthday
        await addRequestBlood(values)
        notification.open({
            type: 'success',
            message: "Ghi nhận thành công",
            description: "Chúng tôi đã tiếp nhận đơn yêu cầu đơn vị máu của bạn!"
        })
        router.push('/')
    }
    const onFinishFailed = () => {
        console.log('finish failed')
    }

    return (
        <div className="flex requestBloodForm">
            <div className="asidePicRequestBloodForm">
                <img src="https://templates.bwlthemes.com/blood_donation/images/appointment.jpg" alt="appointment image" />
            </div>
            <div className="formContain">
                <div className="formHeader"><h3 style={{ color: '#ffffff' }}>
                Đăng ký nhận đơn vị máu</h3></div>
                <div className="formMain">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
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
                        <div className="flex flex-row gap-x-5 flex-wrap">
                            <Form.Item
                                name="birthday"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập ngày sinh!',
                                    },
                                ]}
                            >
                                <DatePicker placeholder='Ngày sinh' style={{ height: '40px' }} />
                            </Form.Item>
                            <Form.Item 
                                name="gender"    
                                
                            >
                                <Select placeholder="Giới tính" style={{ height: '40px', width: '90px' }}
                                    >
                                    <Option value="male">Nam</Option>
                                    <Option value="female">Nữ</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="blood_type"    
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập nhóm máu!',
                                    },
                                ]}
                                
                            >
                                <Select placeholder="Nhóm máu" style={{ height: '40px', width: '200px' }}
                                    >
                                    <Option value="A">A</Option>
                                    <Option value="B">B</Option>
                                    <Option value="O">O</Option>
                                    <Option value="AB">AB</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        
                        <div className="flex flex-row gap-x-5 flex-wrap">
                            <Form.Item
                                name="phone_number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhận số điện thoại!',
                                    }
                                ]}
                            >
                                <Input placeholder='Số điện thoại' style={{ height: '40px' }} />
                            </Form.Item>
                            <Form.Item
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập lượng máu tiếp nhận!',
                                    }
                                ]}
                            >
                                <Input placeholder='Lượng máu tiếp nhận (đơn vị CC)' style={{ height: '40px', width: '263px' }} />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="identity_card"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập căn cước công dân!',
                                }
                            ]}
                        >
                            <Input placeholder='Căn cước công dân' style={{ height: '40px' }} />
                        </Form.Item>

                      

                        <Form.Item
                            name="note"
                        >
                            <TextArea placeholder='Ghi chú' rows={4} />
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
        </div >
    )
}

export default RequestBloodForm
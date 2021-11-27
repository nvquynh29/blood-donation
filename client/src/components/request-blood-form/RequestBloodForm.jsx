import React, { useState } from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd';



const RequestBloodForm = () => {
    const { Option } = Select
    const { TextArea } = Input
    const onFinish = () => {
        console.log('finish')
    }
    const onFinishFailed = () => {
        console.log('finish failed')
    }

    return (
        <div className="flex flex-row-reverse requestBloodForm">
            
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
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập giới tính!',
                                    },
                                ]}
                                
                            >
                                <Select placeholder="Giới tính" style={{ height: '40px', width: '96px' }}
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
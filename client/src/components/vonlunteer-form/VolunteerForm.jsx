import React, {useContext} from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { ReactReduxContext } from 'react-redux'
import { fillVolunteer }  from '../../store/actions/volunteerAction'
import router from 'next/router'
import moment from 'moment';

export default function VolunteerForm({defaultValue, onFinish, onFinishFailed}) {
    // const { store } = useContext(ReactReduxContext)
    const { Option } = Select
    // const onFinish = (values) => {
    //     store.dispatch(fillVolunteer(values))
    //     router.push('/organization')
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    return (
        <div className="volunteerForm">
            <div className="formContain">
                <div className="formHeader"><h3 style={{ color: '#ffffff' }}>Đăng ký tình nguyện viên</h3></div>
                <div className="formMain">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        initialValues={ !(defaultValue 
                            && Object.keys(defaultValue).length === 0
                            && Object.getPrototypeOf(defaultValue) === Object.prototype)? {...defaultValue, phone_number: defaultValue.phone, birthday: moment(defaultValue?.date_of_birth)}: {} }
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
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Không đúng định dạng email'
                                }
                            ]}
                        >
                            <Input placeholder='Email' style={{ height: '40px' }} />
                        </Form.Item>

                        <div className="flex gap-4">
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
                                        message: "Nhập giới tính!"
                                    }
                                ]}
                            >
                                <Select placeholder="Giới tính" style={{ height: '40px', width: '90px' }}
                                    >
                                    <Option value="male">Nam</Option>
                                    <Option value="female">Nữ</Option>
                                </Select>
                            </Form.Item>
                        </div>

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

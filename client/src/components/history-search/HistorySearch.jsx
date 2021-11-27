import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import Group from 'rc-image/lib/PreviewGroup';


export default function HistorySearch() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='historySearch'>
            <div className="adviseTitle" style={{ 'text-align': 'center' }}><h1>Tra cứu lịch sử hiến máu</h1></div>
            <div className="historySearchForm">
                <Form
                    name="basic"
                    layout={'inline'}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Input.Group className='hisFormInputs'>
                        <Form.Item
                            label="Họ và tên"
                            name="ten"
                            className='hisFormLabel'
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ và tên không được để trống',
                                },
                            ]}
                        >
                            <Input className='hisFormInput' placeholder='Họ và tên' />
                        </Form.Item>

                        <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                            className='hisFormLabel'
                            rules={[
                                {
                                    required: true,
                                    message: 'Ngày sinh không hợp lệ',
                                },
                            ]}
                        >
                            <DatePicker placeholder='Ngày/Tháng/Năm' className='hisFormInput' style={{ 'margin-bottom': '0px' }} />
                        </Form.Item>
                        <Form.Item
                            label='Giới tính'
                            name="gender"
                            className='hisFormLabel'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn giới tính',
                                },
                            ]}>
                            <Select placeholder='Giới tính' className='hisFormInput' style={{ 'margin-bottom': '0px' }}>
                                <option value='nam'>Nam</option>
                                <option value='nu'>Nữ</option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            className='hisFormLabel'
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Số điện thoại không được để trống',
                                },
                            ]}
                        >
                            <Input className='hisFormInput'
                                placeholder='Số điện thoại'
                                pattern="(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})" />
                        </Form.Item>

                        <Form.Item
                            label="CCCD/HC"
                            className='hisFormLabel'
                            name="cccd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập số CCCD/HC',
                                },
                            ]}
                        >
                            <Input className='hisFormInput' placeholder="CCCD/HC" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            className='hisFormLabel'
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Vui lòng nhập email hợp lệ!'
                                }
                            ]}
                        >
                            <Input className='hisFormInput' placeholder="Email" />
                        </Form.Item>
                    </Input.Group>

                    <Input.Group className='hisSearchFormBtns'>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={() => {
                                form.resetFields();
                            }}>
                                <SyncOutlined style={{ position: 'relative', bottom: '3px' }} /> Nhập lại
                            </Button>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ 'background-color': "#FE3C47" }} className='hisSearchB'>
                                <SearchOutlined style={{ position: 'relative', bottom: '3px' }} />Tra cứu
                            </Button>
                        </Form.Item>
                    </Input.Group>
                </Form>
            </div>
        </div>
    )

}

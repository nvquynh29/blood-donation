import React, { useState } from 'react'
import { Form, Input, Button, notification, Select } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { addEvent } from '../../../../api/event'
import MiniDrawerSuperAdmin from '../../../../layouts/super-admin/MiniDrawerSuperAdmin';
const { Option } = Select;
import UploadAndDisplayImage from '../../../../components/img-upload'


const AddOrganizationSuperAdmin = () => {
    const onFinish = async (values) => {
        try {

            let inpFile = document.getElementById('img_path');
            values.img_path = inpFile.files[0];
            console.log(values);

            //TODO:
            // call api add


            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Đăng ký tổ chức mới thành công!"
            })
            router.push('/super-admin/organization')
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    const props = {
        url: null
    };

    return (
        <MiniDrawerSuperAdmin>
            <div className="addEvent">
                <div className="title">
                    Thêm tổ chức
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
                        <UploadAndDisplayImage props={props}>
                        </UploadAndDisplayImage>

                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên tổ chức!',
                                },
                            ]}
                            label="Tên tổ chức"
                            className="lable"
                        >

                            <Input placeholder='Tên tổ chức' style={{ height: '40px' }} />
                        </Form.Item>

                        <Form.Item
                            name="is_blood_bank"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn trường này!',
                                },
                            ]}
                            label="Có là ngân hàng máu"
                            className="lable">
                            <Select style={{ width: "20%" }} defaultValue="--Chọn có/không--">
                                <Option value='1'>Có</Option>
                                <Option value='0'>Không</Option>
                            </Select>
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
        </MiniDrawerSuperAdmin>
    )
}

export default AddOrganizationSuperAdmin
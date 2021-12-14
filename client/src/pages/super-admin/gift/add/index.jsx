import React, { useState } from 'react'
import { Form, Input, Button, notification, Select } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { addGift } from '../../../../api/gifts'
import MiniDrawerSuperAdmin from '../../../../layouts/super-admin/MiniDrawerSuperAdmin';
const { Option } = Select;
import UploadAndDisplayImage from '../../../../components/img-upload'


const AddOrganizationSuperAdmin = () => {
    const onFinish = async (values) => {
        try {

            let inpFile = document.getElementById('img_path');
            values.img = inpFile.files[0];
            //TODO:
            await addGift(values)
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Đăng ký tổ chức mới thành công!"
            })
            router.push('/super-admin/gift')
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    const props = {
        url: null,
        label: 'Ảnh quà tặng'
    };

    return (
        <MiniDrawerSuperAdmin>
            <div className="addEvent">
                <div className="title">
                    Thêm quà tặng
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
                                    message: 'Nhập tên quà tặng!',
                                },
                            ]}
                            label="Tên quà tặng"
                            className="lable"
                        >

                            <Input placeholder='Tên quà tặng' style={{ height: '40px' }} />
                        </Form.Item>

                        <Form.Item
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn trường này!',
                                },
                            ]}
                            label="Loại quà tặng"
                            className="lable">
                            <Input placeholder='Loại quà tặng' style={{ height: '40px' }} />
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
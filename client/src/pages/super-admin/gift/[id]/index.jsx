import React, { useState } from 'react'
import { Form, Input, Button, notification, Select } from 'antd';
import router from 'next/router'
import moment from 'moment'
import { updateGift, getGift } from '../../../../api/gifts'
import MiniDrawerSuperAdmin from '../../../../layouts/super-admin/MiniDrawerSuperAdmin';
const { Option } = Select;
import UploadAndDisplayImage from '../../../../components/img-upload'
import { getFabUtilityClass } from '@mui/material';


const editGift = ({ gift }) => {
    const onFinish = async (values) => {
        try {

            let inpFile = document.getElementById('img_path');
            values.img = inpFile.files[0];
            //TODO:
            await updateGift(router.query.id, values)
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
        url: gift.image_path,
        label: 'Ảnh quà tặng'
    };

    return (
        <MiniDrawerSuperAdmin>
            <div className="addEvent">
                <div className="title">
                    Chỉnh sửa quà tặng
                </div>
                <hr />
                <div className="formContainer">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        initialValues={
                           {
                                name: gift.name,
                                type: gift.type,
                           }
                        }
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
                            Lưu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </MiniDrawerSuperAdmin>
    )
}
editGift.getInitialProps = async (ctx) => {
    const res = await getGift(ctx.query.id)
    return {
        gift: res.data
    }
}
export default editGift
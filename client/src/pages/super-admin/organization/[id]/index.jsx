import React, { useState } from 'react'
import { Form, Input, Button, notification, Select } from 'antd';
import router from 'next/router'
import { updateEvent, getOrganization } from '../../../../api/organization'
import MiniDrawerSuperAdmin from '../../../../layouts/super-admin/MiniDrawerSuperAdmin';
const { Option } = Select;
import UploadAndDisplayImage from '../../../../components/img-upload'




function EditOrganizationSuperAdmin({ event }) {
    console.log(event.img_path);
    const props = {
        url: event.img_path
    };

    const onFinish = async (values) => {
        try {
            let inpFile = document.getElementById('img_path');
            values.img_path = inpFile.files[0];
            console.log(values);

            //TODO:
            //Call api update
            //await updateEvent(router.query.id, values)

            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Chỉnh sửa tổ chức thành công!"
            })
            // router.push('/super-admin/organization')
        } catch (error) {
            console.log(error)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <MiniDrawerSuperAdmin>
            <div className="addEvent">
                <div className="title">
                    Chỉnh sửa tổ chức
                </div>
                <hr />
                <div className="formContainer">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        initialValues={{
                            name: event.name,
                            is_blood_bank: event.is_blood_bank,
                            address: event.address,
                        }}
                    >
                        <UploadAndDisplayImage props={props}></UploadAndDisplayImage>
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

EditOrganizationSuperAdmin.getInitialProps = async (ctx) => {
    const event = await getOrganization(ctx.query.id)
    console.log(event.data);
    return {
        event: event.data
    }
}

export default EditOrganizationSuperAdmin
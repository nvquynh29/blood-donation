import React, { useEffect, useState } from 'react'
import { Input, Form, Button, notification } from 'antd'
import MiniDrawerSuperAdmin from '../../../layouts/super-admin/MiniDrawerSuperAdmin'
import * as userApi from '../../../api/user'
import { getDatasetAtEvent } from 'react-chartjs-2'

function Profile() {
  const [user, setUser] = useState({})
  const [form] = Form.useForm();

  const openNotification = () => {
    notification.success({
      type: 'success',
      message: 'Cập nhật thông tin thành công',
    })
  }

  const getCurrentUser = async () => {
    try {
      const res = await userApi.getUser()
      form.setFieldsValue({
        name: res.data.name,
        email: res.data.email
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUser()

  }, [])

  const onFinish = async (values) => {
    // TODO: validate form
    const { name, email, currentPassword, newPassword } = values
    const payload = { name, email, currentPassword, newPassword }
    try {
      const res = await userApi.updateUser(payload)
      openNotification()
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <MiniDrawerSuperAdmin>
      <div className="profile">
        <div className="title">Thông tin cá nhân</div>
        <div className="mx-auto form">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                { required: true, message: 'Họ và tên không được để trống' },
              ]}
            >
              <Input defaultValue={user?.name} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
            // rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
            // rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
            // rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit" className="btn">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MiniDrawerSuperAdmin>
  )
}

export default Profile

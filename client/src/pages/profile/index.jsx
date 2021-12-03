import React, { useEffect, useState } from 'react'
import { Input, Form, Button, notification } from 'antd'
import MiniDrawer from '../../layouts/trial/MiniDrawer'
import * as userApi from '../../api/user'

function Profile() {
  const [user, setUser] = useState({})

  const openNotification = () => {
    notification.success({
      type: 'success',
      message: 'Chấp nhận đăng ký tiếp nhận máu thành công!',
    })
  }

  const getUser = async () => {
    try {
      const res = await userApi.getUser()
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onFinish = async (values) => {
    // TODO: validate form
    const { name, email, currentPassword, newPassword } = values
    const payload = { name, email, currentPassword, newPassword }
    try {
      const res = await userApi.updateUser(payload)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <MiniDrawer>
      <div className="mx-auto">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ name: user.name, email: user.email }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              { required: true, message: 'Họ và tên không được để trống' },
            ]}
          >
            <Input />
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
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MiniDrawer>
  )
}

export default Profile

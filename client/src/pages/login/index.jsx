import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()

  const onFinish = (values) => {
    router.push('/')
    console.log('Received values of form: ', values)
  }

  return (
    <div>
      <div className="grid justify-center items-center h-screen">
        <Form
          size="large"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập "
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="middle"
              htmlType="submit"
              className="login-form-button mx-2"
            >
              Đăng nhập
            </Button>
            Hoặc <a href=""> Đăng ký ngay!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login

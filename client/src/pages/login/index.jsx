import React from 'react'
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import * as auth from '../../api/auth'

const Login = () => {
  const router = useRouter()
  const onFinish = (values) => {
    login(values)
  }

  // TODO: signup check status code 400, 409

  const login = async (credential) => {
    const res = await auth.login(credential)
    if (res.status === 401) {
      console.log('Error 401, check credential')
    } else if (res.status == 200) {
      router.push('/home')
    }
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
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="middle"
              htmlType="submit"
              className="login-form-button mx-2"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login

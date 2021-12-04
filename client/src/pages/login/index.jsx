import React from 'react'
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import * as auth from '../../api/auth'
import { useForm } from 'antd/lib/form/Form'
import Cookies from 'universal-cookie'

const Login = () => {
  const router = useRouter()
  const cookies = new Cookies()

  const onFinish = async (values) => {
    await login(values)
  }
  const form = useForm()

  const writeCookies = ({ accessToken, refreshToken }) => {
    cookies.set('accessToken', accessToken, { path: '/' })
    if (refreshToken) {
      cookies.set('refreshToken', refreshToken, { path: '/' })
    }
  }

  const login = async (credential) => {
    try {
      const res = await auth.login(credential)
      if (res.status === 200) {
        writeCookies(res.data)
        router.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="loginContainer">
      <div className="asidepic">
        <img src="https://wallpapercave.com/wp/wp4323511.jpg" alt="pic" />
      </div>
      <div className="loginForm">
        <div className="loginMain">
          <h1 className="loginTitle">Log In</h1>
          <Form
            size="large"
            name="normal_login"
            className="login-form myLoginForm"
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
              <Input
                prefix={<UserOutlined className="site-form-item-icon " />}
                placeholder="Email"
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
                prefix={<LockOutlined className="site-form-item-icon " />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <div className="loginDetail">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="middle" htmlType="submit" className="loginBtn">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

Login.getInitialProps = async (ctx) => {
  const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : '')
  if (cookies.get('accessToken')) {
    ctx.res.writeHead(302, {
      Location: '/home',
    })
    ctx.res.end()
  }
  return {}
}

export default Login

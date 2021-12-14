import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import * as auth from '../../api/auth'
import { useForm } from 'antd/lib/form/Form'
import Cookies from 'universal-cookie'
import { ReactReduxContext } from 'react-redux'
import { requestUserApi } from '../../store/actions/userAction'

const Login = () => {
  const { store } = useContext(ReactReduxContext)
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
        writeCookies({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })
        store.dispatch(requestUserApi(res.data.accessToken))
        if (res.data.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/super-admin/organization')
        }
      }
    } catch (error) {
      return notification.error({
        message: 'Đăng nhập thất bại',
        description: 'Tài khoản hoặc mật khẩu không đúng',
      })

      console.log(error)
    }
  }

  return (
    <div className="loginContainer">
      <div className="asidepic rounded-tl-md rounded-bl-md">
        <img className="bg-white" src="/logo-giot-hong.png" alt="pic" />
      </div>
      <div className="loginForm flex flex-col items-center justify-center rounded-r-md rounded-b-md">
        <div className="loginMain">
          <h1 className="loginTitle text-center !font-Dosis">Đăng nhập</h1>
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
                  validator: async (rule, value) => {
                    console.log(value.includes('@'))
                    if (!value.includes('@')) {
                      return Promise.reject('Email không hợp lệ')
                    }
                    return Promise.resolve()
                  },

                  required: true,
                  message: 'Tài khoản không hợp lệ!',
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
                  validator: (rule, value) => {
                    if (value.length < 8) {
                      return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự')
                    }
                    return Promise.resolve()
                  },

                  required: true,
                  message: 'Mật khẩu không hợp lệ!',
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
                  <Checkbox>Ghi nhớ tài khoản</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="middle"
                htmlType="submit"
                className="loginBtn"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Login

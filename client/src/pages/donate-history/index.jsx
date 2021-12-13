import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { Form, Input, Button, Select, DatePicker, Modal, notification } from 'antd'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import Countdown, { zeroPad } from 'react-countdown'
import { findDonation, sendOTP, verifyOTP } from '../../api/donation'
import SearchResult from '../../components/search-result'
import moment from 'moment'
import MainLayout from '../../layouts/main-layout/Default'

function DonateHistory() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [otp, setOtp] = useState('')
  const time = 120000  // 2 min
  const [form] = Form.useForm()
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState([])
  const [showOTPError, setShowOTPError] = useState(false)
  const [startTimer, setStartTimer] = useState(Date.now())

  const openNotification = () => {
    notification['error']({
      message: 'Không tìm thấy thông tin',
      description:
        'Hệ thống không tìm thấy thông tin của bạn. Vui lòng kiểm tra lại thông tin bạn đã nhập và thử lại sau.',
      duration: 4.5,
    })
  }

  const onFinish = async (values) => {
    const { name, date_of_birth, gender, phone, citizenID, email } = values
    date_of_birth = moment(date_of_birth.startOf('day')).utcOffset('+00:00', true)
    const payload = { date_of_birth, gender, phone, citizenID }
    if (name) {
      payload.name = name
    }
    if (email) {
      payload.email = email
    }

    try {
      const res = await findDonation(payload)
      if (res.status === 200 && res.statusText === 'OK') {
        if (res.data && !Array.isArray(res.data)) {
          setResult(res.data)
          showModal()
          await sendOTP(phone)
        } else {
          openNotification()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo)
  // }

  const handleChange = (value) => {
    setOtp(value)
  }

  const showModal = () => {
    setStartTimer(Date.now())
    setIsModalVisible(true)
  }

  const checkOTP = async (otp) => {
    const { phone } = form.getFieldsValue()
    try {
      const res = await verifyOTP(phone, otp)
      if (res.status === 200) {
        if (res.data.valid) {
          return true
        }
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleOk = async () => {
    const matchOTP = await checkOTP(otp)
    if (matchOTP) {
      setIsModalVisible(false)
      setShowResult(true)
    } else {
      setShowOTPError(true)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleCloseModal = () => {
    setOtp('')
    setShowOTPError(false)
  }

  const inputStyle = {
    borderBottom: '2px solid #FE3C47',
    width: '50px',
    height: '70px',
    fontSize: '60px',
  }

  return (
    <MainLayout>
      <div>
        <div className="historySearch">
          <div className="historySearchForm">
            <div className="adviseTitle" style={{ 'text-align': 'center' }}>
              <h1>Tra cứu lịch sử hiến máu</h1>
            </div>
            <Form
              name="basic"
              layout={'inline'}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              form={form}
            >
              <Input.Group className="hisFormInputs">
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  className="hisFormLabel"
                  rules={[
                    {
                      required: false,
                      // message: 'Họ và tên không được để trống',
                    },
                  ]}
                >
                  <Input className="hisFormInput" placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item
                  label="Ngày sinh"
                  name="date_of_birth"
                  className="hisFormLabel"
                  rules={[
                    {
                      required: true,
                      message: 'Ngày sinh không hợp lệ',
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Ngày/Tháng/Năm"
                    className="hisFormInput"
                    style={{ 'margin-bottom': '0px' }}
                  />
                </Form.Item>
                <Form.Item
                  label="Giới tính"
                  name="gender"
                  className="hisFormLabel"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn giới tính',
                    },
                  ]}
                >
                  <Select
                    placeholder="Giới tính"
                    className="hisFormInput"
                    style={{ 'margin-bottom': '0px' }}
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  className="hisFormLabel"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Số điện thoại không được để trống',
                    },
                  ]}
                >
                  <Input className="hisFormInput" placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item
                  label="CCCD"
                  className="hisFormLabel"
                  name="citizenID"
                  rules={[
                    {
                      required: true,
                      message: 'Nhập số CCCD',
                    },
                  ]}
                >
                  <Input className="hisFormInput" placeholder="CCCD" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  className="hisFormLabel"
                  rules={[
                    {
                      required: false,
                      type: 'email',
                    },
                  ]}
                >
                  <Input className="hisFormInput" placeholder="Địa chỉ email" />
                </Form.Item>
              </Input.Group>

              <Input.Group className="hisSearchFormBtns">
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.resetFields()
                    }}
                  >
                    <SyncOutlined
                      style={{ position: 'relative', bottom: '3px' }}
                    />{' '}
                    Nhập lại
                  </Button>
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ 'background-color': '#FE3C47' }}
                    className="hisSearchB"
                    // onClick={}
                  >
                    <SearchOutlined
                      style={{ position: 'relative', bottom: '3px' }}
                    />
                    Tra cứu
                  </Button>
                </Form.Item>
              </Input.Group>
            </Form>
          </div>
        </div>

        <Modal
          title="Xác thực OTP"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Huỷ bỏ"
          okText="Xác nhận"
          closable
          afterClose={handleCloseModal}
          className="otpModel"
        >
          <div>
            <p
              style={{
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Mã xác minh sẽ được gửi bằng tin nhắn đến SĐT bạn đăng ký
            </p>
            <div className="flex flex-col items-center justify-center">
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span className="mx-1"></span>}
                shouldAutoFocus
                inputStyle={inputStyle}
              />
              <span className="text-red-500" hidden={!showOTPError}>
                Mã xác thực không hợp lệ
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p style={{ marginTop: '10px' }}>
                Nếu bạn không nhận được tin nhắn, vui lòng thử lại sau:
              </p>
              <Countdown
                date={startTimer + time}
                renderer={(props) => (
                  <span>{`${zeroPad(props.minutes)}:${zeroPad(
                    props.seconds,
                  )}`}</span>
                )}
              />
            </div>
          </div>
        </Modal>
        <div className={showResult ? '' : 'hidden'}>
          <SearchResult data={result} />
        </div>
      </div>
    </MainLayout>
  )
}

export default DonateHistory

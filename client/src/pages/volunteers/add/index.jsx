import react from 'react'
import VolunteerForm from '../../../components/vonlunteer-form/VolunteerForm'
import router from 'next/router'
import {notification} from 'antd'
import { AddVolunteer } from '../../../api/volunteer'
const VolunteerAdd = () => {

    return (
    <div className="flex justify-center w-full volunteerAdd">
        <div className="asidePicRequestBloodForm">
          <img src="https://templates.bwlthemes.com/blood_donation/images/appointment.jpg" alt="appointment image" />
        </div>
        <VolunteerForm defaultValue={{ } }
            onFinish={async (values) => {
            values.birthday = values.birthday._d.toLocaleDateString('en-CA')
            values.accepted = true
            values.organization_id = 'mine'
            await AddVolunteer(values)
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Thêm tình nguyện viên mới thành công!"
            })
            router.push('/volunteers')
        }} 
          onFinishFailed={(error) => {console.error(error)}}
        />
      </div>
    )
}

export default VolunteerAdd
import react from 'react'
import VolunteerForm from '../../../components/vonlunteer-form/VolunteerForm'
import router from 'next/router'
import {notification} from 'antd'
import { EditVolunteer } from '../../../api/volunteer'
const VolunteerEdit = () => {

    return (
    <div className="flex justify-center w-full volunteerEdit">
        <div className="asidePicRequestBloodForm">
          <img src="https://templates.bwlthemes.com/blood_donation/images/appointment.jpg" alt="appointment image" />
        </div>
        {/* TODO: API */}
        <VolunteerForm defaultValue={{ } }
            onFinish={async (values) => {
            values.birthday = values.birthday._d.toLocaleDateString('en-CA')
            // await EditVolunteer(values)
            notification.open({
                type: "success",
                message: "Ghi nhận thành công",
                description: "Chỉnh sửa thông tin tình nguyện viên thành công!"
            })
            router.push('/volunteers')
        }} 
          onFinishFailed={(error) => {console.error(error)}}
        />
      </div>
    )
}

export default VolunteerEdit
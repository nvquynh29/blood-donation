import react from 'react'
import VolunteerForm from '../../../../components/vonlunteer-form/VolunteerForm'
import router from 'next/router'
import { notification } from 'antd'
import { AddVolunteerOrg } from '../../../../api/volunteer'
import MiniDrawer from '../../../../layouts/trial/MiniDrawer'
const VolunteerAdd = () => {

  return (
    <MiniDrawer>
      <div className="flex justify-center w-full volunteerAdd">
        <div className="asidePicRequestBloodForm">
          <img src="https://templates.bwlthemes.com/blood_donation/images/appointment.jpg" alt="appointment image" />
        </div>
        <VolunteerForm defaultValue={{}}
          onFinish={async (values) => {
            values.birthday = values.birthday._d.toLocaleDateString('en-CA')
            values.accepted = true
            values.organization_id = 'mine'
            await AddVolunteerOrg(values)
            notification.open({
              type: "success",
              message: "Ghi nhận thành công",
              description: "Thêm tình nguyện viên mới thành công!"
            })
            router.prefetch('/admin/volunteers')
            router.push('/admin/volunteers')
          }}
          onFinishFailed={(error) => { console.error(error) }}
        />
      </div>
    </MiniDrawer>
  )
}

export default VolunteerAdd
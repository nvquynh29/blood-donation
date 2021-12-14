import react from 'react'
import VolunteerForm from '../../../../components/vonlunteer-form/VolunteerForm'
import router from 'next/router'
import { notification } from 'antd'
import { updateVolunteer, getVolunteer } from '../../../../api/volunteer'
import MiniDrawer from '../../../../layouts/trial/MiniDrawer'
const VolunteerEdit = ({ volunteer }) => {
  return (
    <MiniDrawer>
      <div className="flex justify-center w-full volunteerEdit">
        <div className="asidePicRequestBloodForm">
          <img src="https://templates.bwlthemes.com/blood_donation/images/appointment.jpg" alt="appointment image" />
        </div>
        {/* TODO: API */}
        <VolunteerForm defaultValue={volunteer}
          onFinish={async (values) => {
            values.date_of_birth = values.birthday._d.toLocaleDateString('en-CA')
            values.phone = values.phone_number._d
            await updateVolunteer(router.query.id, values)
            notification.open({
              type: "success",
              message: "Ghi nhận thành công",
              description: "Chỉnh sửa thông tin tình nguyện viên thành công!"
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

VolunteerEdit.getInitialProps = async (ctx) => {
  const res = await getVolunteer(ctx.query.id)
  return {
    volunteer: res.data
  }
}
export default VolunteerEdit
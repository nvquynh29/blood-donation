import React, { useEffect, useState } from "react"
import VolunteerForm from "../../components/organization-volunteer-form"
import MainLayout from "../../layouts/main-layout/Default"
import { getOrganization, getAdmins } from "../../api/organization"
import router from "next/router"
import { env } from "../../../next.config"
import CustomTable from "../../components/custom-table"
import moment from "moment"

function OrganizationDetail() {


  const [admins, setAdmins] = useState([])
  const [adminData, setAdminData] = useState([])
  const [organization, setOrganization] = useState({})
  useEffect(async () => {
    try {
      const res1 = await getOrganization("619a76c62465b779011b3d01")
      const res2 = await getAdmins()
   
      setOrganization(res1.data),
      setAdminData(res2.data)
      setAdmins(res2.data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  const searchAdmin = (e) => {
    const value = e.target.value?.toLowerCase()
    const filtered = admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(value) ||
        admin.phone.toLowerCase().includes(value) ||
        admin.email.toLowerCase().includes(value)
    )
    setAdminData(filtered)
  }
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (dob) => moment(dob).format("DD/MM/YYYY"),
      width: "25%",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
  ]
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 organizationDetail gap-5">
      <div className="col-span-1 picContain">
        <div className="mt-14 text-2xl text-red-500 font-bold head">
          {organization?.name}
        </div>
        <div className=" p-3 pic ">
          <img
            src={
              organization.img_path
                ? `${env.API_URL}/getFile?img_path=${organization.img_path}`
                : "../images/slider-1.jpg"
            }
            alt="Man looking at item at a store"
          />
          <h3 className="mt-5 text-xl ad">{organization.address}</h3>
          <p className="mt-5 text-xl des">{organization.description}</p>
        </div>
      </div>
      <div className="col-span-1 w-1/2 pt-14 text-red-500 text-2xl text-center">
        Danh sách người quản lý
        <CustomTable
          data={adminData}
          columns={columns}
          searchPlaceHolder="Tìm kiếm người quản lý"
          onChange={searchAdmin}
        />
      </div>
    </div>
  )
}

export default OrganizationDetail

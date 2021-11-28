import React, { useEffect, useState } from 'react'
import VolunteerForm from '../../../components/organization-volunteer-form'
import MainLayout from '../../../layouts/main-layout/Default'
import { getOrganization } from '../../../api/organization'
import { useRouter } from 'next/router' 
import { API_URL } from '../../../api/auth'

 function OrganizationDetail(props) {
    
    const organization = props.organization
    return (
    <MainLayout>
        <div className="grid xl:grid-cols-2 grid-cols-1">
            <VolunteerForm/>
            <div className="col-span-1">
                <div className="mt-14 text-2xl text-red-500 font-bold">{organization?.name}</div>
                <div className="bg-[#eaedf1] p-3">
                <img
                    class=" w-3/4 object-cover mx-auto"
                    src={organization.img_path ? `${API_URL}/getFile?img_path=${organization.img_path}` : '../images/slider-1.jpg'}
                    alt="Man looking at item at a store"
                />
                <p className="mt-5 text-xl">
                    {organization.address}
                </p>
                <p className="mt-5 text-xl">
                    {organization.description}
                </p>
                </div>
            </div>
        </div>
</MainLayout>
    )
}
OrganizationDetail.getInitialProps =async (ctx) => {
        const { id } = ctx.query
        const res = await getOrganization(id)
        return {
            organization: res.data
        }
   
}

export default OrganizationDetail
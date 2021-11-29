import React, { useEffect, useState } from 'react'
import VolunteerForm from '../../../components/organization-volunteer-form'
import MainLayout from '../../../layouts/main-layout/Default'
import { getOrganization } from '../../../api/organization'
import { useRouter } from 'next/router'
import { env } from '../../../../next.config'
function OrganizationDetail(props) {

    const organization = props.organization
    return (
        <div className="grid xl:grid-cols-2 grid-cols-1 organizationDetail">
            <div className="col-span-1 picContain">
                <div className="mt-14 text-2xl text-red-500 font-bold head">{organization?.name}</div>
                <div className=" p-3 pic ">
                    <img
                        src={organization.img_path ? `${env.API_URL}/getFile?img_path=${organization.img_path}` : '../images/slider-1.jpg'}
                        alt="Man looking at item at a store"
                    />
                    <h3 className="mt-5 text-xl ad">
                        {organization.address}
                    </h3>
                    <p className="mt-5 text-xl des">
                        {organization.description}
                    </p>
                </div>
            </div>
            <div className="volunteerForm1">
                <VolunteerForm className='volunteerForm' />
            </div>
        </div>
    )
}
OrganizationDetail.getInitialProps = async (ctx) => {
    const { id } = ctx.query
    const res = await getOrganization(id)
    return {
        organization: res.data
    }

}

export default OrganizationDetail
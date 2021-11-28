import React, { useState, useEffect} from 'react'
import CustomCard from '../../components/card/Card'
import MainLayout from '../../layouts/main-layout/Default'
import { getAllOrganizations, getFile } from '../../api/organization'
import { API_URL } from '../../api/auth'
import Link from 'next/link'

const Organization = () => {
    const [organizations, setOrganizations] = useState([])
    useEffect(() => {
        try {
            getAllOrganizations().then(res => {
                console.log(res)
                setOrganizations(res.data)
            })
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <MainLayout>
            <div className="mx-auto container organizationPage">
            <div className="title mt-10 ml-10 text-red-400 text-4xl font-bold">Các tổ chức</div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 px-10 py-10 listOrganization">
                { organizations.map((organization) => ( 
                <Link href={`organization/${organization._id}`} className="cursor-pointer">
                    <div class="max-w-md h-full mx-auto bg-white  shadow-md overflow-hidden md:max-w-2xl">
                        <div class="md:flex flex-col">
                        <div class="flex-shrink-0">
                            <img
                            class=" w-full object-cover h-full"
                            src={organization.img_path ? `${API_URL}/getFile?img_path=${organization.img_path}` : '../images/slider-1.jpg'}
                            alt="Man looking at item at a store"
                            />
                        </div>
                        <div class="p-8">
                            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {''}
                            </div>
                            <p
                                class="block mt-1 text-3xl leading-tight font-medium font-Dosis text-black"
                            >
                                {organization.name}
                            </p>
                            <p class="mt-2 font-Dosis text-gray-500 xl:text-xl lg:text-2xl md:text-base text-base h-auto ">
                            {organization.address}
                            </p>
                        </div>
                        </div>
                    </div>
                </Link> )) }
                                  
            </div>
            </div>
        </MainLayout>
    )
}
export default Organization

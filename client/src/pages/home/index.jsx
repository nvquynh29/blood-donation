import React from "react";
import SideBar from "../../components/sidebar"


import dynamic from 'next/dynamic'

const MultiStepForm = dynamic(() => import('../../components/multistep-form'), {
  ssr: false,
})
function index() {
  return (
    <div>
      <SideBar />

      <MultiStepForm />
    </div>
  )
}

export default index

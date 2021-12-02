import React from 'react'
import SideBar from '../../components/sidebar'

import dynamic from 'next/dynamic'
import MiniDrawer from '../../layouts/trial/MiniDrawer'

const MultiStepForm = dynamic(() => import('../../components/multistep-form/form'), {
  ssr: false,
})
function index() {
  return (
    <MiniDrawer>
      <div>
        Home
      </div>
    </MiniDrawer>
  )
}

export default index

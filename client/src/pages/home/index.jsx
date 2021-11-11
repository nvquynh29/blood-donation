import React from 'react'

import dynamic from 'next/dynamic'

const MultiStepForm = dynamic(() => import('../../components/multistep-form'), {
  ssr: false,
})
function index() {
  return (
    <div>
      <MultiStepForm />
    </div>
  )
}

export default index

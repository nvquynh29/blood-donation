import React from 'react'
import RequestBloodForm from '../../../../../components/request-blood-form/RequestBloodForm'
import MiniDrawer from '../../../../../layouts/trial/MiniDrawer'

function AddRequestBlood() {
  return (
    <MiniDrawer>
      <div>
        <RequestBloodForm />
      </div>
    </MiniDrawer>
  )
}

export default AddRequestBlood

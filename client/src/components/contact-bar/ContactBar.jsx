import React from 'react'
import 'boxicons'

function ContactBar() {
  return (
    <div className="bg-red-600">
      <div className="container h-[2.5rem] flex justify-between w-full mx-auto">
        <p className="text-lg flex items-center align-middle m-0 text-white px-5">
          Hiến máu nhân đạo là một nghĩa cử cao đẹp
        </p>
        {/* <div className="social flex items-center ">
          <box-icon className="social" color=" white" name="facebook-circle" type="logo"></box-icon>
          <box-icon className="social" color=" white" name="instagram" type="logo"></box-icon>
          <box-icon className="social" color=" white" name="youtube" type="logo"></box-icon>
          <box-icon className="social" color=" white" name="tiktok" type="logo"></box-icon>
        </div> */}
      </div>
    </div>
  )
}

export default ContactBar

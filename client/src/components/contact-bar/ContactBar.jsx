import React from 'react'
// import "./style.scss";
function ContactBar() {
  return (
    <div className="bg-red-600">
      <div className="container flex">
        <p className="text-lg   text-white ">Welcome to blood donation center.</p>
        <div className="social h-9">
          <box-icon name="facebook-circle" type="logo"></box-icon>
          <box-icon name="instagram" type="logo"></box-icon>
          <box-icon name="youtube" type="logo"></box-icon>
          <box-icon name="tiktok" type="logo"></box-icon>
        </div>
      </div>
    </div>
  )
}

export default ContactBar

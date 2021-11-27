import React from "react";
import SideBar from "../../components/sidebar"
import RequestBloodForm from '../../components/request-blood-form/RequestBloodForm'


function index() {
  return (
    <div>
      <SideBar />
      <RequestBloodForm />
    </div>

  );
}

export default index;

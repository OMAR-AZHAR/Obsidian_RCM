import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { date } from "yup";
import { useNavigate } from "react-router-dom";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
let account = 554345;
let date_opened = 12 / 2 / 2020;
let comp_owner = "Umer Khan";
let comp_address = "Mubashir Plaza,Supply Abbotabad";
let comp_email = "umer.khan@billsmed.com";
let comp_phone = 1232312123;

console.log(date);
const AccountManagment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("accountadmin/customermanagement")
    .then(function (response) {
    })
    .catch(function (error) {
      if (error.response.data.data == 403) {
        Swal.fire({
          icon: 'error',
          imageHeight:30,
          imageWidth:30,
          title: 'Sorry...',
          text: 'Please contact your administrator to get Permissions!',
          confirmButtonColor: '#08619b',
        })
        navigate(-1)
      }
      
    });
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <div className="d-flex align-items-center ">
            <h3 className="mx-2">BillsMed</h3>
            <Link to="">Edit Account Information</Link>
          </div>
          <div className="d-flex flex-column">
            <span>Account #: {account}</span>
            <span>Date Opened #: {date_opened}</span>
            <span>Company Owner #: {comp_owner}</span>
            <span>Company Address #: {comp_address}</span>
            <span>Company Email #: {comp_email}</span>
            <span>Company Phone #: {comp_phone}</span>
          </div>
        </div>
      </div>
      <div className="card col-md-6 mt-4">
        <div className="card-header fw-bold">Billing Actions</div>
        <div className="card-body">
          <div className="d-flex flex-column">
            <Link to={""}>Request a Credit</Link>
            <Link to={""}>Request a Payment Information</Link>
            <Link to={""}>Request a Credit</Link>
            <Link to={""}>Close Main Account</Link>
            <Link to={""}>Request a Credit</Link>
            <Link to={""}>Request Executed Copy of CSA/BAA</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagment;

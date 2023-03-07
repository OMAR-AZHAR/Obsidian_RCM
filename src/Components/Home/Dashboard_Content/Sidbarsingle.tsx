import { useState, useCallback } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FaAngleLeft, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import React from "react";
import API from "../../../Api/ClientApi";
import Alert from "../../../GLOBAL/SwalAlert2";
export default function Sidbarsingle(props) {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const handleRoutes = (routeUrl, apiUrl) => {
    API.get(apiUrl)
      .then((result) => {
        navigate(routeUrl);
      })
      .catch((error) => {
        if (error.response.status == 403) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You do not have permission to access this",
            text: "Please contact your administrator for assistance.",
            showConfirmButton: true,
            confirmButtonColor: "#428efd",
          });
        }
      });
  };
  // const Activetoggle = () => {
  //   if (active === "") {
  //     setActive("bg-light bg-opacity-25");

  //   } else {
  //     setActive("");
  //   }
  // };

  const popover = (
    // codes sub menu routess
    <Popover id="referringpopover">
      <Popover.Body>
        <br />
        <Button variant="light btn-sm text-dark" onClick={() => navigate(-1)}>
          <i className="fas fa-user-injured mx-2 fw-bolder btn-hov"></i>
          Procedure
        </Button>
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-hospital-symbol mx-2 fw-bolder"></div>
          <Link to="/icdProcedure" className="text-decoration-none text-dark">
            ICD Procedure
          </Link>
        </Button>
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-procedures mx-2 fw-bolder"></div>
          <Link to="/revenue" className="text-decoration-none text-dark">
            Revenue
          </Link>
        </Button>
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-comment-dollar mx-2 fw-bolder"></div>
          <Link to="/remittance" className="text-decoration-none text-dark">
            Remittance
          </Link>
        </Button>
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-sliders mx-2 fw-bolder"></div>
          <Link to="/adjustment" className="text-decoration-none text-dark">
            Adjustment
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-crutch mx-2 fw-bolder"></div>
          <Link to="/inventoryCode" className="text-decoration-none text-dark">
            Inventory
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-list-ul mx-2 fw-bolder"></div>
          <Link to="/chargePanel" className="text-decoration-none text-dark">
            Charge Panel
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-dollar mx-2 fw-bolder"></div>
          <Link
            to="/feeScheduleCode"
            className="text-decoration-none text-dark"
          >
            Fee Schedule
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-file-signature mx-2 fw-bolder"></div>
          <Link to="/contactsCode" className="text-decoration-none text-dark">
            Contacts
          </Link>
        </Button>{" "}
        <br />
      </Popover.Body>
    </Popover>
  );
  // customization sub routes
  const popoverCustomzation = (
    // codes sub menu routes
    <Popover id="referringpopover">
      <Popover.Body>
        <Button variant="light btn-sm">
          <div className="fas fa-tools mx-2 fw-bolder"></div>
          <Link to="" className="text-decoration-none text-dark">
            Custom Claim Statuses
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-pencil-ruler mx-2 fw-bolder"></div>
          <Link to="" className="text-decoration-none text-dark">
            Custom Info Lines
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-user-edit mx-2 fw-bolder"></div>
          <Link to="" className="text-decoration-none text-dark">
            Custom Account Types
          </Link>
        </Button>{" "}
        <br />
      </Popover.Body>
    </Popover>
  );
  // security sub routes
  const popoverSecurity = (
    <Popover id="referringpopover">
      <Popover.Body>
        <Button variant="light btn-sm">
          <div className="fas fa-user-shield mx-2 fw-bolder"></div>
          <Link
            to="#"
            className="text-decoration-none text-dark"
            onClick={() =>
              handleRoutes(
                "permission-roles",
                "accountadmin/security/permission/getroles"
              )
            }
          >
            Permission Roles
          </Link>
        </Button>{" "}
        <br />
        <Button variant="light btn-sm">
          <div className="fas fa-shield mx-2 fw-bolder"></div>
          <Link
            to="two-factor-authentication"
            className="text-decoration-none text-dark"
            onClick={() => handleRoutes("two-factor-authentication", "")}
          >
            Two Factor Authentication
          </Link>
        </Button>{" "}
      </Popover.Body>
    </Popover>
  );

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        className="col-md-12 pe-auto mt-3 px-2"
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex">
          {/* <div className="m-2 d-flex"> */}
          <input
            style={{ display: `${props.searchdisplay}` }}
            className="form-control form-control-sm"
            id="inputsm"
            type="text"
            placeholder="Search"
          />{" "}
          &nbsp;&nbsp;&nbsp;
          <button
            style={{ border: "transparent" }}
            className="m-0 btn btn-outline-light opacity-75 btn-sm"
            onClick={props.toggleSidebar}
          >
            {/* <i className={`fas fa-angle-${props.angle} fa-xl`}></i> */}
            {props.angletoright ? (
              <FaBars size={"1.5em"} />
            ) : (
              <FaAngleLeft size={"1.4em"} />
            )}
          </button>
        </div>{" "}
        {/* </div> */}
      </div>

      <Link
        // style={({ isActive, isPending }) => {
        //   return {
        //     color: isActive ? "red" : "inherit",
        //   };
        // }}
        className={`nav-link collapsed mt-3 border-top border-light border-opacity-10 border-bottom`}
        to="#"
        // onClick={Activetoggle}
        data-bs-toggle="collapse"
        data-bs-target="#collapse_home_components"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-home"></i>
        </div>
        {props.angletoright ? null : "Home"}

        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div className="collapse" id="collapse_home_components">
        <nav className="sb-sidenav-menu-nested nav px-1">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="/welcome"
          >
            <i className="fas fa-door-open mx-1"></i>
            {props.angletoright ? null : "Welcome"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="/welcome-dashboard"
          >
            <i className="fas fa-tachometer-alt mx-1"></i>
            {props.angletoright ? null : "Dashboard"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/messages", "home/message")}
          >
            <i className="fas fa-message mx-1"></i>
            {props.angletoright ? null : "Messages"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/tasks", "home/task")}
          >
            <i className="fas fa-list-check mx-1"></i>
            {props.angletoright ? null : "Tasks"}
          </Link>
          {/* <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/company-announcment", "home/company/announcement")
            }
          >
            <i className="fas fa-bullhorn mx-1"></i>
            {props.angletoright ? null : "Company Announcments"}
          </Link> */}
        </nav>
      </div>
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        style={{ borderBottom: "1px solid white" }}
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePages"
        aria-expanded="false"
        aria-controls="collapsePages"
      >
        <div className="sb-nav-link-icon">
          <i className="fa-solid fa-chart-line"></i>
        </div>
        {props.angletoright ? null : "Reports"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapsePages"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/viewer", "reports/view")}
          >
            <i className="fas fa-binoculars mx-1"></i>
            {props.angletoright ? null : "Viewer"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/builder", "reports/builder")}
          >
            <i className="fas fa-screwdriver-wrench mx-1"></i>
            {props.angletoright ? null : "Builder"}
          </Link>
        </nav>
      </div>
      {/* appointment */}
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        style={{ borderBottom: "1px solid white" }}
        onClick={() => {}}
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseAppointment"
        aria-expanded="false"
        aria-controls="collapseAppointment"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-calendar-plus"></i>
        </div>
        {props.angletoright ? null : "Appointments"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapseAppointment"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
          >
            <i className="fas fa-calendar mx-1"></i>
            {props.angletoright ? null : "Schedular"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "/manage-waiting-list",
                "appointment/manage/waiting/list"
              )
            }
          >
            <i className="fas fa-list-check mx-1"></i>
            {props.angletoright ? null : "Manage Waiting List"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/appointment-control", "appointment/control")
            }
          >
            <i className="fas fa-clipboard-check mx-1"></i>
            {props.angletoright ? null : "Appointment Control"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "/superbill-batch-print",
                "appointment/super/batch/print"
              )
            }
          >
            <i className="far fa-file mx-1"></i>
            {props.angletoright ? null : "Superbill Batch Print"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/configuration", "appointment/configuration")
            }
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Configuration"}
          </Link>
        </nav>
      </div>
      {/*  patient*/}
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        style={{ borderBottom: "1px solid white" }}
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePatient"
        aria-expanded="false"
        aria-controls="collapsePatient"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-user-injured"></i>
        </div>
        {props.angletoright ? null : "Patient"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapsePatient"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/patient", "patient")}
          >
            <i className="fas fa-user-injured mx-1"></i>
            {props.angletoright ? null : "Patient"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/manage-account", "patient/manage/account")
            }
          >
            <i className="fas fa-user mx-1"></i>
            {props.angletoright ? null : "Manage Account"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/payment-plans", "patient/payment/plans")
            }
          >
            <i className="fas fa-money-check mx-1"></i>
            {props.angletoright ? null : "Payment Plans"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/ar-control", "patient/arcontrol")}
          >
            <i className="fas fa-clipboard-check mx-1"></i>
            {props.angletoright ? null : "A/R Control"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/batch-eligibility", "patient/batch/eligibility")
            }
          >
            <i className="fas fa-user-check mx-1"></i>
            {props.angletoright ? null : "Batch Eligibility"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "/statement-batch-print",
                "patient/statement/batch/print"
              )
            }
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Statement Batch Print"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/statement-tracker", "patient/statement/track")
            }
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Statement Tracker"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/label-batch-print", "patient/label/batch/print")
            }
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Label Batch Print"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/setting-patient", "patient/setting")}
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Setting"}
          </Link>
        </nav>
      </div>
      {/* claim */}
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseClaim"
        aria-expanded="false"
        aria-controls="collapseClaim"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-file-alt"></i>
        </div>
        {props.angletoright ? null : "Claim"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapseClaim"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/claim", "claim")}
          >
            <i className="fas fa-file-alt mx-1"></i>
            {props.angletoright ? null : "Claim"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/claim-tracker", "claim/track")}
          >
            <i className="fas fa-map-marked mx-1"></i>
            {props.angletoright ? null : "Claim Tracker"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/status-control", "claim/status/control")
            }
          >
            <i className="fas fa-clipboard-check mx-1"></i>
            {props.angletoright ? null : "Status Control"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/follow-up-managment", "claim/followup/manage")
            }
          >
            <i className="fas fa-arrow-alt-circle-up mx-1"></i>
            {props.angletoright ? null : "Follow Up Management"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/claim-batch-print", "claim/batch/print")
            }
          >
            <i className="fas fa-print mx-1"></i>
            {props.angletoright ? null : "Claim Batch Print"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/setting-claim", "claim/setting")}
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Setting"}
          </Link>
        </nav>
      </div>
      {/* payment */}
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePayment"
        aria-expanded="false"
        aria-controls="collapsePayment"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-money-check-alt"></i>
        </div>
        {props.angletoright ? null : "Payment"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapsePayment"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/post", "payment/post")}
          >
            <i className="fas fa-money-check mx-1"></i>
            {props.angletoright ? null : "Post"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/apply-credit", "payment/apply/credit")
            }
          >
            <i className="fas fa-credit-card mx-1"></i>
            {props.angletoright ? null : "Apply Credit"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/view", "payment/view")}
          >
            <i className="fas fa-pen-square mx-1"></i>
            {props.angletoright ? null : "View"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/Era", "payment/era")}
          >
            <i className="fas fa-bolt mx-1"></i>
            {props.angletoright ? null : "ERA"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/payment-tracker", "payment/track")}
          >
            <i className="fas fa-map-marked mx-1"></i>
            {props.angletoright ? null : "Payment Tracker"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/setting-payment", "payment/setting")}
          >
            <i className="fas fa-cogs mx-1"></i>
            {props.angletoright ? null : "Setting"}
          </Link>
        </nav>
      </div>
      {/* documents */}
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseDocuments"
        aria-expanded="false"
        aria-controls="collapseDocuments"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-folder"></i>
        </div>
        {props.angletoright ? null : "Documents"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapseDocuments"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      ></div>
      {/* AppealManagementDetail */}
      <Link
        className="nav-link border-light border-opacity-10 border-bottom"
        to="#"
        onClick={() =>
          handleRoutes("/appealManagement", "appealmanagement/patientclaim")
        }
        style={{ marginRight: "0px" }}
      >
        <i className="">
          <img
            src="AppealMgmt.jpg"
            style={{
              backgroundColor: "black",
              width: "16px",
              color: "red",
              marginRight: "8px",
              borderRadius: "2px",
            }}
            alt=""
          />
        </i>
        {props.angletoright ? null : "Appeal Management"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-right"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapseDocuments"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      ></div>
      {/*customer setup */}
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseCustomerSetup"
        aria-expanded="false"
        aria-controls="collapseCustomerSetup"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-users-cog"></i>
        </div>
        {props.angletoright ? null : "Customer Setup"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapseCustomerSetup"
        aria-labelledby="headingTwo"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/customersetup/practice", "customersetup/practice")
            }
          >
            <i className="fas fa-building mx-1"></i>
            {props.angletoright ? null : "Practices"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("customersetup/providers", "customersetup/provider")
            }
          >
            <i className="fas fa-user-md mx-1"></i>
            {props.angletoright ? null : "Providers"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("customersetup/facilities", "customersetup/provider")
            }
          >
            <i className="fas fa-hospital-alt mx-1"></i>
            {props.angletoright ? null : "Facilities"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "customersetup/referring-providers",
                "customersetup/referringprovider"
              )
            }
          >
            <i className="fas fa-hospital-user mx-1"></i>
            {props.angletoright ? null : "Referring Providers"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("customersetup/payers", "customersetup/payer")
            }
          >
            <i className="fas fa-hand-holding-usd mx-1"></i>
            {props.angletoright ? null : "Payers"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "customersetup/payer-agreement",
                "customersetup/payeragreement"
              )
            }
          >
            <i className="fas fa-handshake mx-1"></i>
            {props.angletoright ? null : "Payer Agreement"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "customersetup/collection-agencies",
                "customersetup/collectionagency"
              )
            }
          >
            <i className="fas fa-file-edit mx-1"></i>
            {props.angletoright ? null : "Collection Agencies"}
          </Link>
          <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
            <Link
              to="#"
              className="nav-link border-light border-opacity-10 border-bottom"
            >
              <i className="fas fa-briefcase-medical mx-1"></i>
              {props.angletoright ? null : "Codes"}
            </Link>
          </OverlayTrigger>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "customersetup/alert-control",
                "customersetup/alert/control"
              )
            }
          >
            <i className="fas fa-exclamation-triangle mx-1"></i>
            {props.angletoright ? null : "Alert Control"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "customersetup/statements",
                "customersetup/statement"
              )
            }
          >
            <i className="fas fa-file-invoice-dollar mx-1"></i>
            {props.angletoright ? null : "Statements"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "customersetup/superbills",
                "customersetup/superbill"
              )
            }
          >
            <i className="far fa-file mx-1"></i>
            {props.angletoright ? null : "Superbills"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("customersetup/labels", "customersetup/label")
            }
          >
            <i className="far fa-envelope-open mx-1"></i>
            {props.angletoright ? null : "Labels"}
          </Link>
          <OverlayTrigger
            trigger="focus"
            placement="right"
            overlay={popoverCustomzation}
          >
            <Link to="#" className="nav-link">
              <i className="fas fa-wrench mx-1"></i>
              {props.angletoright ? null : "Customization"}
            </Link>
          </OverlayTrigger>
        </nav>
      </div>
      <Link
        className="nav-link collapsed border-light border-opacity-10 border-bottom"
        to="#"
        data-bs-toggle="collapse"
        data-bs-target="#collapseLayoutsAdmin"
        aria-expanded="false"
        aria-controls="collapseLayouts"
      >
        <div className="sb-nav-link-icon">
          <i className="fas fa-user-cog"></i>
        </div>
        {props.angletoright ? null : "Account Admin"}
        <div className="sb-sidenav-collapse-arrow">
          <i className="fas fa-angle-down"></i>
        </div>
      </Link>
      <div
        className="collapse"
        id="collapseLayoutsAdmin"
        aria-labelledby="headingOne"
        data-bs-parent="#sidenavAccordion"
      >
        <nav className="sb-sidenav-menu-nested nav">
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="/account-managment"
            onClick={() =>
              handleRoutes(
                "/account-managment",
                "accountadmin/account/management"
              )
            }
          >
            <i className="fas fa-user-circle mx-1"></i>
            {props.angletoright ? null : "Account Management"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes(
                "/customer-managment",
                "accountadmin/customermanagement"
              )
            }
          >
            <i className="fas fa-users mx-1"></i>
            {props.angletoright ? null : "Customer Management"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("user-managment", "accountadmin/usermanagement")
            }
          >
            <i className="fas fa-user-cog mx-1"></i>
            {props.angletoright ? null : "User Management"}
          </Link>

          <OverlayTrigger
            trigger="focus"
            placement="right"
            overlay={popoverSecurity}
          >
            <Link to="#" className="nav-link">
              <i className="fas fa-cogs mx-1"></i>
              {props.angletoright ? null : "Security"}
            </Link>
          </OverlayTrigger>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/invoices", "accountadmin/invoice")}
          >
            <i className="fas fa-file-invoice mx-1"></i>
            {props.angletoright ? null : "Invoices"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/payment-profile", "accountadmin/payment/profile")
            }
          >
            <i className="fas fa-money-check mx-1"></i>
            {props.angletoright ? null : "Payment Profiles"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/services", "accountadmin/services")}
          >
            <i className="fas fa-shopping-cart mx-1"></i>
            {props.angletoright ? null : "Services"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() => handleRoutes("/locks", "accountadmin/locks")}
          >
            <i className="fas fa-user-lock mx-1"></i>
            {props.angletoright ? null : "Locks"}
          </Link>
          <Link
            className="nav-link border-light border-opacity-10 border-bottom"
            to="#"
            onClick={() =>
              handleRoutes("/sessions", "accountadmin/session/search")
            }
          >
            <i className="fas fa-clock mx-1"></i>
            {props.angletoright ? null : "Sessions"}
          </Link>
        </nav>
      </div>
    </div>
  );
}

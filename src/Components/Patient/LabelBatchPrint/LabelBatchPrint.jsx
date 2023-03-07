import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "../../../GLOBAL/SwalAlert";
import API from "../../../Api/ClientApi";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Other", value: "Other  " },
  { label: "Insurance ", value: "Insurance" },
  { label: "Corporate", value: "Corporate" },
  { label: "Self Pay ", value: "Self Pay" },
  { label: "Courtesy", value: "Courtesy" },
  { label: "Collection", value: "Collection" },
  { label: "Pre-Collection", value: "Pre-Collection" },
  { label: "Type  I", value: "Type  I" },
  { label: "Type  II", value: "Type  II" },
  { label: "Payment Plan", value: "Payment Plan" },
  { label: "Payment Plan Collection", value: "Payment Plan Collection" },
  { label: "Auto", value: "Auto" },
];

const option = [
  { label: "January", value: "January  " },
  { label: "February ", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "Self Pay" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const LabelBatchPrint = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [month, setMonth] = useState([]);

  useEffect(() => {
    API.get("patient/label/batch/print")
      .then(function (response) {})
      .catch(function (error) {
        if (error.response.data.data == 403) {
          Swal.fire({
            icon: "error",
            imageHeight: 30,
            imageWidth: 30,
            title: "Sorry...",
            text: "Please contact your administrator to get Permissions!",
            confirmButtonColor: "#08619b",
          });
          navigate(-1);
        }
      });
  }, []);

  return (
    <div className="row my-3 mx-2">
      <div className="col-md-12  col-sm-12 d-flex justify-content-center">
        <div
          className="col-md-6 px-2"
          style={{
            overflowY: "scroll",
            height: "calc(100vh - 127px)",
          }}
        >
          <div className="col-md-12 d-flex flex-column justify-content-center">
            <div className="col-md-12 col-sm-12  d-flex justify-content-between">
              <div className="d-flex">
                <p>Filters</p>
                <Link
                  data-bs-toggle="modal"
                  data-bs-target="#loadFilters"
                  className="mx-2 text-decoration-none"
                >
                  Load
                </Link>
                <Link className="text-decoration-none">Save</Link>
              </div>
              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="loadFilters"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        All Filters
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Understood
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  // onClick={() => alert("display Search")}
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                >
                  <span className="fas fa-search"></span> &nbsp;Search
                </button>
              </div>
            </div>

            <div className="col-md-12 col-sm-12  d-flex mt-2 gap-1 flex-column">
              <label htmlFor="">Patient Last Name</label>
              <div className="col-md-12 d-flex gap-3">
                <div className="col-md-4">
                  <select
                    id="defaultChargeStatus"
                    className="form-select "
                    aria-label="example"
                  >
                    <option selected>Batween</option>
                    <option value="Batween">Batween</option>
                  </select>
                </div>
                <div className="col-md-3 d-flex flex-">
                  <input
                    className={`form-control `}
                    type="text"
                    placeholder=""
                    aria-label=""
                    id=" "
                    name=" "
                    autoComplete="off"
                    autoCapitalize="on"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={1}
                    minLength={1}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <h6 className="mt-2">and</h6>
                </div>
                <div className="col-md-3 ">
                  <input
                    className={`form-control  `}
                    type="text"
                    placeholder=""
                    aria-label=""
                    id=" "
                    name=" "
                    autoComplete="off"
                    autoCapitalize="on"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={1}
                    minLength={1}
                  />
                </div>
              </div>
            </div>

            {/* ------------- Acc Type ------------------------ */}
            <div className="mt-3 col-md-12">
              <label htmlFor="">Account Type</label>
              <MultiSelect
                value={selected}
                onChange={setSelected}
                options={options}
              />
            </div>

            <div className="col-md-112 mt-3 d-flex flex-">
              <input
                className={`form-control `}
                type="text"
                placeholder="Patient State"
                aria-label=""
                id=" Patient State"
                name=" Patient State"
                autoComplete="off"
                autoCapitalize="on"
                autoCorrect="off"
                spellCheck="false"
                maxLength={1}
                minLength={1}
              />
            </div>

            <div className="col-md-5 mt-3">
              <label htmlFor="">Patient Age</label>
              <select
                id="defaultChargeStatus"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>

            <div className="mt-3 col-md-12">
              <label htmlFor="">Patient Birth Month</label>
              <MultiSelect value={month} onChange={setMonth} options={option} />
            </div>

            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="Do not include decreased patient"
              />
              <label
                className="form-check-label"
                htmlFor="Do not include decreased patient"
              >
                Do not include deceased patient
              </label>
            </div>
          </div>
          {/* ------------------    Time  -------------- */}
          <div className="col-md-12 d-flex mt-2 gap-1 flex-column">
            <div>
              <label htmlFor="">Last Seen Date</label>

              <div className="col-md-12 d-flex gap-3">
                <div className="d-flex flex-column col-md-3">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <select
                    // onChange={(e) => {
                    //   changeDate(e);
                    // }}
                    className="form-select form-select-sm "
                    aria-label=".form-select-sm example"
                  >
                    <option value="today">Today</option>
                    <option value="all">All</option>
                    <option value="other">Other</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="this-year">This Year</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last Year</option>
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-60-days">Last 60 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="last-12-Months">Last 12 Months</option>
                  </select>
                </div>
                <div className="d-flex flex-column col-md-4">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <input
                    // value={date}
                    // onChange={(e) => {
                    //   getdata(e);
                    // }}
                    type="date"
                    id="start_date"
                    name="start_date"
                    className="form-control form-control-sm  "
                  />
                </div>
                <div className="d-flex flex-column">
                  {/* <label htmlFor="">To</label> */}
                  <input
                    // value={enddate}
                    // onChange={(e) => {
                    //   getEnddata(e);
                    // }}
                    type="date"
                    id="end_date"
                    name="end_date"
                    className="form-control form-control-sm "
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="">Recall Date</label>

              <div className="col-md-12 d-flex gap-3">
                <div className="d-flex flex-column col-md-3">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <select
                    // onChange={(e) => {
                    //   changeDate(e);
                    // }}
                    className="form-select form-select-sm "
                    aria-label=".form-select-sm example"
                  >
                    <option value="today">Today</option>
                    <option value="all">All</option>
                    <option value="other">Other</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="this-year">This Year</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last Year</option>
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-60-days">Last 60 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="last-12-Months">Last 12 Months</option>
                  </select>
                </div>
                <div className="d-flex flex-column col-md-4">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <input
                    // value={date}
                    // onChange={(e) => {
                    //   getdata(e);
                    // }}
                    type="date"
                    id="Recall Date"
                    name="Recall Date"
                    className="form-control form-control-sm  "
                  />
                </div>
                <div className="d-flex flex-column">
                  {/* <label htmlFor="">To</label> */}
                  <input
                    // value={enddate}
                    // onChange={(e) => {
                    //   getEnddata(e);
                    // }}
                    type="date"
                    id="Recall Date"
                    name="end_date"
                    className="form-control form-control-sm "
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor=""> Follow Up Date</label>

              <div className="col-md-12 d-flex gap-3">
                <div className="d-flex flex-column col-md-3">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <select
                    // onChange={(e) => {
                    //   changeDate(e);
                    // }}
                    className="form-select form-select-sm "
                    aria-label=".form-select-sm example"
                  >
                    <option value="today">Today</option>
                    <option value="all">All</option>
                    <option value="other">Other</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="this-year">This Year</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last Year</option>
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-60-days">Last 60 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="last-12-Months">Last 12 Months</option>
                  </select>
                </div>
                <div className="d-flex flex-column col-md-4">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <input
                    // value={date}
                    // onChange={(e) => {
                    //   getdata(e);
                    // }}
                    type="date"
                    id="Follow Up Date"
                    name="Follow Up Date"
                    className="form-control form-control-sm  "
                  />
                </div>
                <div className="d-flex flex-column">
                  {/* <label htmlFor="">To</label> */}
                  <input
                    // value={enddate}
                    // onChange={(e) => {
                    //   getEnddata(e);
                    // }}
                    type="date"
                    id="Follow Up Date"
                    name="Follow Up Date"
                    className="form-control form-control-sm "
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor=""> Appointment Date</label>

              <div className="col-md-12 d-flex gap-3">
                <div className="d-flex flex-column col-md-3">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <select
                    // onChange={(e) => {
                    //   changeDate(e);
                    // }}
                    className="form-select form-select-sm "
                    aria-label=".form-select-sm example"
                  >
                    <option value="today">Today</option>
                    <option value="all">All</option>
                    <option value="other">Other</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="this-year">This Year</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-year">Last Year</option>
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-60-days">Last 60 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="last-12-Months">Last 12 Months</option>
                  </select>
                </div>
                <div className="d-flex flex-column col-md-4">
                  {/* <label htmlFor="">Date Submitted</label> */}
                  <input
                    // value={date}
                    // onChange={(e) => {
                    //   getdata(e);
                    // }}
                    type="date"
                    id="Appointment Date"
                    name="Appointment Date"
                    className="form-control form-control-sm  "
                  />
                </div>
                <div className="d-flex flex-column">
                  {/* <label htmlFor="">To</label> */}
                  <input
                    // value={enddate}
                    // onChange={(e) => {
                    //   getEnddata(e);
                    // }}
                    type="date"
                    id="Appointment Date"
                    name="Appointment Date"
                    className="form-control form-control-sm "
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 d-flex flex-column">
            <div className="col-md-5 mt-3">
              <label htmlFor="">Total Balance</label>
              <select
                id="Total Balance"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>

            <div className="col-md-5 mt-3">
              <label htmlFor="">Patient Balance</label>
              <select
                id="Patient Balance"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>

            <div className="col-md-5 mt-3">
              <label htmlFor="">Insurance Balance</label>
              <select
                id="Insurance Balance"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>

            <div className="col-md-5 mt-3">
              <label htmlFor="">Paper Statement Sent</label>
              <select
                id="Paper Statement Sent"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>

            <div className="col-md-5 mt-3">
              <label htmlFor="">Electronic Statement Sent</label>
              <select
                id="Total Balance"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>

            <div className="col-md-5 mt-3">
              <label htmlFor="">Total Statement Sent</label>
              <select
                id="Total Statement"
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected>Any</option>
                <option value="Equal">Equal</option>
                <option value="Does Not Equal">Does Not Equal</option>
                <option value="Greater Than">Greater Than</option>
                <option value="Greater Than Or Equal To">
                  Greater Than Or Equal To
                </option>
                <option value="Less Than">Less Than</option>
                <option value="Less Than Or Equal To">
                  Less Than Or Equal To
                </option>
                <option value="Batween">Batween</option>
              </select>
            </div>
          </div>

          <div className="col-md-12 mt-3">checkbox Array</div>
          <div className="col-md-12 mt-3">checkbox Array</div>
          <div className="col-md-12 mt-3">checkbox Array</div>
          <div className="col-md-12 mt-3">checkbox Array</div>
        </div>

        {/* -------------  Left Side ----------------- */}
        <div className="col-md-6 mx-3">
          <h3>Left Side</h3>
        </div>
      </div>
    </div>
  );
};

export default LabelBatchPrint;
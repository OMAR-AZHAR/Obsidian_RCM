import { lazy, useState ,useEffect} from 'react';
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const SelectCustomer = lazy(() => import('./SelectCustomer'));
const SelectUser = lazy(() => import('./SelectUser'));
const SessionModel = lazy(() => import('./SessionModel'));
import './Sessions.css';
import 'moment-timezone';

import moment from 'moment';
import { useDispatch } from 'react-redux';

import { GetLabel } from '../../../Redux/features/Sessions/FiltersSlice';

const Sessions = () => {
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
  const dispatch = useDispatch();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  const [date, setDate] = useState(today);
  const [enddate, setEndDate] = useState(today);
  const [dateOption, setDateOption] = useState('today');
  const [displaySect, setDisplaySect] = useState(true);

  //functions

  const toggle = () => {
    if (displaySect === true) {
      setDisplaySect(false);
    } else if (displaySect === false) {
      setDisplaySect(true);
    }
  };

  function getdata(e) {
    //set start date
    setDate(e.target.value);
  }

  function getEnddata(e) {
    //set end date
    if (today > e.target.value) {
      alert('End Date cannot be less than Start Date');
    } else {
      setEndDate(e.target.value);
    }
  }
  //change date function
  function changeDate(e) {
    dispatch(GetLabel(e.target.value));
    var dt = new Date();

    if (e.target.value == 'yesterday') {
      var getNewDate = new Date(dt.setDate(dt.getDate() - 1));
    }
    if (e.target.value == 'other') {
      var getNewDate = new Date(dt.setDate(dt.getDate()));
    }
    if (e.target.value == 'today') {
      var getNewDate = new Date(dt.setDate(dt.getDate()));
    }
    if (e.target.value == 'all') {
      var getNewDate = new Date('');
    } else if (e.target.value == 'last-12-Months') {
      var getNewDate = new Date(dt.setDate(dt.getDate() - 365));
    } else if (e.target.value == 'last-7-days') {
      var getNewDate = new Date(dt.setDate(dt.getDate() - 6));
    } else if (e.target.value == 'last-30-days') {
      var getNewDate = new Date(dt.setDate(dt.getDate() - 29));
    } else if (e.target.value == 'last-60-days') {
      var getNewDate = new Date(dt.setDate(dt.getDate() - 59));
    } else if (e.target.value == 'last-90-days') {
      var getNewDate = new Date(dt.setDate(dt.getDate() - 89));
    } else if (e.target.value == 'this-week') {
      var startOfWeek = moment().startOf('week').toDate();
      var getNewDate = new Date(startOfWeek.setDate(startOfWeek.getDate()));
    } else if (e.target.value == 'this-month') {
      var thisMonth = moment().startOf('month').toDate(); //start of this month
      var getNewDate = new Date(thisMonth.setDate(thisMonth.getDate()));
    } else if (e.target.value == 'this-year') {
      var thisYear = moment().startOf('year').toDate(); //start of current year
      var getNewDate = new Date(thisYear.setDate(thisYear.getDate()));
    } else if (e.target.value == 'last-week') {
      var startOfWeek = moment().startOf('week').toDate(); //start of current week
      var getNewDate = new Date(startOfWeek.setDate(startOfWeek.getDate() - 7)); //last week start
      var lastWeekDate = new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
    } else if (e.target.value == 'last-month') {
      var startOfmonth = moment().startOf('month').toDate(); //last month start
      var getNewDate = new Date(startOfmonth.setDate(startOfmonth.getDate() - 30));
      var lastmonthDate = new Date(startOfmonth.setDate(startOfmonth.getDate() + 29));
    } else if (e.target.value == 'last-year') {
      var startOfYear = moment().startOf('year').toDate(); //last year start
      var getNewDate = new Date(startOfYear.setDate(startOfYear.getDate() - 365));
      var lastYearDate = new Date(startOfYear.setDate(startOfYear.getDate() + 364));
    }
    var d = String(getNewDate.getDate()).padStart(2, '0');
    var m = String(getNewDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var y = getNewDate.getFullYear();

    getNewDate = y + '-' + m + '-' + d;
    if (e.target.value == 'yesterday') {
      setEndDate(getNewDate);
    } else if (e.target.value == 'last-week') {
      var d1 = String(lastWeekDate.getDate()).padStart(2, '0');
      var m1 = String(lastWeekDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var y1 = lastWeekDate.getFullYear();
      lastWeekDate = y1 + '-' + m1 + '-' + d1;
      setEndDate(lastWeekDate);
    } else if (e.target.value == 'last-month') {
      var d2 = String(lastmonthDate.getDate()).padStart(2, '0');
      var m2 = String(lastmonthDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var y2 = lastmonthDate.getFullYear();
      lastmonthDate = y2 + '-' + m2 + '-' + d2;
      setEndDate(lastmonthDate);
    } else if (e.target.value == 'last-year') {
      var d3 = String(lastYearDate.getDate()).padStart(2, '0');
      var m3 = String(lastYearDate.getMonth() + 1).padStart(2, '0'); //January is 0!
      var y3 = lastYearDate.getFullYear();
      lastYearDate = y3 + '-' + m3 + '-' + d3;
      setEndDate(lastYearDate);
    } else if (e.target.value === 'all') {
      setEndDate(new Date(''));
    } else {
      setEndDate(today);
    }

    setDate(getNewDate);
  }
  function checkAll(o) {
    var boxes = document.getElementsByTagName('input');
    for (var x = 0; x < boxes.length; x++) {
      var obj = boxes[x];
      if (obj.type == 'checkbox') {
        if (obj.name != 'check') obj.checked = o.checked;
      }
    }
  }
  return (
    <div className="mt-4">
      {!displaySect && (
        <div className="row">
          <SessionModel closeSessionModel={toggle} />
        </div>
      )}
      {displaySect && (
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex align-items-center justify-content-between">
              <p className="mt-2 fw-bold">Filters</p>
              <button onClick={toggle} className="btn btn-outline-primary btn-sm">
                <span className="fas fa-search"></span> Search
              </button>
            </div>
            <label>Login Date</label>

            <div className="col-md-12 d-flex mt-2">
              <select
                onChange={(e) => {
                  changeDate(e);
                }}
                className="form-select form-select-sm w-75"
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
              <input
                value={date}
                onChange={(e) => {
                  getdata(e);
                }}
                type="date"
                id="start_date"
                name="start_date"
                className="form-control form-control-sm mx-2 "
              />
              <input
                value={enddate}
                onChange={(e) => {
                  getEnddata(e);
                }}
                type="date"
                id="end_date"
                name="end_date"
                className="form-control form-control-sm "
              />
            </div>

            <div className="d-flex flex-column my-3">
              <div className="col-md-9">
                <SelectUser></SelectUser>
                <div className="mt-3 d-flex ">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="ipaddress"
                    name="ipaddress"
                    placeholder="User IP Address"
                  />
                </div>
              </div>
              <div className="col-md-9 mt-3">
                <SelectCustomer></SelectCustomer>
                <div className="d-flex align-items-center">
                  <input className="form-check-input mt-3" type="checkbox" value="" id="activesesssions" />
                  <label htmlFor="activesesssions" className="mt-3 mx-2">
                    Only include active Sessions
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ borderLeft: '2px solid #d9dbdb' }}>
            <p>Please select a filter criteria to run search to view results</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;

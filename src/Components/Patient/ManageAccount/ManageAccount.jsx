import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from '../../../GLOBAL/SwalAlert';
import API from '../../../Api/ClientApi';

var dob = new Date();
var dd = String(dob.getDate()).padStart(2, '0');
var mm = String(dob.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = dob.getFullYear();
dob = mm + '/' + dd + '/' + yyyy;
const manageAccount = [
  {
    account: 12233,
    name: 'Ortiz, Breda',
    date: dob,
    insured: 'Ortiz, Brenda',
    bal_due: 0.5,
    acccount_type: 'insurance',
  },
];

const ManageAccount = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("patient/manage/account")
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
  }, [])
  return (
    <div className="col-md-12 mt-4">
      <div className="col-md-6">
        <div className="input-group">
          <input
            autoFocus
            className="form-control form-control-sm placeTextTax"
            type="text"
            placeholder="Search by name, DOB, account #, phone #"
            aria-label="npi"
            id="manageAccsearchpatient"
            name="manageAccsearchpatient"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            // onChange={handleChange}
            // value={values.providernpi.replace(/[^0-9]/gi, "")}
            // onBlur={handleBlur}
          />
          <button type="button" className="input-group-text btn-hov" id="searchpatient">
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
          {/* {touched.providernpi && errors.providernpi ? (
                    <p className="form-error mx-2">*{errors.providernpi}</p>
                  ) : null} */}
        </div>
        <div className="col-md-9 d-flex mt-2">
          <label htmlFor="">Search by:</label>
          <div className="form-check mx-2">
            <input className="form-check-input" type="radio" name="searchby" id="manageAccpatient" />
            <label className="form-check-label" htmlFor="manageAccpatient">
              Patient
            </label>
          </div>
          <div className="form-check mx-2">
            <input className="form-check-input" type="radio" name="searchby" id="manageAccinsured" />
            <label className="form-check-label" htmlFor="manageAccinsured">
              Insured
            </label>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="manageAccsearch_inactive" />
            <label className="form-check-label" htmlFor="manageAccsearch_inactive">
              Search Inactive Patients
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input mx-2" type="checkbox" value="" id="manageAccshow_exact" />
            <label className="form-check-label" htmlFor="manageAccshow_exact">
              Show exact matches only
            </label>
          </div>
        </div>
      </div>
      <div className="col-md-11 mt-3">
        <div className="card mb-2">
          <div className="card-header text-dark">Recently Opened</div>
          <div className="card-body">
            <table className="table table-light table-hover table-striped table table-bordered">
              <thead>
                <tr>
                  <th>Account #</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Insured</th>
                  <th>Balance due Patient</th>
                  <th>Account Type</th>
                </tr>
              </thead>
              <tbody>
                {manageAccount.map((mgAcc, i) => (
                  <tr key={i}>
                    <td>{mgAcc.account}</td>
                    <td>{mgAcc.name}</td>
                    <td>{mgAcc.date}</td>
                    <td>{mgAcc.insured}</td>
                    <td>{mgAcc.bal_due}</td>
                    <td>{mgAcc.acccount_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;

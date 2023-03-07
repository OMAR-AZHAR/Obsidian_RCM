import { lazy } from "react";
const NewOfficeModal = lazy(() => import("./NewOfficeModal"));
import { useSelector } from "react-redux";
export default function NewPracticeOffices() {
  // newOffice values from redux
  const officeName = useSelector((state) => state.NewOffice.officeName);
  const officeNpi = useSelector((state) => state.NewOffice.officeNpi);
  const officeAddress = useSelector((state) => state.NewOffice.officeAddress);
  const officeCity = useSelector((state) => state.NewOffice.officeCity);
  const officeState = useSelector((state) => state.NewOffice.officeState);
  const officeZipCode = useSelector((state) => state.NewOffice.officeZipCode);
  const officeDetilas = useSelector((state) => state.NewOffice.arrayofOffice);
  // console.log("show these in dynamic way",officeDetilas);
  var keys = [5, 2, 3, 6, 10];
  var values = officeDetilas;
  var ans = values.reduce((acc, value, i) => {
    acc[keys[i]] = value;
    return acc;
  }, {});
  //     Printing
  for (const key in ans) {
    console.log(`${key}  => ${ans[key]} `);
  }
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button
          disabled
          className="accordion-button collapsed text-muted"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Other Offices
        </button>
      </h2>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body px-0">
          <div className="container ">
            <div className="row">
              <div className="col-7">
                <NewOfficeModal />
              </div>

              <div className="col-5 px-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="inactiveOffice"
                  />
                  <label className="form-check-label" htmlFor="inactiveOffice">
                    Show inactive offices
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-2 px-2">
              <div
                onClick={() => alert("Open MOdal")}
                className="mt-2 rounded-2 btn-hov pt-3"
                style={{ border: "1px solid #ccefff", cursor: "pointer" }}
              >
                <div className="col-md-12 d-flex justify-content-between">
                  <h6 className="fw-bold">{officeName}</h6>
                  <p className="fw-bold">NPI:&nbsp;{officeNpi}</p>
                </div>

                <div className="col-md-12 d-flex">
                  <span>{officeAddress}&nbsp;</span>
                  <span>{officeCity},&nbsp; </span>
                  <span>{officeState}&nbsp;</span>
                  <span>{officeZipCode}&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

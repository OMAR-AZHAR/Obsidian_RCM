import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { Button, Modal as Mod } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormVal } from "./FormValcustomerpractices";
import PracticeTable from "./PracticeTable";
import ShowAllPracticeModel from "./ShowAllPracticeModal";
const Practices = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const ToEditable = useCallback(
    // Goto User Editable form
    (id: any) => {
      navigate(`/newpractice/${id}`, { replace: true });
    },
    [navigate]
  );
  const initialValues = {
    practiceprintnum: "1",
    selectpractice: "",
  };
  const [ShowInactive, setShowInactive] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormVal,
      validateOnChange: true,
      validateOnBlur: true,
      // By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        // to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectLabel, setPractice] = useState("Select");
  const handleselect = () => {
    if (selectLabel === "Practice") {
      console.log("changed");
      setPractice(" ");
    } else {
      setPractice("Practice");
    }
  };
  const newpractice = useCallback(
    () => navigate("/newpractice", { replace: true }),
    [navigate]
  );
  //useeffect
  // useEffect(() => {
  //   API.get("/customer/setup/practice")
  //     .then(function (response) {
  //       if ((response.data==403)) {
  //        alert("no access");
  //       }
  //     })
  //     .catch(function (error) {
  //       alert("no access");
  //     });
  // });
  return (
    <div className="mt-4 mb-2 px-0">
      <div className="row">
        <div className="col-md-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              newpractice();
              window.location.reload();
            }}
          >
            <i className="fas fa-plus" />
            &nbsp;New Practice
          </button>
          <br />
          <button
            disabled
            className="btn btn-outline-primary mt-2 mb-2 btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#showAllPracticesModel"
          >
            <i className="fas fa-list-ul" />
            &nbsp;Show All
          </button>

          <ShowAllPracticeModel />
          <br />
          <button
            disabled
            onClick={handleShow}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fas fa-print" />
            &nbsp;Print Labels
          </button>
          <Mod
            centered
            backdrop="static"
            keyboard={false}
            show={show}
            onHide={handleClose}
          >
            <Mod.Header closeButton>
              <span className="fs-16">Practice Label Search</span>
            </Mod.Header>
            <Mod.Body>
              <div className="container px-0">
                <div className="row">
                  <div className="col-md-12">
                    <label>{selectLabel}</label>
                    <select
                      // onClickCapture={handleselect}
                      defaultValue={"Practice"}
                      className="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                    >
                      <option value={" "} hidden>
                        Practice
                      </option>
                      <option value={""}>Select All</option>
                      <option value="2">
                        BLUEGRASS FAMILY MEDICINE {`&`} PEDIATRICS. (#10028750)
                      </option>
                    </select>
                  </div>
                  <div className=" d-flex align-items-center col-md-12 mt-2">
                    <label className="px-1">Print</label>{" "}
                    <div className="col-2">
                      <input
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        type="number"
                        className="form-control"
                        // min="1"
                        id="practiceprintnum"
                        name="practiceprintnum"
                        value={values.practiceprintnum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                      />
                    </div>
                    <label className="px-1">label per practice.</label>
                  </div>
                  <div className="col-md-12 d-flex">
                    {touched.practiceprintnum && errors.practiceprintnum ? (
                      <p className="form-error">{errors.practiceprintnum}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Mod.Body>
            <Mod.Footer>
              <Button variant="outline-primary btn-sm">Print</Button>
              <Button variant="outline-danger btn-sm" onClick={handleClose}>
                Cancel
              </Button>
            </Mod.Footer>
          </Mod>
        </div>
        <div className="col-md-10">
          <div className="col-md-6">
            <div className="input-group">
              <button
                type="button"
                className="input-group-text btn-hov"
                id="PratcieSearchicon"
              >
                <i className="fas fa-search" aria-hidden="true" />
              </button>
              <input
                className="form-control form-control-sm"
                type="search"
                maxLength={60}
                placeholder="Search for pratices by name, address, phone, or id."
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="form-check mt-2 mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="inactive-practices"
              checked={ShowInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="inactive-practices">
              Show inactive practices
            </label>
          </div>

          <div className="col-xl-10">
            <div className="card mb-4">
              <div className={`card-header text-light`}>
                <i className="fas fa-box-open me-1" />
                Practices
              </div>
              <div className="card-body">
                <PracticeTable
                  search={search}
                  ToEditable={ToEditable}
                  ShowInactive={ShowInactive}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Practices;

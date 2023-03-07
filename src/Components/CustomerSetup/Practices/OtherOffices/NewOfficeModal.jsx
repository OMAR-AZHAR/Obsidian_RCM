import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import {
  getOfficeAddress,
  getOfficeCity,
  getOfficeName,
  getOfficeNpi,
  getOfficeSequence,
  getOfficeState,
  getOfficeZipCode,
  getUser,
} from "../../../../Redux/features/Practice/NewPracticeOfficeSlice";
export default function NewOfficeModal() {
  const dispatch = useDispatch();
  // const [savebuttondisable, setSavebuttondisable] = useState(false);
  const [officeName, setOfficeName] = useState("");
  const [officeNpi, setOfficeNpi] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [officeCity, setOfficeCity] = useState("");
  const [officeState, setOfficeState] = useState("");
  const [officeZipCode, setOfficeZipCode] = useState("");
  const [error, seterrorName] = useState("");
  useEffect(() => {
    seterrorName("");
  }, [officeName]);
  const GetDetails = (e, name, npi, address, city, state, zipcode) => {
    e.preventDefault();
    if (officeName == "") {
      seterrorName("required");
    }
    if (officeAddress == "") {
    }
    if (officeCity == "") {
    }
    if (officeState == "") {
    }
    if (officeZipCode == "") {
    } else {
      // var stringArray = new Array();
      // stringArray[0] = officeName;
      // stringArray[1] = officeNpi;
      // stringArray[2] = officeAddress;
      // stringArray[3] = officeCity;
      // stringArray[3] = officeState;
      // stringArray[3] = officeZipCode;
      // console.log("array from model", stringArray);
      dispatch(getOfficeName(officeName));
      dispatch(getOfficeNpi(officeNpi));
      dispatch(getOfficeAddress(officeAddress));
      dispatch(getOfficeCity(officeCity));
      dispatch(getOfficeState(officeState));
      dispatch(getOfficeZipCode(officeZipCode));
      dispatch(getUser(stringArray));
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fas fa-plus" />
        &nbsp;New Office
      </button>
      <form onSubmit={GetDetails}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          data-bs-keyboard="false"
          data-bs-backdrop="static"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New Office
                </h1>
              </div>
              <div className="modal-body">
                <div className="col-md-12">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control form-control-sm "
                      id="practicsOfficeName"
                      placeholder="Name"
                      value={officeName}
                      name="practicsOfficeName"
                      onChange={(e) =>
                        setOfficeName(e.target.value.toUpperCase())
                      }
                      maxLength="60"
                    />
                    <div className="text-danger">{error}</div>
                  </div>

                  <div className="row mb-2 px-0 mb-4">
                    <div className="col-md-6 ">
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="practicsOfficeSequence"
                        placeholder="Sequence #"
                        name="practicsOfficeSequence"
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        // id="practicsOfficeAddress"
                        // name="practicsOfficeAddress"
                        value={officeNpi}
                        onChange={(e) =>
                          setOfficeNpi(e.target.value.toUpperCase())
                        }
                        placeholder="NPI"
                        maxLength="10"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control form-control-sm "
                      id="practicsOfficeAddress"
                      name="practicsOfficeAddress"
                      value={officeAddress}
                      onChange={(e) =>
                        setOfficeAddress(e.target.value.toUpperCase())
                      }
                      placeholder="Address"
                      maxLength="40"
                    />
                    <div className="text-danger">{error}</div>
                  </div>

                  <div className="row px-0 mt-2">
                    <div className="col-md-4  mt-2">
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="practiceOfficeCity"
                        placeholder="City"
                        name="practiceOfficeCity"
                        value={officeCity}
                        onChange={(e) =>
                          setOfficeCity(e.target.value.toUpperCase())
                        }
                        maxLength="25"
                      />
                      <div className="text-danger">{error}</div>
                    </div>
                    <div className="col-md-4 mt-2">
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="practiceOfficeState"
                        placeholder="State"
                        name="practiceOfficeState"
                        value={officeState}
                        onChange={(e) =>
                          setOfficeState(e.target.value.toUpperCase())
                        }
                        maxLength="2"
                      />
                      <div className="text-danger">{error}</div>
                    </div>
                    <div className="col-md-4 mt-2">
                      <PatternFormat
                        format="#####-####"
                        mask=" "
                        type="text"
                        className="form-control form-control-sm "
                        id="practiceOfficeZip"
                        placeholder="Zip Code"
                        name="practiceOfficeZip"
                        value={officeZipCode}
                        onChange={(e) => setOfficeZipCode(e.target.value)}
                      />
                      <div className="text-danger">{error}</div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

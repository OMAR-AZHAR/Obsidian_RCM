import React, { useEffect, useState } from "react";
import Swal from "../../GLOBAL/SwalAlert";
import API from "../../Api/ClientApi";
import useFetch from "../../Hooks/useFetch";
import { useNavigate, useParams } from "react-router";

function AppealManagementDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadFile, setUploadFile] = useState("");
  const [patientData, setPatientData] = useState([]);
  // const { data: patientData } = useFetch(`appealmanagement/claimsdataview/323`);

  useEffect(() => {
    const fetchPatientClaimsId = async () => {
      const response = await API.get(`appealmanagement/claimsdataview/${id}`);
      const newData = await response;

      const result = newData.data ? newData?.data.data : newData;
      setPatientData(result);
    };
    fetchPatientClaimsId();
  }, []);
  console.log();

  return (
    // <h2>Done</h2>
    <div className="row">
      <div className="col-md-12 mt-3 d-flex ">
        <div className="col-md-6 ">
          <div>
            <button type="button" className="btn btn-outline-primary btn-sm">
              <input
                type="file"
                onChange={(e) => setUploadFile(e.target.value)}
                size="60"
                style={{
                  opacity: "0",
                  Zindex: "-1",
                  position: "absolute",
                  width: "70px",
                }}
              />
              Browse &nbsp;
              <span className="fas fa-check" for="inputGroupFile"></span>
            </button>

            <button
              type="button"
              className="btn btn-outline-primary btn-sm mx-2"
              data-bs-toggle="modal"
              data-bs-target="#NPIRegistryModaltriggerinRefProvider"
            >
              <span className="fas fa-user-check"></span> Save
            </button>

            <button
              // onClick={() => {
              //   setEmpty();
              //   navigate("/patient");
              // }}
              type="button"
              className="btn btn-outline-danger btn-sm mx-2"
              onClick={() => navigate("/appealManagement")}
            >
              <span className="fas fa-times"></span> Cancel
            </button>
          </div>
          <div className="col-md-12">
            {uploadFile && (
              <>
                <span className="fas fa-file" for="inputGroupFile"></span>
                <span>&nbsp;File</span> : {uploadFile}
              </>
            )}
          </div>
        </div>
        <div className="col-md-6 d-flex ali">
          {patientData?.length < 1 || undefined ? (
            <div className="fs-4">
              <p>No Data Found!!</p>
            </div>
          ) : (
            <div className="card mb-2 col-md-10">
              <div
                className="card-header d-flex align-items-center"
                style={{ borderRadius: "0px", height: "30px" }}
              >
                Appeal Data
              </div>
              <div className="card-body">
                <div
                  className="table-responsive"
                  style={{
                    marginTop: "-10px",
                    overflowY: "scroll",
                    height: "calc(80vh - 77px)",
                  }}
                >
                  <table className="table     " style={{ marginLeft: "-7px" }}>
                    <thead className="col-md-12" style={{ height: "25px" }}>
                      <tr className="col-md-4">
                        <th className="col-md-5 practice-font">Name</th>
                        <th className="practice-font">Value</th>
                      </tr>
                    </thead>{" "}
                    <tbody>
                      {patientData?.map((claim) =>
                        Object.entries(claim).map((claim) => (
                          <tr
                            className="practice-font"
                            style={{ height: "15px" }}
                          >
                            <th style={{ height: "20px" }}>
                              {claim[0] ? claim[0] : claim}
                            </th>
                            <td
                              style={{
                                height: "15px",
                              }}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title={claim[1] ? claim[1] : claim}
                              onClick={() => {
                                navigator.clipboard.writeText(claim[1]);
                              }}
                            >
                              {claim[1] ? claim[1] : claim}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppealManagementDetail;

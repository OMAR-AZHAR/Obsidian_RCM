import React, { useEffect, useState } from "react";
import Swal from "../../GLOBAL/SwalAlert";
import API from "../../Api/ClientApi";

function AppealManagementDetail() {
  const [tableData, settableData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await API.get("customersetup/practice");
  //     const newData = response.data.data;
  //     settableData(newData);

  //     fetchData();
  //   };
  // }, []);
  console.log("tableData", tableData);
  return (
    <div className="row">
      <div className="col-md-12 mt-3 d-flex ">
        <div className="col-md-6 ">
          <button type="submit" className="btn btn-outline-primary btn-sm">
            {" "}
            <span className="fas fa-check"></span> Save
          </button>
          <button
            // onClick={() => {
            //   setEmpty();
            //   navigate("/patient");
            // }}
            type="button"
            className="btn btn-outline-danger btn-sm mx-2"
          >
            {" "}
            <span className="fas fa-times"></span> Cancel
          </button>

          <button
            type="button"
            className="btn btn-outline-primary btn-sm mx-2"
            data-bs-toggle="modal"
            data-bs-target="#NPIRegistryModaltriggerinRefProvider"
          >
            <span className="fas fa-user-check"></span> Check Eligibility
          </button>
        </div>
        <div className="col-md-6">
          <div className="card mb-2">
            <div className="card-header">Print Data</div>
            <div className="card-body ">
              {" "}
              <div className="table-responsive">
                <table className="table table-light table-hover table-striped table table-bordered ">
                  <thead>
                    <tr>
                      <th>Practice Name</th>
                      <th>Address</th>
                      <th>Seq #</th>
                      <th>NPI</th>
                      <th>Inactive</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="table-active practice-font">
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds </td>
                    </tr>{" "}
                    <tr className="table-active practice-font">
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds </td>
                    </tr>{" "}
                    <tr className="table-active practice-font">
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds</td>
                      <td>dsds </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppealManagementDetail;

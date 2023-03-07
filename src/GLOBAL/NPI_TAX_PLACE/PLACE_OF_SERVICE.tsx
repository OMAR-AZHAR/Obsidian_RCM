import { useDispatch } from "react-redux";
import useFetch from "../../Hooks/useFetch";
import { SetPOS } from "../../Redux/features/Global_Forms/POS_TOB_TOS_slice";
import { useState } from "react";

export default function PLACE_OF_SERVICE_MODAL({ POS_Facility }) {
  const dispatch = useDispatch();
  // POS Data Fetching API
  const { data: POSdata, loading } = useFetch(
    "customersetup/practice/placeofservice"
  );
  const [search, setSearch] = useState("");

  return (
    <div
      className="modal fade text-dark"
      id="showPOSModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="showPOSModel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">All POS Codes</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="col-md-12">
              <div className="mt-0">
                {/* ======= POS ======= */}
                <label htmlFor="tof">Place of Service</label>
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search for POS codes"
                  aria-label="Search"
                  maxLength={60}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />

                {loading ? (
                  "Loading..."
                ) : (
                  <div className="table-responsive" style={{ height: "300px" }}>
                    <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {POSdata?.filter((items) => {
                          return search === ""
                            ? items
                            : items?.description
                                ?.toLowerCase()
                                ?.includes(search?.toLowerCase());
                          // ||
                          // items?.id?.includes(search);
                        })?.map((pos, i) => {
                          return (
                            <tr
                              className="practice-font"
                              key={i}
                              data-bs-dismiss="modal"
                              onClick={() => {
                                dispatch(SetPOS(pos?.id))!;
                                POS_Facility(pos?.id)!;
                              }}
                            >
                              <td>{pos?.id}</td>
                              <td>{pos?.description}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer justify-content-end">
            {/* <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-bs-dismiss="modal"
            >
              Apply
            </button> */}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

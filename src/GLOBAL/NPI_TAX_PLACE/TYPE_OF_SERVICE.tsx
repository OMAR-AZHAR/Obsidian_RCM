import { useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import useFetch from "../../Hooks/useFetch";
import { SetTOS } from "../../Redux/features/Global_Forms/POS_TOB_TOS_slice";
import { getTOS_Val } from "../../Redux/features/Practice/DefaultClaimsSlice";

export default function TYPE_OF_SERVICE_MODAL() {
  const dispatch = useDispatch();
  const { data: TOSdata, loading } = useFetch(
    "customersetup/practice/typeofservice"
  );

  const [search, setSearch] = useState("");

  return (
    <div
      className="modal fade text-dark"
      id="showTOSModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="showTOSModel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">All TOS Codes</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body"
            style={{
              overflowY: "scroll",
              height: "calc(100vh - 127px",
            }}
          >
            <div className="col-md-12">
              <div className="mt-0">
                {/* ======= TOS ======= */}
                <label htmlFor="tof">Type of Service</label>
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search for TOS codes"
                  aria-label="Search"
                  maxLength={60}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />

                {loading ? (
                  "Loading..."
                ) : (
                  <Table
                    striped
                    bordered
                    hover
                    className="mt-2"
                    responsive="md"
                  >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOSdata?.filter((items) => {
                        return search === ""
                          ? items
                          : items.tos_description
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                              items?.tos_code.includes(search);
                        // if (search === "") {
                        //   return items;
                        // } else if (
                        //   items?.tos_description
                        //     ?.toLowerCase()
                        //     .includes(search?.toLowerCase())
                        // ) {
                        //   return items;
                        // } else if (items?.tos_code.includes(search)) {
                        //   return items;
                        // }
                      })?.map((tos, i) => {
                        return (
                          <tr
                            className="practice-font"
                            key={i}
                            onClick={() => {
                              dispatch(SetTOS(tos.tos_code));
                              dispatch(getTOS_Val(tos.id));
                            }}
                          >
                            <td>{tos.tos_code}</td>
                            <td>{tos.tos_description}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-bs-dismiss="modal"
            >
              Apply
            </button>
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

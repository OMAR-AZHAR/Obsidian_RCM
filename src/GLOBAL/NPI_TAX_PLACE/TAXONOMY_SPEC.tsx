import { useState } from "react";
import Button from "react-bootstrap/Button";
import useFetch from "../../Hooks/useFetch";
import Spin from "../../Spinners/Spin";
import { useDispatch } from "react-redux";
import {
  SetTaxonomyCode,
  SetTaxonomyDescription,
  SetTaxonomyId,
} from "../../Redux/features/Global_Forms/taxonomySlice";

export default function TAXONOMY_SPEC_MODAL({
  taxo_facility,
  taxo_fac_desc,
  taxo_fac_id,
}) {
  const { data: TaxData, loading: loadingtax } = useFetch(
    "customersetup/practice/taxonomyapi"
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  return (
    <div
      className="modal fade text-dark"
      id="taxonomyspecmodal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      aria-labelledby="taxonomyspecmodal"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="col-md-12">
              <label className="fw-bold">Search Taxonomy</label>
              <input
                className="form-control form-control-sm"
                placeholder="filter Codes"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-body">
            {/* ********* First Modal Input Fields ********* */}
            {loadingtax ? (
              <Spin />
            ) : (
              <div
                className="table-responsive"
                style={{ height: "300px", overflowX: "hidden" }}
              >
                <table className="table table-hover table-striped table table-bordered">
                  <thead>
                    <tr>
                      <th>Speciality Name</th>
                      <th>Code</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TaxData?.filter((items) => {
                      return search === ""
                        ? items
                        : items?.specialty_name
                            ?.toLowerCase()
                            ?.includes(search?.toLowerCase()) ||
                            items?.taxo_code
                              ?.toLowerCase()
                              ?.includes(search?.toLowerCase()) ||
                            items?.Description?.toLowerCase()?.includes(
                              search?.toLowerCase()
                            );
                      // ||
                      // items?.id?.includes(search);
                    })?.map((taxo, i) => {
                      return (
                        <tr
                          data-bs-dismiss="modal"
                          className="practice-font rowhover"
                          key={i}
                          {...taxo}
                          onClick={() => {
                            dispatch(SetTaxonomyId(taxo?.id));
                            dispatch(SetTaxonomyCode(taxo?.taxo_code));
                            dispatch(SetTaxonomyDescription(taxo?.Description));
                            taxo_facility(taxo?.taxo_code);
                            taxo_fac_desc(taxo?.Description);
                            taxo_fac_id(taxo?.id);
                          }}
                        >
                          <td>{taxo?.specialty_name}</td>
                          <td>{taxo?.taxo_code}</td>
                          <td>{taxo?.Description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* ********* End First Modal Input Fields ********* */}
          </div>
          <div className="modal-footer">
            {/* <Button
              variant="outline-primary btn-sm"
              onClick={props.closeTaxonomy_Spec_Modal}
            >
              Select
            </Button> */}
            <Button variant="outline-danger btn-sm" data-bs-dismiss="modal">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

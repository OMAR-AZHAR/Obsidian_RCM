import { useDispatch } from "react-redux";
import {
  setTernInsuranceProviderData,
  setToggleClearButton,
  setToggleTernaryDetails
} from "../../../Redux/features/Claim/ClaimAddNewSlice";
const ternaryInsDetails = [
  {
    planName: "251",
    addresss: "355345 534545 FGMHR,DD 651",
    payerName: "08-05 Medicare Claims-Paper-(#2213)",
    refernce: ""
  },
  {
    planName: "351",
    addresss: "76332 53242545 SDJR,DD 651",
    payerName: "07-05 AARP-(#2213)",
    refernce: ""
  }
];
const TernaryInsuranceModel = () => {
  const dispatch = useDispatch();
  const getTernInsuranceProviderName = e => {
    dispatch(setTernInsuranceProviderData(e));
    dispatch(setToggleTernaryDetails(true));
    dispatch(setToggleClearButton(true));
  };
  return (
    <div
      className="modal fade"
      id="ternIns_providerModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              All Payers
            </h1>
          </div>
          <div className="modal-body">
            <div className="col-md-12 mb-2">
              <div className="input-group">
                <input
                  autoFocus
                  className="form-control form-control-sm placeTextTax"
                  type="text"
                  placeholder="Search for providers "
                  aria-label="npi"
                  id="orderProvsearch"
                  name="orderProvsearch"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            <table className="table table-light table-hover table-striped table table-bordered">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Address</th>
                  <th>Payer Name</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {ternaryInsDetails.map((provi, i) => (
                  <tr
                    key={i}
                    data-bs-dismiss="modal"
                    onClick={() => getTernInsuranceProviderName(provi.payerName)}
                  >
                    <td>{provi.planName}</td>
                    <td>{provi.addresss}</td>
                    <td>{provi.payerName}</td>
                    <td>{provi.refernce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Search
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
};
export default TernaryInsuranceModel;

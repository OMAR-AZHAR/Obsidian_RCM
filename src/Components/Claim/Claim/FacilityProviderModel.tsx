import { useDispatch } from "react-redux";
import { setFacilityProviderData } from "../../../Redux/features/Claim/ClaimAddNewSlice";
const facilityProv = [
  {
    name: "66535(#34564)",
    addresss: "675 JC, Texas",
    refernce: "01",
    npi: "12354354",
  },
  {
    name: "Sergio (#333364))",
    addresss: "3 street, Texas",
    refernce: "01",
    npi: "12354354",
  },
];
const FacilityProviderModel = () => {
  const dispatch = useDispatch();
  const getFacilityProviderName = (e) => {
    dispatch(setFacilityProviderData(e));
  };
  return (
    <div
      className="modal fade"
      id="facility_providerModal"
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
              All Facilities
            </h1>
          </div>
          <div className="modal-body">
            <div className="col-md-12 mb-2">
              <div className="input-group">
                <input
                  autoFocus
                  className="form-control form-control-sm placeTextTax"
                  type="text"
                  placeholder="Search for Facilities "
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
                  <th>Name</th>
                  <th>Address</th>
                  <th>Reference #</th>
                  <th>NPI</th>
                </tr>
              </thead>
              <tbody>
                {facilityProv.map((provi, i) => (
                  <tr
                    key={i}
                    data-bs-dismiss="modal"
                    onClick={() => getFacilityProviderName(provi.name)}
                  >
                    <td>{provi.name}</td>
                    <td>{provi.refernce}</td>
                    <td>{provi.npi}</td>
                    <td>{provi.addresss}</td>
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
export default FacilityProviderModel;

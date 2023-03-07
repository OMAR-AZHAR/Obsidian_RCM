import { useDispatch } from "react-redux";
import { setOrderingProviderData } from "../../../Redux/features/Claim/ClaimAddNewSlice";
const orderProv = [
  {
    name: "Ali Waqar(#34564)",
    refernce: "01",
    npi: "12354354",
    addresss: "3 street, Texas",
  },
  {
    name: "Sergio (#333364))",
    refernce: "01",
    npi: "12354354",
    addresss: "3 street, Texas",
  },
];
const OrderingProviderModel = () => {
  const dispatch = useDispatch();
  const getOrderingProviderName = (e) => {
    dispatch(setOrderingProviderData(e));
  };
  return (
    <div
      className="modal fade"
      id="ordering_providerModal"
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
              All Referring Provider
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
                  <th>Name</th>
                  <th>Reference #</th>
                  <th>NPI</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {orderProv.map((provi, i) => (
                  <tr
                    key={i}
                    data-bs-dismiss="modal"
                    onClick={() => getOrderingProviderName(provi.name)}
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
export default OrderingProviderModel;

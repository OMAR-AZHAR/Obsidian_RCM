import { useDispatch } from "react-redux";
import { setRenderProviderData } from "../../../Redux/features/Claim/ClaimAddNewSlice";
const renderProv = [
  {
    ref: "",
    npi: 2452525,
    name: "Abe, Linclolin(#1234244)",
    submitter: "0000",
    taxId: "###-##-6666",
    ProfMode: "DEMO",
    practice: "CMD",
    instMode: "DEMO",
  },
  {
    ref: "",
    npi: 7436856,
    name: "Big,John(#1234244)",
    submitter: "0000",
    taxId: "###-##-6666",
    ProfMode: "DEMO",
    practice: "Martin J.Goofy",
    instMode: "DEMO",
  },
];
const RenderingProviderModel = () => {
  const dispatch = useDispatch();
  const getRenderProviderName = (e) => {
    dispatch(setRenderProviderData(e));
  };
  return (
    <div
      className="modal fade"
      id="rendering_providerModal"
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
              All Provider
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
                  id="renderProvsearch"
                  name="renderProvsearch"
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
                  <th>Reference #</th>
                  <th>NPI</th>
                  <th>Name</th>
                  <th>Submitter #</th>
                  <th>Tax ID</th>
                  <th>Prof. Mode</th>
                  <th>Practice</th>
                  <th>Inst. Mode</th>
                </tr>
              </thead>
              <tbody>
                {renderProv.map((provi, i) => (
                  <tr
                    key={i}
                    data-bs-dismiss="modal"
                    onClick={() => getRenderProviderName(provi.name)}
                  >
                    <td>{provi.ref}</td>
                    <td>{provi.npi}</td>
                    <td>{provi.name}</td>
                    <td>{provi.submitter}</td>
                    <td>{provi.taxId}</td>
                    <td>{provi.ProfMode}</td>
                    <td>{provi.practice}</td>
                    <td>{provi.instMode}</td>
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
export default RenderingProviderModel;

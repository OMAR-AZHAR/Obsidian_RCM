import { useNavigate } from "react-router-dom";
const practice = [
  {
    tick: "yes",
    P: "67 PUBLIC SQUARE",
    Seq: "10028750",
    NPI: "1730573452",
    Inactive: "",
  },
];
const status = [
  {
    name: "Do not Change",
  },
  {
    name: "Active",
  },
  {
    name: "Inactive",
  },
];
const serviceType = [
  {
    name: "Do not change",
  },
];
const providerId = [
  {
    name: "Do not change",
  },
];
const npi = [
  {
    name: "Do not change",
  },
];
const ConfigureEligibilityTable = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <div className="col-md-5 d-flex mb-3">
          <button
            onClick={() => alert("done")}
            className="btn btn-outline-primary btn-sm"
          >
            Done
          </button>
          <button
            onClick={() => navigate("/newprovider")}
            className="btn btn-outline-danger btn-sm mx-2"
          >
            Cancel
          </button>
        </div>
        <h4>Provider eligibility configuration for new provider</h4>
        <div className="overflow-scroll">
          <table className="table table-light table-hover table-striped table table-bordered caption-top">
            <thead className="text-nowrap">
              <tr>
                <th className="text-center">
                  <span className="fas fa-check" />{" "}
                </th>
                <th>Payer#</th>
                <th>Payer Name</th>
                <th>Payer ID</th>
                <th>Agreement</th>
                <th>Approved</th>
                <th>Provider ID</th>
                <th>Alternate NPI</th>
                <th>Login Required</th>
                <th>Payer Login</th>
                <th>Payer Password</th>
                <th>Status</th>
                <th>Default Service Type</th>
              </tr>
            </thead>

            <tbody>
              {" "}
              <br /> <br /> <br /> <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 mt-3">
          <div className="card mb-2">
            <div className="card-header text-dark">Batch Update</div>

            <div className="card-body">
              <div className="col-md-12 d-flex">
                <div className="col-md-2">
                  <label htmlFor="">Status</label>
                  <select id="status" className="form-select form-select-sm">
                    {status.map((stats, i) => {
                      return <option key={i}>{stats.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-4 mx-2">
                  <label htmlFor="">Service Type</label>
                  <select
                    id="service_type"
                    className="form-select form-select-sm"
                  >
                    {serviceType.map((service, i) => {
                      return <option key={i}>{service.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-2 mx-2">
                  <label htmlFor="">Provider ID</label>
                  <select
                    id="provider_id"
                    className="form-select form-select-sm"
                  >
                    {providerId.map((provider, i) => {
                      return <option key={i}>{provider.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-2 mx-2">
                  <label htmlFor="">NPI</label>
                  <select id="npi" className="form-select form-select-sm">
                    {npi.map((npivalue, i) => {
                      return <option key={i}>{npivalue.name}</option>;
                    })}
                  </select>
                </div>
                <button className="btn btn-outline-primary btn-sm mt-4">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfigureEligibilityTable;

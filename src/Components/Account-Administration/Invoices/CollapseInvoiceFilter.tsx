const start_date = "Jul 7, 2022";
const end_date = "Oct 5, 2022";
const CollapseInvoiceFilter = () => {
  return (
    <div>
      <div className="d-flex align-items-center ">
        <p>
          {" "}
          <button
            className="btn btn-outline-primary btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {" "}
            <span className="fas fa-filter mx-1" />
            Filter
          </button>
        </p>
        <p className="mx-3">
          Showing All invoices between {start_date} - {end_date}
        </p>
      </div>

      <div className="collapse " id="collapseExample">
        <div className="card card-body text-dark">
          <h5>Search for Invoices</h5> <hr />
          <div className="col-md-12 d-flex">
            <select className="form-select form-select-sm w-75" aria-label=".form-select-sm example">
              <option value="1">All</option>
              <option value="2">Other</option>
              <option value="3">Today</option>
              <option value="3">Yesterday</option>
              <option selected>Last 90 Days</option>
            </select>
            <input type="date" className="form-control form-control-sm mx-2 " />
            <input type="date" className="form-control form-control-sm " />
          </div>
          <div className="col-md-12 d-flex flex-column mt-2">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Show All Invoices
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Show Unpaid Invoices Only
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Show Specific Invoice
              </label>
            </div>
            <hr />
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-outline-primary btn-sm mx-1">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollapseInvoiceFilter;

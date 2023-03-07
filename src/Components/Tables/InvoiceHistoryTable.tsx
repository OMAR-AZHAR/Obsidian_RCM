import CollapseInvoiceFilter from "../Account-Administration/Invoices/CollapseInvoiceFilter";
const invoices = [
  {
    id: 20,
    date: "11/2/2022",
    invoice: 16564345,
    description: "one time invoice",
    amount: 106,
    balance: 0.0,
    note: "some patient notes",
  },
  {
    id: 1,
    date: "11/2/2022",
    invoice: 16564345,
    description: "one time invoice",
    amount: 106,
    balance: 0.0,
    note: "",
  },
];
const InvoiceHistoryTable = () => {
  return (
    <div className="">
      <div className="d-flex align-items-center">
        <CollapseInvoiceFilter />
      </div>

      <table className="table table-light table-hover table-striped table table-bordered caption-top mt-3">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Invoice #</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
            <th scope="col">Notes</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {invoices.map((x, i) => (
            <tr key={i}>
              <td>{x.date}</td>
              <td>{x.invoice}</td>
              <td>{x.description}</td>
              <td>${x.amount}</td>
              <td>${x.balance}</td>
              <td onClick={() => console.log("Some NOte")}>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <span className="fas fa-file" />
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-body">some notes</div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              {x.id === invoices[0].id ? (
                <td>
                  Payment Due 10/05/2022
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mx-1"
                    data-bs-toggle="m"
                    data-bs-target="#notes"
                  >
                    {" "}
                    PayNow
                  </button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default InvoiceHistoryTable;

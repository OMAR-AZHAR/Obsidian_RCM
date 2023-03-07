import CollapsePaymentFilter from "../Account-Administration/Invoices/CollapsePaymentFilter";
const payment = [
  {
    id: 20,
    date: "11/2/2022",
    payment: 16564345,
    description: "CC payment: American Express platinum (Auth # 188007)",
    amount: 106,
    applied: 160.0,
    remaining: 0,
    entered_by: "ukhan"
  }
];
const start_date = "Jul 7, 2022";
const end_date = "Oct 5, 2022";
const PaymentTableInvoice = () => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <CollapsePaymentFilter />
      </div>
      <table className="table table-light table-hover table-striped table table-bordered caption-top mt-3">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Payment #</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Applied</th>
            <th scope="col">Remaining</th>
            <th scope="col">Entered by</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((x, i) => (
            <tr key={i}>
              <td>{x.date}</td>
              <td>{x.payment}</td>
              <td>{x.description}</td>
              <td>${x.amount}</td>
              <td>${x.applied}</td>
              <td>${x.remaining}</td>
              <td>{x.entered_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PaymentTableInvoice;

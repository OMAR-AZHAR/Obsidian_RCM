const payerdata = [
  {
    name: "Umer Khan Amex",
    type: "Credit Card",
    default: true,
    inactive: false
  },
  {
    name: "American Express Platinum",
    type: "Credit Card",
    default: false,
    inactive: true
  },
  {
    name: "Umer Khan",
    type: "Credit Card",
    default: false,
    inactive: true
  }
];
const PayerTable = () => {
  return (
    <div>
      <table className="table table-light table-hover table-striped table table-bordered caption-top mt-3">
        <caption className="bg-primary text-white p-2 bord text-center">Recently Opened</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Inactive</th>
          </tr>
        </thead>
        <tbody>
          {payerdata.map((x, i) => (
            <tr key={i}>
              <td>{x.name}</td>
              <td>{x.type}</td>
              <td>{x.default === true ? <span className="fas fa-check" /> : ""}</td>
              <td>{x.inactive === true ? <span className="fas fa-check" /> : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PayerTable;

const dateTime = new Date().toLocaleString();
const history = [
  {
    name: "uKhan",
    date: dateTime,
    level: "deny"
  }
];
const SetupHistory = () => {
  return (
    <div>
      <div className="d-flex align-items-center" />
      <table className="table table-light table-hover table-striped table table-bordered caption-top mt-3">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Updated Time</th>
            <th scope="col">Level</th>
          </tr>
        </thead>
        <tbody>
          {history.map((x, i) => (
            <tr key={i}>
              <td>{x.name}</td>
              <td>{x.date}</td>
              <td>{x.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SetupHistory;

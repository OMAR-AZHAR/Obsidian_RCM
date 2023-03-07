export default function ShowAllReferringTable() {
  const showallreferrers = [
    {
      Name: "New",
      Reference: "Referring(#12442344)",
      NPI: "1730573452",
      Address: "M D",
    },
  ];
  return (
    <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
      <thead className="">
        <tr>
          <th>Name</th>
          <th>Reference #</th>
          <th>NPI</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {showallreferrers.map((showall, i) => {
          return (
            <tr
              className="table-active facility-font"
              key={i}
              onClick={() => alert(showall.Name)}
            >
              <td>{showall.Name}</td>
              <td>{showall.Reference}</td>
              <td>{showall.NPI}</td>
              <td>{showall.Address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

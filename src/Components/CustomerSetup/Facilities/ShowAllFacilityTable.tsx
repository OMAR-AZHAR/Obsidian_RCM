export default function ShowAllFacilityTable() {
  const showallfacility = [
    {
      name: 'New Facility(#12442344)',
      Address: '67 PUBLIC SQUARE',
      reference: '',
      NPI: '1730573452'
    }
  ];
  return (
    <table className="table table-light table-hover table-striped table table-bordered caption-top">
      <thead className="">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Refence #</th>
          <th>NPI</th>
        </tr>
      </thead>
      <tbody>
        {showallfacility.map((showall, i) => {
          return (
            <tr className="table-active facility-font" key={i} onClick={() => alert(showall.name)}>
              <td>{showall.name}</td>
              <td>{showall.Address}</td>
              <td>{showall.reference}</td>
              <td>{showall.NPI}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

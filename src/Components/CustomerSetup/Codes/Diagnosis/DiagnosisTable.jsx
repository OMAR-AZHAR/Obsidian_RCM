const diagnosisCode = [
  {
    code: 122223,
    desription: 'Essential Primary Hypertension',
    isActive: false,
  },
  {
    code: 44442,
    desription: 'Accute Bronchites',
    price: '$2123',
    isActive: true,
  },
];
const DiagnosisTable = () => {
  return (
    <div className="col-md-12 col-sm-6 col-xs-3">
      <table className="table table-light table-hover table-striped table table-bordered">
        <thead>
          <tr className="text-center">
            <th scope="col">Code</th>
            <th scope="col">Description</th>
            <th scope="col">Inactice</th>
          </tr>
        </thead>

        <tbody>
          {diagnosisCode?.map((codes, i) => {
            return (
              <tr className="table-active practice-font text-center" key={i} onClick={() => alert('code Clicked')}>
                <td>{codes.code}</td>
                <td>{codes.desription}</td>
                <td>{codes.isActive ? <span className="fas fa-check"></span> : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DiagnosisTable;

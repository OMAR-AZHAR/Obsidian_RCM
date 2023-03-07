import { useDispatch } from 'react-redux';

import { setBillClaimUnder } from '../../../../Redux/features/Providers/AllPRoviderSlice';
const allprovider = [
  {
    reference: '',
    npi: 112122133,
    name: 'ABC, Lincoline(#1231232)',
    submitter: '00000',
    taxId: '####-##-3232',
    profMode: 'DEMO',
    practice: 'CMD Service',
    instMode: 'DEMO',
  },
  {
    reference: '',
    npi: 332222133,
    name: 'BIG, Lincoline(#1231232)',
    submitter: '00000',
    taxId: '####-##-3232',
    profMode: 'DEMO',
    provice: 'MARTIN Service',
    instMode: 'DEMO',
  },
];

const AllProviderTable = () => {
  const dispatch = useDispatch();
  // const bill = useSelector((state)=>state.AllProviderSlice.billClicked);
  // const check = useSelector((state)=>state.AllProviderSlice.checkEligibilityClicked);
  // console.log(check);
  const dispatchHandler = (b) => {
    dispatch(setBillClaimUnder(b));
  };
  return (
    <div className="px-2">
      <table className="table table-light table-hover table-striped table table-bordered caption-top">
        <thead className="">
          <tr>
            <th>Reference #</th>
            <th>NPI</th>
            <th>Name</th>
            <th>Submitter #</th>
            <th>Tax ID</th>
            <th>Prof.Mode</th>
            <th>Practice</th>
            <th>Inst.Mode</th>
          </tr>
        </thead>
        <tbody>
          {allprovider?.map((prov, i) => {
            return (
              <tr
                {...prov}
                className="table-active provice-font"
                key={i}
                onClick={() => dispatchHandler(prov.name)}
                data-bs-dismiss="modal"
              >
                <td>{prov.reference}</td>
                <td>{prov.npi}</td>
                <td>{prov.name}</td>
                <td>{prov.submitter}</td>
                <td>{prov.taxId}</td>
                <td>{prov.profMode}</td>
                <td>{prov.practice}</td>
                <td>{prov.instMode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllProviderTable;

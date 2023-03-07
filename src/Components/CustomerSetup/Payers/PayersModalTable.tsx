import { Table } from "react-bootstrap";

// import { Table } from 'react-bootstrap/Table'

const PayersTable = () => {
  const payermodaldata = [
    {
      planname: "",
      address: "2445454",
      payername: "Medicare123",
      reference: "",
    },
  ];
  return (
    <Table striped bordered hover className="mt-2">
      <thead>
        <tr>
          <th>Plan Name</th>
          <th>Address</th>
          <th>Payer Name</th>
          <th>Reference #</th>
        </tr>
      </thead>
      <tbody>
        {payermodaldata?.map((payer, i) => {
          return (
            <tr key={i} {...payer} style={{ cursor: "pointer" }}>
              <td>{payer.planname}</td>
              <td>{payer.address}</td>
              <td>{payer.payername}</td>
              <td>{payer.reference}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PayersTable;

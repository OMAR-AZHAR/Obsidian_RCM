import { useState } from "react";
import { Button, Modal as Mod } from "react-bootstrap";

export default function PrintLabel() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Mod
        centered
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={handleClose}
      >
        <Mod.Body>
          <div className="px-0">
            <div className="row">
              <div className="col-md-2 text-center mt-5">
                <i className="fas fa-exclamation-triangle fa-2xl text-dark" />
              </div>
              <div className="col-md-10">
                WARNING: It is NOT recommended to disable patient payment
                redistribution for Electronic Remittance Advice. Any payment
                overages on a charge (due to both the Patient and Insurance
                making payments to that charge) will create an Insurance Account
                Credit.
                <br />
                <br />
                Please contact Customer Support if you have any questions.
              </div>
            </div>
          </div>
        </Mod.Body>
        <Mod.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Ok
          </Button>
        </Mod.Footer>
      </Mod>
    </div>
  );
}

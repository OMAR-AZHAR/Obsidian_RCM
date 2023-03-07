import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PayersTable from "./PayersModalTable";
const All_PayersModal = (props) => {
  return (
    <>
      <Modal
        animation={true}
        scrollable={true}
        size="xl"
        backdrop="static"
        keyboard={false}
        tabIndex={-1}
        centered
        show={props.showAll_PayersModal}
        onHide={props.closeAll_PayersModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Payers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for Payers"
              className="mx-0 me-0"
              aria-label="Search"
              autoFocus
            />
          </Form>

          <PayersTable />
        </Modal.Body>
        <Modal.Footer>
          <div className="col-md-12 d-flex justify-content-between">
            <div className="form-check mx-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="inactivepayers"
              />
              <label className="form-check-label" htmlFor="inactivepayers">
                include inactive payers
              </label>
            </div>
            <Button
              variant="outline-danger btn-sm"
              onClick={props.closeAll_PayersModal}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default All_PayersModal;

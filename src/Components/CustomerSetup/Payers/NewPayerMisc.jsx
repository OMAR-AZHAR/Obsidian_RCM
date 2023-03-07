import { lazy, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
const PLACE_OF_SERVICE_MODAL = lazy(() =>
  import("../../../GLOBAL/NPI_TAX_PLACE/PLACE_OF_SERVICE")
);
import { Link } from "react-router-dom";
const NewPayerMisc = ({ PayerNotesTextChange }) => {
  //   // *** ------------ Start of Notes, Alerts, Misc *** ------------ //
  const [showPlace_of_Service, setShowPlace_of_Service] = useState(false);
  const closePlace_of_Service_Modal = () => setShowPlace_of_Service(false);
  const checkbox_second = [
    {
      checked: null,
      value: "",
      label: "Do NOT print the payer address on the top of the form",
    },
    {
      checked: null,
      value: "",
      label: "Exclude patient payments from Box 29",
    },
    {
      checked: null,
      value: "",
      label: "Print the license number in Box 31",
    },
  ];
  const checkboxes = [
    {
      checked: null,
      value: "",
      label: "Automatically set Follow Up Date when billing to this payer",
    },
    {
      checked: null,
      value: "",
      label: "Use the provider name as the pay-to name",
    },
    {
      checked: null,
      value: "",
      label: "Only send the pay-to address",
    },
    {
      checked: null,
      value: "",
      label: "Use the office address as the pay-to address",
    },
    {
      checked: null,
      value: "",
      label: "Print CMS-1500 as NY Workers Compensation Form",
    },
    {
      checked: null,
      value: "",
      label: "Override billing provider with rendering provider",
    },
  ];
  const box21select = [
    { value: "Provider Name" },
    { value: "Signature on File" },
    { value: "Practice Name" },
    { value: "Leave Blank" },
  ];
  const checkboxes_third = [
    {
      checked: null,
      value: "",
      label: "Print ICD code for first diagnosis pointer in Box 24E",
    },
    {
      checked: null,
      value: "",
      label: "Send minutes instead of units on anesthesia claims",
    },
    {
      checked: null,
      value: "",
      label: "Send anesthesia start/stop times in a line note",
    },
  ];

  const checkboxes_fourth = [
    {
      checked: null,
      value: "",
      label: "Print referring physician in Box 76",
    },
    {
      checked: null,
      value: "",
      label: "Print Taxonomy Code in Box 76",
    },
    {
      checked: true,
      value: "",
      label: "Print Taxonomy Code in Box 81CC a",
    },
  ];
  const box38select = [
    { value: "Print insured's address" },
    { value: "Print payer's address" },
    { value: "Leave Blank" },
  ];
  const box80select = [
    { value: "Print insured's address" },
    { value: "Print payer's address" },
    { value: "Print remarks" },
  ];
  const popover = (
    <Popover className="popover" id="popover-customize-providers">
      <Popover.Body>
        <label>Provider(s)</label>
        <Form.Select size="sm" aria-label="Providers" required>
          <option value="">Providers</option>
        </Form.Select>
        <div className="row">
          <div className="col-md-6">
            <label>Status</label>
            <Form.Select size="sm" aria-label="Status">
              <option value="">Active</option>
              <option value="">Inactive</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <label htmlFor="" />
            <input
              className="form-control form-control-sm mt-0"
              type="text"
              placeholder="Individual ID"
              maxLength={20}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label>Bill Mode</label>
            <Form.Select size="sm" aria-label="Default select example">
              <option value="">Default</option>
              <option value="">Individual</option>
              <option value="">Group</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <label htmlFor="" />
            <input
              className="form-control form-control-sm mt-0"
              type="text"
              placeholder="Group ID"
              maxLength={20}
            />
          </div>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="acceptInsurance"
            defaultChecked={true}
          />
          <label className="form-check-label" htmlFor="acceptInsurance">
            Accept this Insurance
          </label>
        </div>
      </Popover.Body>
      <span className="d-flex justify-content-end mb-2 mx-2">
        <Button variant="outline-primary btn-sm" type="submit">
          Add
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="outline-danger btn-sm"
          onClick={() => document.body.click()}
        >
          Cancel
        </Button>
      </span>
    </Popover>
  );
  // *** ------------ End of Notes, Alerts, Misc *** ------------ //
  return (
    <>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Notes</Accordion.Header>
        <Accordion.Body className="px-2 py-2">
          <div className="px-0 mx-0">
            <textarea
              onChange={(e) => PayerNotesTextChange(e.target.value)}
              className="form-control"
              id="payernotestextarea"
              rows="10"
            />
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Alerts</Accordion.Header>
        <Accordion.Body>
          <Button disabled variant="outline-primary btn-sm">
            <i className="fa fa-plus" />
            &nbsp; Add Alert
          </Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Tasks</Accordion.Header>
        <Accordion.Body>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip style={{ fontSize: "11.5px" }} id="tooltip-disabled">
                Please Save the Payer first before creating a Task!
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <Button
                disabled
                style={{ pointerEvents: "none" }}
                variant="outline-primary btn-sm"
              >
                <i className="fa fa-plus" /> Create Tasks
              </Button>
            </span>
          </OverlayTrigger>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Billing Options</Accordion.Header>
        <Accordion.Body>
          <Tabs
            defaultActiveKey="General"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="General" title="General">
              {checkboxes.map((check, i) => {
                return (
                  <div className="form-check pt-2" key={i} {...check}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={check.value}
                      id={check.label}
                      checked={check.checked}
                      onChange={() => console.log(check.label)}
                    />
                    <label className="form-check-label" htmlFor={check.label}>
                      {check.label}
                    </label>
                  </div>
                );
              })}

              <div className="card mb-2 mt-2">
                <div className="card-header">Professional</div>
                <div className="card-body ">
                  <div className="input-group">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Default POS"
                      aria-label="PlaceofService"
                      id="PlaceofService"
                      name="PlaceofService"
                      // value={POSvalue}
                      maxLength="2"
                    />
                    {showPlace_of_Service && (
                      <PLACE_OF_SERVICE_MODAL
                        // POSselect={POSselect}
                        showPlace_of_Service={showPlace_of_Service}
                        closePlace_of_Service_Modal={
                          closePlace_of_Service_Modal
                        }
                      />
                    )}
                    <button
                      type="button"
                      className="input-group-text btn-hov"
                      id="PlaceofServicebtn"
                      onClick={(e) => setShowPlace_of_Service(true)}
                    >
                      <i className="fas fa-search" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="input-group mt-2 mb-2">
                    <input
                      style={{ height: "10px" }}
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Default Claim Note"
                      aria-label="DefaultClaimNote"
                      id="DefaultClaimNote"
                      name="DefaultClaimNote"
                      // value={DCNvalue}
                      maxLength="45"
                    />
                  </div>

                  {checkbox_second.map((ck, i) => {
                    return (
                      <div className="form-check pt-2" key={i} {...ck}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={ck.value}
                          id={ck.label}
                          checked={ck.checked}
                          onClick={() => console.log(ck.label)}
                        />
                        <label className="form-check-label" htmlFor={ck.label}>
                          {ck.label}
                        </label>
                      </div>
                    );
                  })}
                  <div className="mt-2">
                    <label>Print the following in Box 31</label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Box 31 selection"
                      defaultValue={Object.values(box21select[0].toString())}
                    >
                      {box21select.map((bx, i) => {
                        return (
                          <option key={i} {...bx} value={bx.value}>
                            {bx.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-check pt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      // value={check.value}
                      id="removeinsuredID#"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="removeinsuredID#"
                    >
                      Remove the insured's ID# from Box 1A
                    </label>
                  </div>

                  <div className="mt-2">
                    <label>
                      Print the following supplemental info in Box 24
                    </label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Box 31 selection"
                      defaultValue={"Narrative Name"}
                    >
                      <option value="Narrative Notes">Narrative Notes</option>{" "}
                      <option value="Anesthesia Start/Stop Times">
                        Anesthesia Start/Stop Times
                      </option>
                    </select>
                  </div>
                  {checkboxes_third.map((check, i) => {
                    return (
                      <div className="form-check pt-2" key={i} {...check}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={check.value}
                          id={check.label}
                          checked={check.checked}
                          onChange={() => console.log(check.label)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={check.label}
                        >
                          {check.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card mb-2 mt-2">
                <div className="card-header">Institutional</div>
                <div className="card-body ">
                  <div className="mt-0">
                    <label>Print the following in Box 38</label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Box 38 selection"
                      defaultValue={Object.values(box38select[1]).toString()}
                    >
                      {box38select.map((bx, i) => {
                        return (
                          <option key={i} {...bx} value={bx.value}>
                            {bx.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-2">
                    <label>Print the following in Box 80</label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Box 80 selection"
                      defaultValue={Object.values(box80select[2]).toString()}
                    >
                      {box80select.map((bx, i) => {
                        return (
                          <option key={i} {...bx} value={bx.value}>
                            {bx.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {checkboxes_fourth.map((check, i) => {
                    return (
                      <div className="form-check pt-2" key={i} {...check}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={check.value}
                          id={check.label}
                          defaultChecked={check.checked}
                          onChange={() => console.log(check.label)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={check.label}
                        >
                          {check.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Tab>
            <Tab eventKey="Provider" title="Provider">
              <div>
                <i className="fas fa-circle-info text-primary" />
                &nbsp; The provider billing options allow you to customize
                certain configuration settings for one or more providers
                specific to this payer. Providers not listed below will bill
                claims based on their general settings/configuration in the
                provider screen.
                <br />
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={popover}
                >
                  <Link to="#">Customize for Providers</Link>
                </OverlayTrigger>
              </div>

              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="seperateConfig"
                />
                <label className="form-check-label" htmlFor="seperateConfig">
                  Show seperate configurations for each office location
                </label>
              </div>
            </Tab>
          </Tabs>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};
export default NewPayerMisc;

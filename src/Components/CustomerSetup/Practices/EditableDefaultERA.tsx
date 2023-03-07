import { ChangeEvent, useState, useEffect } from "react";
import { Button, Modal as Mod } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllowAutoPatPay,
  getInfoLine,
  getMedicareAllow,
} from "../../../Redux/features/Practice/DefaultClaimsSlice";
export default function EditableDefaultERA() {
  const dispatch = useDispatch();
  const allow_patient_payment_redistribution = useSelector(
    (state: any) =>
      state.EditPractice?.data?.eras?.allow_patient_payment_redistribution
  );
  const info_line_redistributed_pays = useSelector(
    (state: any) => state.EditPractice?.data?.eras?.info_line_redistributed_pays
  );
  const use_medicare_allowable = useSelector(
    (state: any) => state.EditPractice?.data?.eras?.use_medicare_allowable
  );
  const [allowpatpayment, setallowpatpayment] = useState(
    Boolean(allow_patient_payment_redistribution)
  );
  const [infoline, setinfoline] = useState("");
  const [usemedicare, setusemedicare] = useState(false);
  // console.log(allowpatpayment);

  useEffect(() => {
    setallowpatpayment(Boolean(allow_patient_payment_redistribution));
    setinfoline(info_line_redistributed_pays);
    setusemedicare(Boolean(use_medicare_allowable));
  }, [
    allow_patient_payment_redistribution,
    info_line_redistributed_pays,
    use_medicare_allowable,
  ]);

  const [isChecked, setChecked] = useState(allowpatpayment);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onUncheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (isChecked === true) {
      setChecked(false);
      handleShow();
      dispatch(getAllowAutoPatPay(Number(e.target.checked)));
    } else {
      setChecked(true);
      dispatch(getAllowAutoPatPay(Number(e.target.checked)));
    }
  };
  //   const checked = true;
  return (
    <div className="px-0">
      <div className="mt-2 mb-1">
        <Mod
          centered
          backdrop="static"
          keyboard={false}
          show={show}
          onHide={handleClose}
        >
          <Mod.Body>
            <div className="container px-0">
              <div className="row">
                <div className="col-md-2 text-center mt-5">
                  <i className="fas fa-exclamation-triangle fa-2xl text-dark" />
                </div>
                <div className="col-md-10">
                  WARNING: It is NOT recommended to disable patient payment
                  redistribution for Electronic Remittance Advice. Any payment
                  overages on a charge (due to both the Patient and Insurance
                  making payments to that charge) will create an Insurance
                  Account Credit.
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

        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="autoPatient"
          onChange={(e) => onUncheck(e)}
          // defaultChecked={isChecked}
          checked={isChecked}
        />
        <label className="form-check-label " htmlFor="autoPatient">
          &nbsp;Allow Automatic Patient Payment Redistribution
        </label>
      </div>

      <div className="col-md-12 px-0">
        <label className="mt-1">Info Line for Redistributed Payments</label>
        <select
          defaultValue={"Display original memo line only"}
          value={infoline}
          className="form-select form-select-sm "
          aria-label=".form-select-sm example"
          onChange={(e) => dispatch(getInfoLine(e.target.value))}
        >
          <option value={"Display original memo line only"}>
            Display original memo line only
          </option>
          <option value="Create Infoline: 'Payment Redistribution'">
            Create Infoline: 'Payment Redistribution'
          </option>
          <option value="Create Infoline: 'Payment Redistribution {`{original tranids}`}'">
            Create Infoline: 'Payment Redistribution {`{original tranids}`}'
          </option>
        </select>
      </div>

      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          checked={usemedicare}
          onChange={(e) => dispatch(getMedicareAllow(e.target.checked))}
          id="medicareallow"
        />
        <label className="form-check-label " htmlFor="medicareallow">
          Use the Medicare allowable rather than calculating the allowed amount
          on Medicare claims
        </label>
      </div>
    </div>
  );
}

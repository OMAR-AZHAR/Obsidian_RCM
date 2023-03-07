import API from "../Api/ClientApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetTOB } from "../Redux/features/Global_Forms/POS_TOB_TOS_slice";

export default function TYPES_OF_BILL_MODAL({ SetInputValue }) {
  const dispatch = useDispatch();

  const [TofData, SetTofData] = useState("");
  const [TocData, SetTocData] = useState("");
  const [FreqData, SetFreq] = useState("");
  // console.log(tobdata?.frequency?.id);
  const [Tof, setTof] = useState(1);
  const [Toc, setToc] = useState(1);
  const [Freq, setFreq] = useState(1);
  const concat = "" + Tof + Toc + Freq;
  dispatch(SetTOB(Number(concat)));
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("access"));
    let customerID = JSON.parse(sessionStorage.getItem("customer_id"));
    API.get("customersetup/practice/typeofbill", {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          SetTofData(response.data);
          SetTocData(response.data);
          SetFreq(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Tof, Toc, Freq]);
  return (
    <div
      className="modal fade text-dark"
      id="showTOBModel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Types of Bills</h5>
          </div>
          <div className="modal-body">
            <div className="col-md-12">
              <div className="mt-0">
                {/* ======= Type of Facility ======= */}
                <label htmlFor="tof">Type of Facility</label>
                <select
                  id="tof"
                  className="form-select form-select-sm"
                  aria-label="Default select example"
                  defaultValue={0}
                  onChange={(e) => setTof(e.target.value)}
                >
                  {TofData.facility_type?.map((tof, i) => {
                    return (
                      <option key={i} value={tof?.id} {...tof}>
                        {tof?.id} - {tof?.name}
                      </option>
                    );
                  })}
                </select>
                {/* ======= Type of Care ======= */}
                <label htmlFor="toc" className="mt-2">
                  Type of Care
                </label>
                <select
                  id="toc"
                  defaultValue={0}
                  className="form-select form-select-sm"
                  aria-label="Default select example"
                  onChange={(e) => setToc(e.target.value)}
                >
                  {TocData.care_type?.map((tc, i) => {
                    return (
                      <option key={i} value={tc?.id} {...tc}>
                        {tc?.id} - {tc?.type}
                      </option>
                    );
                  })}
                </select>
                {/* ======= Frequency ======= */}
                <label htmlFor="freq" className="mt-2">
                  Frequency
                </label>
                <select
                  id="freq"
                  defaultValue={0}
                  className="form-select form-select-sm"
                  aria-label="Default select example"
                  onChange={(e) => setFreq(e.target.value)}
                >
                  {FreqData.frequency?.map((freq, i) => {
                    return (
                      <option key={i} value={freq?.id} {...freq}>
                        {freq?.id} - {freq?.frequency}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-bs-dismiss="modal"
              onClick={(e) => SetInputValue(localStorage.getItem("TOB_Value"))}
            >
              Apply
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';

const Viewer = () => {
  const [togglebtn, setToggle] = useState(true);
  const Togglebtn = () => {
    setToggle(!togglebtn);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const favorites = [
    {
      category: 'AR Reports',
      report: '**Charges Due Insurance by Aging Range',
    },
    {
      category: 'AR Management Reports',
      report: 'A/R Aging Summary',
    },
    {
      category: 'AR Management Reports',
      report: 'Activity Summary',
    },
    {
      category: 'AR Reports',
      report: 'Adjustment Reasons',
    },
    {
      category: 'Daily/Monthly Reports',
      report: 'Daily Deposit Report',
    },
    {
      category: 'AR Daily Reports',
      report: '**Charges Due Insurance by Aging Range',
    },
    {
      category: 'AR Yearly Reports',
      report: '**Charges Due Insurance by Aging Range',
    },
  ];
  return (
    <div className="mt-3 mx-0">
      <Tabs defaultActiveKey="Run Report" id="run_report_tab" className="mb-3">
        <Tab eventKey="Run Report" title="Run Report">
          <span>
            Please select a report to run or{' '}
            <button onClick={handleShow} className="btn px-0 btn-link">
              view saved results
            </button>
          </span>
          {/* ************ */}
          <Modal keyboard={false} centered backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header>
              <h5 className="fw-bold">Report Snapshots</h5>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-7">
                  <label>Search for Snapshots</label>
                  <input className="form-control form-control-sm" placeholder="Search for snapshots" type="search" />
                </div>
                <div className="col-md-5">
                  <label>Saved by</label>
                  <select
                    id="savedby_select"
                    name="savedby_select"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    defaultValue={'Everyone'}
                  >
                    <option value="Everyone">Everyone</option>
                    <option value="Others">Others</option>
                    <option value="Me">Me</option>
                  </select>
                </div>
              </div>
              <br /> <br /> <br /> <br /> <br /> <br /> <br />
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline-danger btn-sm" onClick={handleClose}>
                Cancel
              </button>
            </Modal.Footer>
          </Modal>

          {/* ************ */}

          <div className="row">
            <div className="col-md-5">
              <div className="card text-dark">
                <div className="card-header">All Reports</div>
                <div className="card-body px-0">
                  {/* <div className="col-md-12 mx-0 px-0 me-0 pe-0"> */}
                  <div className="input-group">
                    <input
                      className="form-control form-control-sm"
                      placeholder="Search for reports (3 characters)"
                      type="search"
                    />
                    {togglebtn ? (
                      <button className="input-group-text btn-hov btn-sm" onClick={Togglebtn}>
                        <i></i>✏️&nbsp;Edit
                      </button>
                    ) : (
                      <button className="input-group-text btn-hov btn-sm" onClick={Togglebtn}>
                        <i></i>✔️&nbsp;Done
                      </button>
                    )}{' '}
                  </div>
                  {/* </div> */}

                  <div className="col-md-12 px-2 mt-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="expandall" />
                      <label className="form-check-label" htmlFor="expandall">
                        Expand All
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div
                    className="px-2"
                    style={{
                      overflowY: 'scroll',
                      height: 'calc(100vh - 550px)',
                    }}
                  >
                    ******All reports shown here******
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <hr />
                  <div className="col-md-12 px-2">
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" value="" id="standardrep" />
                      <label className="form-check-label" htmlFor="standardrep">
                        Standard Reports
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12 px-2">
                    <div className="form-check d-flex">
                      <input className="form-check-input" type="checkbox" value="" id="customrep" />
                      &nbsp;
                      <label className="form-check-label" htmlFor="customrep">
                        {' '}
                      </label>
                      Custom Reports build by{' '}
                      <div className="col-md-7 ms-2">
                        <select
                          id="customrep_select"
                          className="form-select form-select-sm"
                          aria-label="Default select example"
                          defaultValue={'Any User'}
                        >
                          <option value="Any User">Any User</option>
                          <option value="Me">Me</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 px-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="hiddenrep" />
                      <label className="form-check-label" htmlFor="hiddenrep">
                        Hidden Reports
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className={`card text-dark`}>
                <div className="card-header">Favorites</div>
                <div
                  className="card-body px-2 py-0 pb-2"
                  style={{
                    overflowY: 'scroll',
                    height: 'calc(100vh - 450px)',
                  }}
                >
                  <table
                    className={`table-responsive table-sm table table-light table-hover table-striped table-bordered caption-top`}
                  >
                    <thead className="">
                      <tr>
                        <th>Category</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favorites?.map((fav, i) => {
                        return (
                          <tr
                            className="table-active facility-font"
                            key={i}
                            onClick={() => alert(fav.category)}
                            {...fav}
                          >
                            <td>{fav.category}</td>
                            <td>{fav.report}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* ******************************************* */}
              <div className="card text-dark mt-2">
                <div className="card-header"> Recently Ran </div>
                <div
                  className="card-body px-2 py-0 pb-2"
                  style={{
                    overflowY: 'scroll',
                    height: 'calc(100vh - 600px)',
                  }}
                >
                  <table className="table-responsive table table-sm table-light table-hover table-striped table-bordered caption-top">
                    <thead className="">
                      <tr>
                        <th>Category</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favorites?.map((fav, i) => {
                        return (
                          <tr
                            className="table-active facility-font"
                            key={i}
                            onClick={() => alert(fav.category)}
                            {...fav}
                          >
                            <td>{fav.category}</td>
                            <td>{fav.report}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        {/* <Tab eventKey="profile" title="Profile">
          Hi2
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          H3
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default Viewer;

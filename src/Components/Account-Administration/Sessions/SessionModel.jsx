import { lazy, useState } from 'react';
import { Link } from 'react-router-dom';
const AppliedFilters = lazy(() => import('./AppliedFilters'));
const AppliedFiltersModel = lazy(() => import('./AppliedFiltersModel'));
import './Sessions.css';

const user_sessions = [
  {
    session: 1232134,
    username: 'kashif',
    customer: 'Some Customer',
    Ip: 224.565,
    loggedIn_time: '10/07.2022 03:08',
    loggedOut_time: '',
    active: true,
    expired: false,
  },
];
const SessionModel = (props) => {
  const [displayFilter, setDisplayFilter] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const toggle = () => {
    if (displayFilter === false) {
      setOverlay('overlay');
      setDisplayFilter(true);
    } else if (displayFilter === true) {
      setDisplayFilter(false);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="modal-content">
          <div style={{ position: 'relative' }}>
            <div className="row">
              <div className="col-md-1">
                <button type="button" onClick={toggle} className="btn btn-outline-primary  btn-sm mx-1">
                  <span className="fas fa-filter"></span>
                </button>
              </div>
              <div className="col-md-10">
                <div className="col-md d-flex align-items-center">
                  <button
                    onClick={() => alert('test: Killed all Sessions')}
                    type="button"
                    className="btn btn-outline-primary  btn-sm mx-1"
                  >
                    <span className="fas fa-cancel mx-1"></span>Kill Session
                  </button>
                  <Link type="button" className="mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    View Applied Filters
                  </Link>
                  {/* applied filter model */}
                  <AppliedFiltersModel />
                  <input
                    id="search"
                    name="search"
                    className="form-control form-control-sm w-25 mx-1"
                    placeholder="Search"
                  ></input>
                  <button type="button" className="btn btn-outline-primary  btn-sm mx-1">
                    <span className="fas fa-arrow-up"></span>
                  </button>
                  <button type="button" className="btn btn-outline-primary  btn-sm mx-1">
                    <span className="fas fa-arrow-down"></span>
                  </button>
                </div>
                <table className="table table-light table-hover table-striped table table-bordered caption-top mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Session</th>
                      <th scope="col">Username</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Ip Address</th>
                      <th scope="col">Logged In</th>
                      <th scope="col">Logged Out</th>
                      <th scope="col">Active</th>
                      <th scope="col">Expired</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user_sessions.map((x, i) => (
                      <tr key={i}>
                        <td>{x.session}</td>
                        <td>{x.username}</td>
                        <td>{x.customer}</td>
                        <td>{x.ip}</td>
                        <td>{x.loggedIn_time}</td>
                        <td>{x.loggedOut_time}</td>
                        <td>{x.active === true ? <span className="fas fa-check"></span> : <span></span>}</td>
                        <td>{x.expired === true ? <span className="fas fa-check"></span> : <span></span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="modal-footer">
                  <button
                    onClick={() => props.closeSessionModel()}
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
              {displayFilter ? (
                <div
                  style={{
                    width: '50%',
                    position: 'absolute',
                    backgroundColor: '#d9dbdb',
                  }}
                >
                  <AppliedFilters closeFilter={toggle} />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </form>

      {/* <div className="row">
                <div className="col-md-12">
                    <div className="d-flex">
                        <div className="">
                            <button
                                type="button"
                                onClick={toggle}
                                className="btn btn-outline-primary  btn-sm mx-1"
                            >
                                <span className="fas fa-filter"></span>
                            </button>
                        </div>
                        <div >
                            <div className="d-flex w-100">
                                <button type='button' className='btn btn-outline-primary  btn-sm mx-1'><span className='fas fa-cancel mx-1'></span>Kill Session</button>
                                <Link className='mx-1 align-self-center'>View Applied Filters</Link>
                                <input className='form-control form-control-sm w-25 mx-1' ></input>
                                <button type='button' className='btn btn-outline-primary  btn-sm mx-1'><span className='fas fa-arrow-up'></span></button>
                                <button type='button' className='btn btn-outline-primary  btn-sm mx-1'><span className='fas fa-arrow-down'></span></button>
                            </div>

                            <table className="table table-light w-100 table-hover table-striped table table-bordered caption-top mt-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Session</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Ip Address</th>
                                        <th scope="col">Logged In</th>
                                        <th scope="col">Logged Out</th>
                                        <th scope="col">Active</th>
                                        <th scope="col">Expired</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user_sessions.map((x, i) => (
                                        <tr key={i}>
                                            <td>{x.session}</td>
                                            <td>{x.username}</td>
                                            <td>{x.customer}</td>
                                            <td>{x.ip}</td>
                                            <td>{x.loggedIn_time}</td>
                                            <td>{x.loggedOut_time}</td>
                                            <td>{x.active === true ? <span className='fas fa-check'></span> : <span></span>}</td>
                                            <td>{x.expired === true ? <span className='fas fa-check'></span> : <span></span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>*/}
    </div>
  );
};

export default SessionModel;

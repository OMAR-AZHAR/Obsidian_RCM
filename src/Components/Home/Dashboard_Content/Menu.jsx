import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../Api/ClientApi";

function NewNav(props) {
  // const [image, setImage] = useState({ preview: "", raw: "" });
  const navigate = useNavigate();
  const [customer_name, setcustomer_name] = useState("");
  window.addEventListener("storage", () => {
    setcustomer_name(
      sessionStorage.getItem("customername")?.toString().toUpperCase()
    );
  });

  const navitems = [
    {
      link: "",
      icon: "far fa-question-circle fa-2x",
      navlabel: "Help",
    },
    {
      link: "",
      icon: "far fa-envelope-open fa-2x",
      navlabel: "Messages",
    },
    {
      link: "",
      icon: "fas fa-tasks	fa-2x",
      navlabel: "Tasks",
    },
    {
      link: "",
      icon: "far fa-lightbulb fa-2x",
      navlabel: "New Features",
    },
  ];
  function LogoutAPICall() {
    API.post("auth/logout")
      .then(function (response) {
        if (response) {
          window.localStorage.clear();
          window.sessionStorage.clear();
          return navigate("/Login"); // to login
        }
      })
      .catch(function (error) {
        console.log("Some Error in Logout Req", error);
      });
  }
  const SessionName = sessionStorage.getItem("customername");
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg={props.mode}
      variant={props.mode}
      className="py-0"
      style={{ boxShadow: "2px 3px 10px grey" }}
    >
      <Container fluid={true}>
        <Navbar.Brand href="/user">
          <img src={props.logo} alt="Logo" width="100%" height="120%" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {navitems.map((items, i) => {
              return (
                <Nav.Link href={items.link} key={i} className="text-center">
                  <i className={items.icon}></i>
                  <br />
                  {items.navlabel}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav>
            <li
              // href="#darkmode"
              onClick={props.toggleMode}
              className="justify-content-center d-flex mt-3 mb-3"
            >
              {" "}
              <div className="form-check form-switch">
                <i className={`fas fa-adjust fa-sm`}></i>
                <input
                  className="form-check-input"
                  style={{ marginLeft: "-45px" }}
                  type="checkbox"
                  role="switch"
                  id="Mode"
                  onChange={props.toggleMode}
                  checked={props.checked}
                />
              </div>
            </li>
            {/* {image.preview ? ( 
                 <img
                  src={image.preview}
                  className="rounded-circle pe-auto"
                  alt="Profile Picture"
                  width="80"
                  height="80"
                /> 
               ) : (  */}
            <span
              className="text-center p-0"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-sharp fa-solid fa-circle-user fa-3x pe-auto pt-2 px-2"></i>
            </span>
            {/* )} */}
            <span
              style={{ cursor: "pointer" }}
              data-bs-toggle="dropdown"
              className="flex flex-column text-center text-md-center  text-sm-center  text-lg-start text-xl-start"
            >
              <span>
                {SessionName < 15
                  ? SessionName?.toString().toUpperCase()
                  : SessionName?.toString().toUpperCase()?.substring(0, 20)}
              </span>
              <br />
              <span className="pt-1 pb-1">
                {sessionStorage.getItem("firstname")?.toString().toUpperCase()}
              </span>
              <br />
              <span>{sessionStorage.getItem("sequenceno")}</span>
            </span>

            <li className="nav-item dropdown mt-2 px-0 text-center">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <i className="fas fa-user fa-fw fa-xl"></i> */}
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
                style={{ boxShadow: "3px 1px 10px grey" }}
              >
                <li>
                  <Link className="dropdown-item" to="#!">
                    Switch Customers
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#!">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#!">
                    More
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    to="/Login"
                    // onClick={() => {
                    //   window.localStorage.clear();
                    //   window.sessionStorage.clear();
                    // }}
                    onClick={() => LogoutAPICall()}
                    className="dropdown-item"
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewNav;

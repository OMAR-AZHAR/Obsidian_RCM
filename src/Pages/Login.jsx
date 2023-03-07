import "../assets/css/Login.css";
// import "../Pages/log_css.css";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import API from "../Api/ClientApi";
import Swal from "sweetalert2";
import "./assets/login.css";
import image from "./assets/login.jpg";
const Login = () => {
  const [error, setError] = useState(false);
  // const [attempts, setAttempts] = useState();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [passwordType, setPasswordType] = useState("password");
  const ToggleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values, action) => {
      // console.log("form data", formik.values);
      API.post(
        "auth/login",
        {
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
          username: formik.values.username,
          password: formik.values.password,
        },
        action.resetForm()
      )
        .then(function (response) {
          if (response.data.status === true) {
            window.sessionStorage.setItem(
              "firstname",
              response.data.firstname,
              {
                sameSite: "strict",
                secure: true,
              }
            );
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            // get name of user loggedIn
            window.sessionStorage.setItem(
              "customername",
              response.data.customername,
              {
                sameSite: "strict",
                secure: true,
              }
            ); // get associated Customer Name LoggedIn
            window.sessionStorage.setItem(
              "sequenceno",
              response.data.sequenceno,
              {
                sameSite: "strict",
                secure: true,
              }
            ); // get associated Customer Seq # LoggedIn
            window.sessionStorage.setItem(
              "userprofilepic",
              response.data.userprofileimage,
              {
                sameSite: "strict",
                secure: true,
              }
            ); // get pic of user
            window.sessionStorage.setItem(
              "access",
              JSON.stringify(response.data.access_token),
              {
                sameSite: "strict",
                secure: true,
              }
            );
            window.sessionStorage.setItem(
              "customer_id",
              JSON.stringify(response.data.customer_id),
              {
                sameSite: "strict",
                secure: true,
              }
            );
            return navigate("/");
          }
        })
        .catch(function (error) {
          console.log("the is error", error);
          // alert('User not found', error)
          setError(true);
          // const handleError = () =>{
          // }
        });
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = " ";
      }
      if (!values.password) {
        errors.password = " ";
      }
      return errors;
    },
  });
  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 main-wrapper">
      <div className="container d-flex align-content-end justify-content-end">
        <div className="col-md-8 login-card">
          <div className="d-flex">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={image} alt="login" className="login-card-img" />
            </div>

            <div className="  col-md-6" style={{ padding: " 25px" }}>
              <div className="card-body">
                <form
                  autoComplete="new-password"
                  onSubmit={formik.handleSubmit}
                  className="py-3"
                >
                  <div className="form-group py-3">
                    <label for="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="username"
                      id="username"
                      // className="form-control "
                      height="20px"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      placeholder="UserName"
                      onFocus={() => setError(false)}
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      name="username"
                      aria-describedby="Username"
                      maxLength={40}
                      required={true}
                      className={`form-control mt-3 inputCss ${
                        formik.errors.username ? "is-invalid" : ""
                      }`}
                      title={`${
                        formik.errors.username ? "This field is required" : ""
                      }`}
                    />{" "}
                    {formik.errors.username ? (
                      <div className="error">{formik.errors.username}</div>
                    ) : null}
                  </div>
                  <div className="form-group mb-4">
                    <label for="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type={passwordType}
                      className={`${
                        formik.errors.password ? "is-invalid" : ""
                      } form-control inputCss`}
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onFocus={() => setError(false)}
                      value={formik.values.password}
                      required={true}
                      title={`${
                        formik.errors.password ? "This field is required" : ""
                      }`}
                      maxLength={90}
                    />{" "}
                    {formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <button
                    name="login"
                    id="login"
                    className="btn btn-block login-btn btn-dark mb-4 w-100"
                    type="submit"
                    value="Login"
                  >
                    Sign In
                  </button>
                  {error ? (
                    <span
                      style={{ fontSize: "25px !important" }}
                      className="text-light form-error mx-2 px-2 py-2 bg-danger rounded-2"
                    >
                      User not found!
                    </span>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

/* import "../assets/css/Login.css";
import "../Pages/logboot.css";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import API from "../Api/ClientApi";
import Swal from "sweetalert2";
import "./assets/css/login.css";
import image from "./assets/images/login.jpg";
// import pic1 from "../assets/images/login.jpg";
// import logo from "../assets/images/logo.svg";
const Login = () => {
  const [error, setError] = useState(false);
  // const [attempts, setAttempts] = useState();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [passwordType, setPasswordType] = useState("password");
  const ToggleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values, action) => {
      // console.log("form data", formik.values);
      API.post(
        "auth/login",
        {
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
          username: formik.values.username,
          password: formik.values.password,
        },
        action.resetForm()
      )
        .then(function (response) {
          if (response.data.status === true) {
            window.sessionStorage.setItem(
              "firstname",
              response.data.firstname,
              {
                sameSite: "strict",
                secure: true,
              }
            );
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            // get name of user loggedIn
            window.sessionStorage.setItem(
              "customername",
              response.data.customername,
              {
                sameSite: "strict",
                secure: true,
              }
            ); // get associated Customer Name LoggedIn
            window.sessionStorage.setItem(
              "sequenceno",
              response.data.sequenceno,
              {
                sameSite: "strict",
                secure: true,
              }
            ); // get associated Customer Seq # LoggedIn
            window.sessionStorage.setItem(
              "userprofilepic",
              response.data.userprofileimage,
              {
                sameSite: "strict",
                secure: true,
              }
            ); // get pic of user
            window.sessionStorage.setItem(
              "access",
              JSON.stringify(response.data.access_token),
              {
                sameSite: "strict",
                secure: true,
              }
            );
            window.sessionStorage.setItem(
              "customer_id",
              JSON.stringify(response.data.customer_id),
              {
                sameSite: "strict",
                secure: true,
              }
            );
            return navigate("/");
          }
        })
        .catch(function (error) {
          console.log("the is error", error);
          // alert('User not found', error)
          setError(true);
          // const handleError = () =>{
          // }
        });
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = " ";
      }
      if (!values.password) {
        errors.password = " ";
      }
      return errors;
    },
  });
  // console.log(formik.errors);
  return (
    <div class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="login-card">
          <div class="row no-gutters p-5 ">
            <div class="col-md-5 ">
              <img src={image} alt="login" class="login-card-img" />
            </div>
            <div class="col-md-7 ">
              <div class="card-body">
                <form
                  autoComplete="new-password"
                  onSubmit={formik.handleSubmit}
                >
                  <div class="form-group">
                    <label for="text" class="sr-only">
                      UserName
                    </label>
                    <input
                      type="text"
                      // className={`form-control form-control-sm ${
                      //   formik.errors.username && "is-invalid"
                      // }`}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      placeholder="UserName"
                      onFocus={() => setError(false)}
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      name="username"
                      id="username"
                      aria-describedby="Username"
                      maxLength={40}
                      required={true}
                      className={`form-control ${
                        formik.errors.username ? "is-invalid" : ""
                      }`}
                      title={`${
                        formik.errors.username ? "This field is required" : ""
                      }`}
                    />
                    {formik.errors.username ? (
                      <div className="error">{formik.errors.username}</div>
                    ) : null}
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">
                      Password
                    </label>
                    <input
                      type={passwordType}
                      className={`${
                        formik.errors.password ? "is-invalid" : ""
                      } form-control`}
                      name="password"
                      id="password"
                      class="form-control"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onFocus={() => setError(false)}
                      value={formik.values.password}
                      required={true}
                      title={`${
                        formik.errors.password ? "This field is required" : ""
                      }`}
                      maxLength={90}
                    />{" "}
                    {formik.errors.password ? (
                      <div className="error">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <button
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    value="Login"
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                  {error ? (
                    <span
                      style={{ fontSize: "25px !important" }}
                      className="text-light form-error mx-2 px-2 py-2 bg-danger rounded-2"
                    >
                      User not found!
                    </span>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="snippet-body user-select-none">
    //   <div className="wrapper">
    //     <div className="h2 text-center">Obsidian</div>
    //     <div className="h4 text-muted text-center pt-2">
    //       {/* Sign In to Continue */
//     </div>
//     <form
//       autoComplete="new-password"
//       onSubmit={formik.handleSubmit}
//       className="pt-3"
//     >
//       <div className="form-group py-2">
//         <div className="input-field">
//           <span className="far fa-user p-2" />
//           <input
//             type="text"
//             // className={`form-control form-control-sm ${
//             //   formik.errors.username && "is-invalid"
//             // }`}
//             autoComplete="off"
//             autoCapitalize="off"
//             autoCorrect="off"
//             spellCheck="false"
//             name="username"
//             id="username"
//             aria-describedby="Username"
//             placeholder="UserName"
//             onChange={formik.handleChange}
//             onFocus={() => setError(false)}
//             value={formik.values.username}
//             maxLength={40}
//             required={true}
//             className={`form-control ${
//               formik.errors.username ? "is-invalid" : ""
//             }`}
//             title={`${
//               formik.errors.username ? "This field is required" : ""
//             }`}
//           />
//           {formik.errors.username ? (
//             <div className="error">{formik.errors.username}</div>
//           ) : null}
//         </div>
//       </div>

//       <div className="form-group py-1 pb-2">
//         <div className="input-field">
//           <span className="fas fa-lock p-2" />
//           <input
//             autoComplete="new-password"
//             autoCapitalize="off"
//             autoCorrect="off"
//             spellCheck="false"
//             type={passwordType}
//             className={`${
//               formik.errors.password ? "is-invalid" : ""
//             } form-control`}
//             id="exampleInputPassword1"
//             name="password"
//             placeholder="Password"
//             onChange={formik.handleChange}
//             onFocus={() => setError(false)}
//             value={formik.values.password}
//             required={true}
//             title={`${
//               formik.errors.password ? "This field is required" : ""
//             }`}
//             maxLength={90}
//           />

//           {formik.errors.password ? (
//             <div className="error">{formik.errors.password}</div>
//           ) : null}

//           {/* <button
//             type="button"
//             onClick={() => ToggleShowPassword()}
//             className="btn btn-transparent bg-white btn-sm text-muted"
//           >
//             {passwordType === "password" ? (
//               <LinkiOutlineEyeInvisible />
//             ) : (
//               <LinkiOutlineEye />
//             )}
//           </button> */}
//         </div>
//       </div>
//       <div className="form-check user-select-none text-muted px-5">
//         <input
//           className="form-check-input"
//           type="checkbox"
//           value=""
//           id="Remember"
//         />
//         <label className="form-check-label" htmlhtmlFor="Remember">
//           Remember me
//         </label>
//       </div>
//       <div className="d-flex justify-content-center">
//         <button type="submit" className="btn btn-block text-center my-3">
//           Sign in
//         </button>
//       </div>
//       <span className="d-flex justify-content-center">
//         {error ? (
//           <span
//             style={{ fontSize: "25px !important" }}
//             className="text-light text-center form-error mx-2 px-2 py-2 bg-danger rounded-2"
//           >
//             User not found!
//           </span>
//         ) : null}
//       </span>
//       <div className="text-center pt-3 text-muted">
//         <button
//           type="button"
//           className="btn btn-sm btn-transparent text-muted"
//         >
//           Forgot your Password?
//         </button>
//       </div>
//     </form>
//   </div>
// </div>

// <div className="d-flex align-items-center min-vh-100 py-3 py-md-0 login-body">
//   <div className="container">
//     <div className="card login-card">
//       <div className="row no-gutters">
//         <div className="col-md-5">
//           {/* <img src={`${pic1}`} alt="login" className="login-card-img" /> */}
//           <lottie-player
//             src="https://assets6.lottiefiles.com/packages/lf20_TdfPXB1To4.json"
//             background="#F8EAD4"
//             speed="1"
//             style={{ width: "490px", height: "600px" }}
//             loop
//             autoplay
//           ></lottie-player>
//         </div>
//         <div className="col-md-7 d-flex justify-content-center bg-c">
//           <div className="card-body text-center">
//             <div className="brand-wrapper">
//               {/* <img
//                 width="200"
//                 height="200"
//                 src={`${logo}`}
//                 alt="logo"
//                 className="logo"
//               />*/}
//             </div>{" "}
//             Obsidian
//             {/* <p className="login-card-description">Sign into your account</p> */}
//             <div className="d-flex justify-content-center">
//               <form action="post" onSubmit={formik.handleSubmit}>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     autoComplete="off"
//                     autoCapitalize="off"
//                     autoCorrect="off"
//                     spellCheck="false"
//                     name="username"
//                     id="username"
//                     aria-describedby="Username"
//                     placeholder="UserName"
//                     onChange={formik.handleChange}
//                     onFocus={() => setError(false)}
//                     value={formik.values.username}
//                     maxLength={40}
//                     required={true}
//                     className={`form-control ${
//                       formik.errors.username ? "is-invalid" : ""
//                     }`}
//                     title={`${
//                       formik.errors.username ? "This field is required" : ""
//                     }`}
//                   />
//                   {formik.errors.username ? (
//                     <div className="error">{formik.errors.username}</div>
//                   ) : null}
//                 </div>
//                 <div className="form-group mb-4">
//                   <input
//                     autoComplete="new-password"
//                     autoCapitalize="off"
//                     autoCorrect="off"
//                     spellCheck="false"
//                     type={passwordType}
//                     className={`${
//                       formik.errors.password ? "is-invalid" : ""
//                     } form-control`}
//                     id="exampleInputPassword1"
//                     name="password"
//                     placeholder="Password"
//                     onChange={formik.handleChange}
//                     onFocus={() => setError(false)}
//                     value={formik.values.password}
//                     required={true}
//                     title={`${
//                       formik.errors.password ? "This field is required" : ""
//                     }`}
//                     maxLength={90}
//                   />
//                   {/* <button
//                     type="button"
//                     onClick={() => ToggleShowPassword()}
//                     className="btn btn-transparent bg-white btn-sm text-muted"
//                   >
//                     {passwordType === "password" ? (
//                       <AiOutlineEyeInvisible />
//                     ) : (
//                       <AiOutlineEye />
//                     )}
//                   </button> */}
//                   {formik.errors.password ? (
//                     <div className="error">{formik.errors.password}</div>
//                   ) : null}
//                 </div>
//                 <button
//                   name="login"
//                   id="login"
//                   className="btn btn-block login-btn mb-4"
//                   type="submit"
//                   value="Login"
//                   // onSubmit={formik.handleSubmit}
//                 >
//                   Login
//                 </button>
//                 {error ? (
//                   <span
//                     style={{ fontSize: "25px !important" }}
//                     className="text-light text-center form-error mx-2 px-2 py-2 bg-danger rounded-2"
//                   >
//                     User not found!
//                   </span>
//                 ) : null}
//               </form>
//             </div>
//             <div className="mt-3">
//               <Link to="#!" className="forgot-password-link">
//                 Forgot password?
//               </Link>
//               {/* <p className="login-card-footer-text">
//                 Don't have an account?{" "}
//                 <Link to="#!" className="text-reset">
//                   Register here
//                 </Link>
//               </p> */}
//             </div>
//             <nav className="login-card-footer-nav">
//               <Link to="#!">Terms of use.</Link>
//               <Link to="#!">Privacy policy</Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
/*   );
}/* ;
export default Login;
 */

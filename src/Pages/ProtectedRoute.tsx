import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // let accesstoken = { token: true };
  const accesstoken = window.sessionStorage.getItem("access");

  return accesstoken ? <Outlet /> : <Navigate to="/Login" replace />;
};

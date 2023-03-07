import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setRoleId,
  setName,
} from "../../../Redux/features/Security/ShowAllRolesSlice";
// later from api
const roles = [
  {
    role_id: 0,
    role_name: "Cole Sith",
  },
  {
    role_id: 1,
    role_name: "John Doe",
  },
];

const PermissionRoleTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: allRoles, status } = useSelector(
    (state) => state.ShowAllRolesSlice
  );

  const pickValueHandler = (id, name) => {
    // dispatch id and name of this customer to specificRole component
    dispatch(setRoleId(id));
    dispatch(setName(name.toUpperCase()));
    navigate("/edit-specificRole", { replace: true });
  };
  return (
    <table className="table table-light table-hover table-striped table table-bordered caption-top">
      <thead className="">
        <tr>
          <th>Role ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {allRoles.map((role, i) => (
          <tr key={i} onClick={() => pickValueHandler(role.id, role.name)}>
            <td>{role.id}</td>
            <td>{role.name}</td>
            <td>
              {role.deleted_at == null ? (
                <span style={{ color: "#26859C" }}>Active</span>
              ) : (
                <span>InActive</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PermissionRoleTable;

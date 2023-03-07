import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../Hooks/useFetch";
import { Getcustomers } from "../../Redux/features/UserManagement/UserProfile/CustomerAccessSlice";
import { fetCustomerNames } from "../../Redux/features/UserManagement/UserProfile/CustomerNamesSlice";
export default function CustomerAccessTable() {
  // use-fetch custom hook for fetching data
  const { data: customers, loading } = useFetch(
    "accountadmin/customermanagement"
  );
  // console.log("customers in table", customers);
  const dispatch = useDispatch();
  // const cutomers = useSelector((state)=>state.CustomerNamesSlice)
  // const { data: users, status } = useSelector((state) => state.GetUsers);
  // console.log("customers in cust", users);
  // const customers = [
  //   {
  //     customerid: "1",
  //     customername: "Test Customer 1",
  //     status: "Open",
  //   },
  //   {
  //     customerid: "2",
  //     customername: "Test Customer 2",
  //     status: "Open",
  //   },
  //   {
  //     customerid: "3",
  //     customername: "Test Customer 3",
  //     status: "Open",
  //   },
  // ];

  const [checkedItems, setCheckedItems] = useState(
    JSON.parse(localStorage.getItem("checkedItems") || "[]")
  );

  // console.log("Array of CheckedItems", [...checkedItems]);
  if (customers !== null && customers?.length > 1) {
    var isCheckAll = checkedItems?.length === customers?.length;
  }
  const [customerValue, setCustomerValue] = useState(sessionStorage.getItem("customer_id"));
  useEffect(() => {
    dispatch(fetCustomerNames());
    dispatch(Getcustomers([...checkedItems])); // Individually add access
    // localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const addChecked = (itemId) => {
    setCheckedItems([...checkedItems, { id: itemId }]);
  };

  const removeChecked = (itemId) => {
    const toBeRemove = checkedItems.find((item) => item.id === itemId);

    if (toBeRemove) {
      checkedItems.splice(checkedItems.indexOf(toBeRemove), 1);
      setCheckedItems([...checkedItems]);
      console.log("Removed CheckedItems", [...checkedItems]);
      dispatch(Getcustomers([...checkedItems])); // Individually remove access
    }
  };

  const getCheckedStatus = (itemId) => {
    const found = checkedItems.find((item) => item.id === itemId);
    return found !== undefined;
  };

  const handleSelectAll = (e) => {
    if (isCheckAll) {
      setCheckedItems([]);
      dispatch(Getcustomers([null])); // dispatch if CheckAll is unchecked
    } else {
      setCheckedItems([...customers]);
      dispatch(Getcustomers([...customers]));
    } // dispatch if CheckAll is checked

    // if(!isCheckAll){
    //   dispatch(Getcustomers([null]))
    // }
  };
  return (
    <div>
      <table className="table table-light table-hover table-striped table table-bordered">
        <thead>
          <tr>
            <th scope="col">Customer #</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">
              {" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  // onChange={handleSelectAll}
                  onChange={handleSelectAll}
                  checked={isCheckAll}
                />
                <label className="form-check-label" htmlFor="selectAll">
                  Access
                </label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {loading ? (
            <span>Loading</span>
          ) : (
            customers?.map((d) => {
              const defaultChecked = getCheckedStatus(d?.id);
              return (
                <tr key={d?.id}>
                  <th scope="row">{d?.id}</th>
                  <td>{d?.customer_name}</td>
                  <td>{d?.status}</td>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={d?.id == customerValue}
                      disabled={d?.id == customerValue}
                      onChange={(e) => {
                        if (e.target.checked) {
                          addChecked(d?.id);
                        } else {
                          removeChecked(d?.id);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

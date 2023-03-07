import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../../../../Hooks/useFetch";
import { Getcustomers } from "../../../../../Redux/features/UserManagement/UserProfile/CustomerAccessSlice";
export default function CustomerAccessEditTable() {
  const dispatch = useDispatch();
  const { data: customers, loading } = useFetch(
    "accountadmin/customermanagement"
  );
  console.log("customers in", customers);
  const [checkedItems, setCheckedItems] = useState(JSON.parse("[]"));

  // console.log("Array of CheckedItems", [...checkedItems]);
  if (customers !== null && customers?.length > 1) {
    var isCheckAll = checkedItems?.length === customers?.length;
  }

  useEffect(() => {
    // dispatch(fetCustomerNames())
    dispatch(Getcustomers([...checkedItems])); // Individually add access
    // localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const addChecked = (itemId, ItemStatus) => {
    const toBeRemove = checkedItems.find((item) => item.id === itemId);
    console.log("toberemover", toBeRemove);

    if (toBeRemove) {
      checkedItems.splice(checkedItems.indexOf(toBeRemove), 1);
      checkedItems.push({ id: toBeRemove.id, status: 1 });
    } else {
      checkedItems.push({ id: itemId, status: 1 });
    }
    setCheckedItems([...checkedItems]);
  };

  const removeChecked = (itemId, status) => {
    const toBeRemove = checkedItems.find((item) => item.id === itemId);

    if (toBeRemove) {
      checkedItems.splice(checkedItems.indexOf(toBeRemove), 1);

      checkedItems.push({ id: toBeRemove.id, status: 0 });
      setCheckedItems([...checkedItems]);
      console.log("Removed CheckedItems", [...checkedItems]);
      dispatch(Getcustomers([...checkedItems, { status }])); // Individually remove access
    }
  };

  const getCheckedStatus = (itemId) => {
    const found = checkedItems?.find(
      (item) => item?.id === itemId && item?.status == 1
    );
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

    if (!isCheckAll) {
      dispatch(Getcustomers([null]));
    }
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
                  onChange={handleSelectAll}
                  //   onChange={handleSelectAll}
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
                      checked={defaultChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          addChecked(d?.id, 1);
                        } else {
                          removeChecked(d?.id, 0);
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

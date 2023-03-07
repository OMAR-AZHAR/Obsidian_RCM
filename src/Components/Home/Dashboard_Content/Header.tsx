import useFetch from "../../../Hooks/useFetch";

export default function Header() {
  const { data: customers, loading: load_customers } = useFetch(
    "accountadmin/customermanagement"
  );

  return (
    <div>
      <div className="col-md-12 mt-md-0 mt-5">
        <h3 className="mt-md-3 mt-5">
          Welcome to Obsidian,{" "}
          {sessionStorage.getItem("firstname")?.toString().toUpperCase()}!
          {/* <p>All is Well that ends well</p> */}
        </h3>
      </div>

      <div className="d-flex flex-row mb-2 mt-md-0 mt-5 px-0 mx-0">
        <div className="p-1">
          <br />
          <button className="btn btn-outline-primary btn-sm ">
            <i className="fas fa-edit"></i> Edit the Welcome Dashboard
          </button>
        </div>
        <div className="p-1">
          <label>Customer(s)</label>
          <select
            className="form-select form-select-sm"
            defaultValue={sessionStorage.getItem("customername")?.toString()}
            aria-label="Customers"
          >
            {load_customers
              ? "Loading..."
              : customers?.map((cust, i) => {
                  return (
                    <option
                      title={cust?.customer_name}
                      style={{ cursor: "pointer" }}
                      value={cust?.customer_name}
                      key={i}
                      {...cust}
                    >
                      {cust?.customer_name?.substring(0, 20) + "..."}
                    </option>
                  );
                })}
          </select>
        </div>
        <div className="p-1">
          <br />
          <button className="btn btn-outline-primary btn-sm px-2 mx-2">
            <i className="fas fa-sync px-2"></i>Refresh{" "}
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

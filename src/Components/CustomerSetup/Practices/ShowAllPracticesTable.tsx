import useFetch from "../../../Hooks/useFetch";
import { useDispatch } from "react-redux";
import { getPracticeIdfromTable } from "../../../Redux/features/Practice/EditablePracticeSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router";
export default function ShowAllPracticesTable(props: {
  searchshowallpractices: any;
  inactiveChecked: any;
  search: string;
  ToEditable: (arg0: any) => void;
}) {
  // const { data: showallpractices, loading: loadpractices } = useFetch(
  //   "customersetup/practice"
  // );
  const showallpractices = [
    {
      name: "",
      common_address: "",
      sequence: "",
      npi: {
        npi_code: "21221",
      },
    },
  ];
  // ======= Variables from te parent component =======
  const search = props.searchshowallpractices;
  const Checked = props.inactiveChecked;
  // ======= To Editable Form =======
  const navigate = useNavigate();
  const ToEditable = useCallback(
    // Goto User Editable form
    (id: any) => {
      navigate(`/EditablePractice/${id}`, { replace: true });
    },
    [navigate]
  );
  const dispatch = useDispatch();

  return (
    <div className="table-responsive" style={{ height: "300px" }}>
      <table className="table table-light table-hover table-striped table table-bordered caption-top table-responsive">
        <thead className="">
          <tr>
            <th>Name</th>
            {Checked ? <th>Inactive</th> : ""}
            <th>Address</th>
            <th>Reference #</th>
            <th>NPI</th>
          </tr>
        </thead>
        <tbody>
          {showallpractices
            // Search Practices
            ?.filter((items) => {
              return props.search === ""
                ? items
                : items?.name?.toLowerCase().includes(search?.toLowerCase()) ||
                    // items?.common_address?.address
                    //   ?.toLowerCase()
                    //   .includes(search?.toLowerCase()) ||
                    // items?.sequence?.id?.toString().includes(search) ||
                    items?.npi?.npi_code?.toString().includes(search);
            })
            // Display Practices
            ?.map((showall, i) => {
              return (
                <tr
                  {...showall}
                  className="table-active facility-font"
                  key={i}
                  // onClick={() => {
                  //   dispatch(getPracticeIdfromTable(showall?.id));
                  //   ToEditable(showall?.id);

                  //   window.location.reload();
                  // }}
                >
                  {/* <td>{showall?.name}</td>
                  {Checked ? <td>{showall?.Inactive}</td> : ""}
                  <td>{showall?.common_address?.address}</td>
                  <td>{showall?.sequence?.id}</td>
                  <td>{showall?.npi?.npi_code}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

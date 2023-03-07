import { useCallback } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../../Hooks/useFetch";
import { getFacilityIdfromTable } from "../../../Redux/features/FacilityStates/EditableFacility";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

export default function FacilityTable(props: {
  searchfacility: string;
  ShowInactive: boolean;
}) {
  // const [facility, setfacility] = useState();
  // console.log(facility);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ToEditable = useCallback(
    // Goto User Editable form
    (id: any) => {
      navigate(`/newfacility/${id}`, { replace: true });
    },
    [navigate]
  );
  const search = props.searchfacility;

  const { data: facility, loading: loadfacilitydata } = useFetch(
    "customersetup/facility"
  );

  // const facility = [
  //   {
  //     id: 1,
  //     facility_name: "New Facility",
  //     Address: "67 PUBLIC SQUARE",
  //     Seq: "10028750",
  //     NPI: "1730573452",
  //     Inactive: true,
  //   },
  // ];

  return (
    <>
      <div className="table-responsive">
        {facility ? (
          <table className="mb-0 table table-light table-sm table-hover table-striped table table-bordered caption-top">
            <thead className="">
              <tr>
                <th>Facility Name</th>
                <th>Address</th>
                <th>Seq #</th>
                <th>NPI</th>
                <th>Inactive</th>
              </tr>
            </thead>
            <tbody>
              {facility
                // ?.filter((i) => {
                //   return i?.facility_status === 0 ? i : i;
                // })
                ?.filter((item) => {
                  return search === ""
                    ? item
                    : item?.facility_name
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase()) ||
                        item?.address1
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        item?.sequence?.id?.toString()?.includes(search) ||
                        item?.npi_code?.toString()?.includes(search);
                })

                ?.map((faclty, i) => {
                  return faclty?.facility_status ? (
                    <tr
                      className="table-active facility-font"
                      key={i}
                      onClick={() => {
                        dispatch(getFacilityIdfromTable(faclty?.id));
                        ToEditable(faclty?.id);
                        // window.location.reload();
                      }}
                    >
                      <td>{faclty?.facility_name}</td>
                      <td>{faclty?.address1}</td>
                      <td>{faclty?.sequence?.id}</td>
                      <td>{faclty?.npi_code}</td>

                      {/* {props.ShowInactive ? ( */}
                      <td className="text-center">
                        {faclty?.facility_status === 0 ? (
                          <FaCheckCircle
                            style={{
                              color: "black",
                              // textShadow: "1px 1px 1px #ccc",
                              fontSize: "1.2em",
                              // marginLeft: "-3px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      {/* ) : (
                         ""
                       )} */}
                    </tr>
                  ) : faclty?.facility_status ===
                    Number(!props.ShowInactive) ? (
                    <tr
                      className="table-active facility-font"
                      key={i}
                      onClick={() => {
                        dispatch(getFacilityIdfromTable(faclty?.id));
                        ToEditable(faclty?.id);
                      }}
                    >
                      <td>{faclty?.facility_name}</td>
                      <td>{faclty?.address1}</td>
                      <td>{faclty?.sequence?.id}</td>
                      <td>{faclty?.npi_code}</td>

                      {/* {props.ShowInactive ? ( */}
                      <td className="text-center">
                        {faclty?.facility_status === 0 ? (
                          <FaCheckCircle
                            style={{
                              color: "black",
                              // textShadow: "1px 1px 1px #ccc",
                              fontSize: "1.2em",
                              // marginLeft: "-3px",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      {/* ) : (
                        ""
                      )} */}
                    </tr>
                  ) : (
                    ""
                  );
                })}
            </tbody>
          </table>
        ) : (
          <span className="text-center text-dark fw-bold">
            No Recent Facility
          </span>
        )}
      </div>
    </>
  );
}

import { useDispatch } from "react-redux";
import { getPracticeIdfromTable } from "../../../Redux/features/Practice/EditablePracticeSlice";
import useFetch from "../../../Hooks/useFetch";
import { FaCheckCircle } from "react-icons/fa";

export default function PracticeTable(props: {
  search: string;
  ToEditable: (arg0: any) => void;
  ShowInactive: boolean;
}) {
  const { data: practice, loading: loadingpract } = useFetch(
    "customersetup/practice"
  );

  const searchpract = props.search;
  const dispatch = useDispatch();
  return (
    <>
      {loadingpract ? (
        <span className="text-center text-dark fw-bold">Loading...</span>
      ) : practice ? (
        <div className="table-responsive">
          <table className="mb-0 table table-light table-sm table-hover table-striped table table-bordered">
            <thead>
              <tr>
                <th>Practice Name</th>
                <th>Address</th>
                <th>Seq #</th>
                <th>NPI</th>
                <th>Inactive</th>
              </tr>
            </thead>

            <tbody>
              {practice
                ?.filter((practices) => {
                  return searchpract === ""
                    ? practices
                    : practices?.name
                        .toLowerCase()
                        .includes(searchpract?.toLowerCase()) ||
                        practices?.address1
                          ?.toLowerCase()
                          .includes(searchpract?.toLowerCase()) ||
                        practices?.sequence?.id
                          ?.toString()
                          .includes(searchpract) ||
                        practices?.npi_code?.toString().includes(searchpract);
                })
                ?.map((pract, i) => {
                  return pract?.practice_status ? (
                    <tr
                      {...pract}
                      className="table-active practice-font"
                      key={i}
                      onClick={() => {
                        dispatch(getPracticeIdfromTable(pract?.id));
                        props.ToEditable(pract?.id);
                        window.location.reload();
                      }}
                    >
                      <td>{pract?.name}</td>
                      <td>{pract?.address1}</td>
                      <td>{pract?.sequence?.id}</td>
                      <td>{pract?.npi_code}</td>

                      <td className="text-center">
                        {pract?.practice_status === 0 ? (
                          <FaCheckCircle
                            style={{
                              color: "black",

                              fontSize: "1.2em",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ) : pract?.practice_status === Number(!props.ShowInactive) ? (
                    <tr
                      {...pract}
                      className="table-active practice-font"
                      key={i}
                      onClick={() => {
                        dispatch(getPracticeIdfromTable(pract?.id));
                        props.ToEditable(pract?.id);
                        window.location.reload();
                      }}
                    >
                      <td>{pract?.name}</td>
                      <td>{pract?.address1}</td>
                      <td>{pract?.sequence?.id}</td>
                      <td>{pract?.npi_code}</td>
                      {/* {props.ShowInactive ? ( */}
                      <td className="text-center">
                        {pract?.practice_status === 0 ? (
                          <FaCheckCircle
                            style={{
                              color: "black",

                              fontSize: "1.2em",
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
        </div>
      ) : (
        <div className="text-center text-dark">No Recent Customers</div>
      )}
    </>
  );
}

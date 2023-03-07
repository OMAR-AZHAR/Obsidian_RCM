import useGet from "../../../Hooks/useGet";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
export default function Configuration() {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("appointment/manage/waiting/list")
    .then(function (response) {
     
    })
    .catch(function (error) {
      if (error.response.data.data == 403) {
        Swal.fire({
          icon: 'error',
          imageHeight:30,
          imageWidth:30,
          title: 'Sorry...',
          text: 'Please contact your administrator to get Permissions!',
          confirmButtonColor: '#08619b',
        })
        navigate(-1)
      }
      
    });
  }, [])
  // const [data, setData] = useState("");
  const { data: npidata } = useGet("customersetup/practice/searchnpi?state=MN");

  return (
    <div className="mt-4">
      <h1>NPI</h1>
      <table className="table table-light table-hover table-striped table table-bordered ">
        <thead>
          <tr>
            <th>Name</th>
            <th>NPI</th>
            <th>PracticeType</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {npidata?.[3]?.map((pract, i) => {
            return (
              <tr {...pract} className="table-active practice-font" key={i}>
                <td>{pract?.[0]}</td>
                <td>{pract?.[1]}</td>
                <td>{pract?.[2]}</td>
                <td>{pract?.[3]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

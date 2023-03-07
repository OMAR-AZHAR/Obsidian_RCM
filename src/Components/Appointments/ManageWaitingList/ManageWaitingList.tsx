import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const ManageWaitingList = () => {
  const navigate = useNavigate();
   

useEffect(() => {
  let user = JSON.parse(sessionStorage.getItem("access")!);
  let customerID = JSON.parse(sessionStorage.getItem("customer_id")!)
  API.get("appointment/manage/waiting/list", {
    headers: {
      Authorization: `Bearer ${user}`,
      customer_id: customerID
    },
  })
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

  // const checkPermissions = async () => {
  //   const response = await API.get("appointment/manage/waiting/list");
  //   if(response){
  //     console.log("permission check ",response);
      
  //   }
  // }
  // checkPermissions();
}, [])
  return (
    <div className="my-5 mx-2">
      <h1>ManageWaitingList</h1>
    </div>
  );
};
export default ManageWaitingList;

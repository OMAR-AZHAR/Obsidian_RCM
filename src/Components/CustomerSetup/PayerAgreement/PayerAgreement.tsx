import { useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../../../Api/ClientApi";
import Swal from "../../../GLOBAL/SwalAlert";
const PayerAgreement = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("customersetup/payeragreement")
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
  return (
    <div className="my-5 mx-2">
      <h1>PayerAgreement</h1>
    </div>
  );
};
export default PayerAgreement;

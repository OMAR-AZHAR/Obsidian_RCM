import React, { useEffect } from 'react';
import Swal from '../../../GLOBAL/SwalAlert';
import API from '../../../Api/ClientApi';
import { useNavigate } from 'react-router';

const PaymentaPlans = () => {
  const navigate = useNavigate();
  useEffect(() => {
    API.get("patient/payment/plan")
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
    <div className="col-xs-3 mt-2">
      <h4>Payment plans</h4>
    </div>
  );
};

export default PaymentaPlans;

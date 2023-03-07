import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import API from "../Api/ClientApi";
import Swal from "../GLOBAL/SwalAlert";
// useEffect(() => {
//     API.get("appointment/schedular")
//     .then(function (response) {
     
//     })
//     .catch(function (error) {
//       if (error.response.data.data == 403) {
//         Swal.fire({
//           icon: 'error',
//           imageHeight:30,
//           imageWidth:30,
//           title: 'Sorry...',
//           text: 'Please contact your administrator to get Permissions!',
//           confirmButtonColor: '#08619b',
//         })
//       }
     
//     });
//   }, [])

export default function RootBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
          return <div>This page doesn't exist!</div>;
        }
    
        if (error.data.data === 403) {
          return <div>You aren't authorized to see this</div>;
        }
    
        if (error.status === 503) {
          return <div>Looks like our API is down</div>;
        }
    
        if (error.status === 418) {
          return <div>🫖</div>;
        }
      }
    
      return <div>Something went wrong</div>;
}
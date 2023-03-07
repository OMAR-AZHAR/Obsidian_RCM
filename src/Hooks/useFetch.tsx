import { useEffect, useState } from "react";

import API from "../Api/ClientApi";
// import axios from "axios";
/* ********** The difference btw useFetch and useGet is only the fact that useFetch uses
(response.data.data) while useGet uses (response.data); depending on distinct instances *********
*/
export default function useFetch(url: string) {
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    ApiFetch();
  }, [`https://api.simplextechsolution.com/api/${url}`]);

  const refetch = () => {
    // to trigger API refresh onAction
    ApiFetch();
  };
  function ApiFetch() {
    let user = JSON.parse(sessionStorage.getItem("access")!);
    let customerID = JSON.parse(sessionStorage.getItem("customer_id")!);
    setLoading(true);
    API.get(url, {
      headers: {
        Authorization: `Bearer ${user}`,
        customer_id: customerID,
      },
    })
      .then((response) => {
        if (response?.data) {
          setData(response?.data?.data);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return { data, loading, error, refetch };
}

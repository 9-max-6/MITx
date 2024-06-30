import React, { useEffect, useState } from "react";
import axios from "axios";

function Opportunities() {
  const [opps, setopps] = useState();
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/opps/", {
        withCredentials: true,
      });
      setopps(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloaded(true);
    }
  };

  return (
    <>
      {loaded ? (
        <div>Opportunities: {JSON.stringify(opps)}</div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Opportunities;

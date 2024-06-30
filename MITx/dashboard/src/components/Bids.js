import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Bids() {
  const [bidsloaded, setbidsloaded] = useState(false);
  const [bids, setbids] = useState(null);

  const getBids = async (e) => {
    await axios
      .get("http://127.0.0.1:8000/api/bids/", {
        withCredentials: true,
      })
      .then((response) => {
        setbids(response.data);
        setbidsloaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBids();
  }, []);
  return (
    <>{bidsloaded ? <div> {JSON.stringify(bids)} </div> : <div>Loading</div>}</>
  );
}

export default Bids;

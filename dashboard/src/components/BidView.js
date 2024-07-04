import { React, useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import DashboardBids from "./DashboardBids";
import { TrackContext } from "./TrackContext/TrackContext";

function BidView() {
  const [bidsloaded, setbidsloaded] = useState(false);
  const [bids, setbids] = useState(null);
  const { tracking } = useContext(TrackContext);

  const getBids = async (e) => {
    await axios
      .get("https://mitx.mutukumaxwell.tech/api/bids/", {
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
    setTimeout(() => {
      getBids();
    });
  }, [tracking]);

  return (
    <>
      {bidsloaded ? (
        <Box className="grid-loaded" height="100%" width="100%">
          <DashboardBids bids={bids} />
        </Box>
      ) : (
        <Box className="quantum-loader">
          <l-newtons-cradle
            size="45"
            speed="1.75"
            color="#4f94e2"
          ></l-newtons-cradle>
        </Box>
      )}
    </>
  );
}

export default BidView;

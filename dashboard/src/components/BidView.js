import { React, useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
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
        if (error.code === "ERR_BAD_REQUEST") {
          setisAuthenticated(false);
          localStorage.clear();
          navigate("/login");
        }
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
        <Box className="grid-loaded container" position="relative">
          <DashboardBids bids={bids} />
        </Box>
      ) : (
        <Box
          className="quantum-loader, flex"
          height="100vh"
          sx={{
            alignItems: "center",
          }}
        >
          <l-newtons-cradle
            size="100"
            speed="1.75"
            color="#6c63ff"
          ></l-newtons-cradle>
        </Box>
      )}
    </>
  );
}

export default BidView;

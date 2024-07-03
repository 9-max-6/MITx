import { Box, Typography } from "@mui/material";
import "./dashboard.css";
import { AuthContext } from "./Auth/AuthContext";
import { TrackContext } from "./TrackContext/TrackContext";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import axios from "axios";
import { newtonsCradle } from "ldrs";
import OpportunityView from "./OpportunityView";
import BidView from "./BidView";

function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const [userloaded, setuserloaded] = useState(false);
  const [opps, setopps] = useState(null);
  const [opportunitiesloaded, setopportunitiesloaded] = useState(false);
  const { username } = useContext(AuthContext);
  newtonsCradle.register();

  const getHot = async (e) => {
    await axios
      .get("http://127.0.0.1:8000/api/opps/hot/", {
        withCredentials: true,
      })
      .then((response) => {
        setopps(response.data);
        setopportunitiesloaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      getHot();
    }, 1000);
  }, []);

  useEffect(() => {
    setuserloaded(true);
  }, [username, opps]);

  const { tracking, setTracking } = useContext(TrackContext);

  return (
    <>
      {isAuthenticated && userloaded ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="12px"
        >
          <Box
            className="dashboardGridUser"
            gridColumn="span 5"
            gridRow="span 2"
            display="flex"
            position="relative"
          >
            {userloaded && (
              <Box>
                <Box className="stats">
                  <Box className="box">
                    <CheckCircleOutlineOutlinedIcon />
                    <Typography>Won: 2</Typography>
                  </Box>
                  <Box className="box">
                    <StickyNote2OutlinedIcon />
                    <Typography>Tracking: 10</Typography>
                  </Box>
                </Box>
                <Box className="avatar"></Box>
                <Box className="user-content">
                  <Typography>
                    Hi <br /> <span>{username}</span>
                  </Typography>
                  <Typography>
                    I hope you are ready to get to work. I have prepared 10 new
                    opportunities for you. Check them out to the right or click{" "}
                    <Link className="link" to="/opps">
                      here
                    </Link>{" "}
                    to visit the opportunities page.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box className="dashboardGrid" gridColumn="span 7" gridRow="span 5">
            {opportunitiesloaded ? (
              <Box className="grid-loaded">
                <OpportunityView opportunities={opps} />
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
          </Box>
          <Box
            className="dashboardGridUser"
            gridColumn="span 5"
            gridRow="span 3"
          >
            {/* {bidsloaded ? (
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
            )} */}
            <BidView />
          </Box>
        </Box>
      ) : (
        <div>Redirecting to login page</div>
      )}
    </>
  );
}

export default Dashboard;

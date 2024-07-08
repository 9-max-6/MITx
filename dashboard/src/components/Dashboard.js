import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chart from "chart.js/auto";
import axios from "axios";
import { AuthContext } from "./Auth/AuthContext";
import { TrackContext } from "./TrackContext/TrackContext";
import { newtonsCradle } from "ldrs";
import { CategoryScale } from "chart.js";
import HotOpportunityView from "./HotOpportunityView";
import LineChart from "./utils/LineChart";
import { BarChart } from "./utils/BarChart";
import "./styles/dashboard.css";

Chart.register(CategoryScale);

function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const [userloaded, setuserloaded] = useState(false);
  const [opps, setopps] = useState(null);
  const [opportunitiesloaded, setopportunitiesloaded] = useState(false);
  const { username } = useContext(AuthContext);

  newtonsCradle.register();

  const theme = useTheme();

  const getHot = async (e) => {
    await axios
      .get("https://mitx.mutukumaxwell.tech/api/opps/hot/", {
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
    });
  }, []);

  useEffect(() => {
    setuserloaded(true);
  }, [username, opps]);

  const { tracking, setTracking } = useContext(TrackContext);

  return (
    <>
      {isAuthenticated && userloaded ? (
        <Box
          display="flex"
          justifyContent="center"
          borderRadius="16px"
          padding="36px"
          gap="12px"
          position="relative"
          sx={{
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              width: "40%",
            }}
          >
            <Box
              display="flex"
              position="relative"
              border="1px solid #ccc"
              borderRadius="8px"
              sx={{
                padding: "48px",
              }}
            >
              {userloaded && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={{}} className="avatar image"></Box>
                  <Box className="user-content">
                    <Typography>
                      Hi <br /> <span>{username}</span>
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Lexend, sans-serif",
                      }}
                      variant="body1"
                    >
                      I hope you are ready to get to work. I have prepared 10
                      new opportunities for you. Check them out to the right or
                      click{" "}
                      <Link className="link" to="/opps">
                        <span>here</span>
                      </Link>{" "}
                      to visit the opportunities page.
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              sx={{
                width: "100%",
                padding: "36px",
                boxSizing: "border-box",
                marginY: "12px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#6c63ff",
                  textTransform: "uppercase",
                }}
              >
                News
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Check here for any news updates</Typography>
                <Box className="news"></Box>
              </Box>
            </Box>
            <Box
              backgroundColor="#dde2ff"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              sx={{
                width: "100%",
                textAlign: "center",
                padding: "12px",
                boxSizing: "border-box",
                marginBottom: "12px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "#6c63ff",
                  textTransform: "uppercase",
                }}
              >
                Statistics
              </Typography>
            </Box>
            <Box
              border="1px solid #ccc"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              minHeight="400px"
              sx={{
                width: "100%",
                textAlign: "center",
                padding: "36px",
                boxSizing: "border-box",
                marginY: "12px",
                "&:hover": {
                  backgroundColor: "#dde2ff",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <Box
                sx={{
                  height: "300px",
                  width: "100%",
                }}
              >
                <BarChart />
              </Box>
            </Box>
            <Box
              border="1px solid #ccc"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              sx={{
                width: "100%",
                textAlign: "center",
                padding: "36px",
                boxSizing: "border-box",
                marginY: "48px",
                "&:hover": {
                  backgroundColor: "#dde2ff",
                  transition: "0.3s ease-in-out",
                },
              }}
            >
              <Box
                sx={{
                  height: "300px",
                  width: "100%",
                  my: "48px",
                }}
              >
                <LineChart />
              </Box>
            </Box>
          </Box>

          <Box className="dashboardGrid" sx={{ width: "60%" }}>
            {opportunitiesloaded ? (
              <Box
                className="grid-loaded"
                sx={{
                  boxSizing: "border-box",
                }}
              >
                <HotOpportunityView opportunities={opps} />
              </Box>
            ) : (
              <Box
                className="quantum-loader"
                sx={{
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <l-newtons-cradle
                  size="45"
                  speed="1.75"
                  color="#4f94e2"
                ></l-newtons-cradle>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <>
          {isAuthenticated ? <div></div> : <div>Redirecting to login page</div>}
        </>
      )}
    </>
  );
}

export default Dashboard;

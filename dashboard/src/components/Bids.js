import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { SingleBidViewDetailed } from "./SingleBidView";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { newtonsCradle } from "ldrs";
import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";
import "./styles/bids.css";

function Bids() {
  const [bidsloaded, setbidsloaded] = useState(false);
  const [bids, setbids] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  newtonsCradle.register();
  const { setisAuthenticated } = useContext(AuthContext);

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
        if (error.status === "403") {
          setisAuthenticated(false);
          localStorage.clear();
          navigate("/login");
        }
        console.log(error);
      });
  };
  useEffect(() => {
    getBids();
  }, []);

  if (bidsloaded) {
    return (
      <>
        {bids.length ? (
          <Box
            sx={{
              width: "70%",
              marginTop: "36px",
              marginX: "auto",
            }}
          >
            <>
              <Card
                sx={{
                  backgroundColor: "inherit",
                }}
                elevation={0}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <Box
                    className="logo"
                    sx={{
                      flexShrink: "0",
                    }}
                  ></Box>

                  <Box
                    sx={{
                      textAlign: "center",
                      mx: "72px",
                    }}
                  >
                    <Typography>
                      Find the opportunities that you have tagged for a closer
                      look and see who else in your team is working on the same
                      opportunities as you.
                    </Typography>
                    <Typography>
                      Very soon, you will be able to expand the opportunities to
                      see the references that have been attached and the team
                      members that worked on projects that are similar to the
                      ones you're viewing.
                    </Typography>
                  </Box>
                  <Box className="team"></Box>
                </CardContent>
              </Card>
              {bids.map((opp, index) => (
                <SingleBidViewDetailed
                  key={index}
                  title={opp.title}
                  deadline={opp.deadline}
                  page={opp.page}
                  country={opp.country}
                  link={opp.website_link}
                  website_name={opp.website_name}
                />
              ))}
            </>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              className="missing image"
              sx={{
                height: "400px",
                backgroundSize: "contain",
                width: "400px",
                marginTop: "72px",
              }}
            ></Box>
            <Box className="missing-content">
              <Typography>There is nothing here</Typography>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <Typography>
                To add bids, go to the <Link to="/opps">opportunities</Link>{" "}
                page and click on the track button under any opportunity
              </Typography>
            </Box>
          </Box>
        )}
      </>
    );
  } else {
    return (
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
    );
  }
}

export default Bids;

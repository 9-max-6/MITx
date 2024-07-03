import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { SingleBidViewDetailed } from "./SingleBidView";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Bids() {
  const [bidsloaded, setbidsloaded] = useState(false);
  const [bidscount, setbidscount] = useState(false);
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

  if (bidsloaded) {
    return (
      <>
        {bids.length ? (
          <div>
            <>
              {bids.map((opp, index) => (
                <SingleBidViewDetailed
                  key={index}
                  title={opp.title}
                  deadline={opp.deadline}
                  page={opp.page}
                  country={opp.country}
                  link={opp.link}
                  website_name={opp.website_name}
                />
              ))}
            </>
          </div>
        ) : (
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap="12px"
            position="relative"
          >
            <Box className="missing"></Box>
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
    return <div>Loading</div>;
  }
}

export default Bids;

import { Box, Typography } from "@mui/material";
import React from "react";
import "./dashboard.css";
import { SingleBidView } from "./SingleBidView";

function DashboardBids(bids) {
  console.log(bids.bids);
  if (bids.bids.length === 0) {
    return (
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
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
          }}
        >
          <Typography>
            To add bids, go to the opportunities page and click on the track
            button under any opportunity
          </Typography>
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        {bids.bids.map((opp, index) => (
          <SingleBidView
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
    );
  }
}

export default DashboardBids;

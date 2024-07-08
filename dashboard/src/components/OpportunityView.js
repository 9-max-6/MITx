import { Typography } from "@mui/material";
import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import {
  MinimalOpportunityView,
  DetailedOpportunityView,
} from "./SingleOpportunityView";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OpportunityView = ({ opportunities }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginTop: "36px",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          gap: "12px",
        }}
      >
        {" "}
        {opportunities.length > 0 ? (
          <>
            {opportunities.map((opp, index) => (
              <DetailedOpportunityView
                key={index}
                users={opp.users}
                pk={opp.id}
                title={opp.title}
                deadline={opp.deadline}
                page={opp.page}
                date_created={opp.date_created}
                country={opp.country}
                link={opp.website_link}
                website_name={opp.website_name}
              />
            ))}
          </>
        ) : (
          <Box
            sx={{
              height: "90vh",
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              className="missing"
              sx={{
                height: "400px",
                width: "400px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></Box>
            <Box>
              <Typography>There is nothing here</Typography>
              <Typography>
                Try resetting the filters by clicking on the button to the right
                of your screen or try a different set of filters.
              </Typography>
              <ArrowForwardIcon
                sx={{
                  color: "#F50057",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OpportunityView;

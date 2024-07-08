import { Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import {
  MinimalOpportunityView,
  SingleOpportunityView,
} from "./SingleOpportunityView";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";

const HotOpportunityView = ({ opportunities }) => {
  const [filteropen, setfilteropen] = useState(false);

  return (
    <Box className="flex_2" sx={{}}>
      {opportunities.map((opp, index) => (
        <MinimalOpportunityView
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
    </Box>
  );
};

export default HotOpportunityView;

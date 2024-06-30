import { Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import {
  MinimalOpportunityView,
  SingleOpportunityView,
} from "./SingleOpportunityView";

const OpportunityView = ({ opportunities }) => {
  return (
    <div>
      {opportunities.map((opp, index) => (
        <MinimalOpportunityView
          key={opp.id}
          title={opp.title}
          deadline={opp.deadline}
          page={opp.page}
          date_created={opp.date_created}
          country={opp.country}
          link={opp.link}
          website_name={opp.website_name}
        />
      ))}
    </div>
  );
};

export default OpportunityView;

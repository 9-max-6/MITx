import React from "react";
import { Typography, Box } from "@mui/material";

const SingleOpportunityView = ({
  title,
  deadline,
  page,
  date_created,
  country,
  link,
  website_name,
}) => {
  return (
    <Box sx={{ margin: "20px", border: "1px solid #ccc", padding: "20px" }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">Deadline: {deadline}</Typography>
      <Typography variant="body2">Country: {country}</Typography>
      <Typography variant="body2">Page: {JSON.stringify(page)}</Typography>
      <Typography variant="body2">Website: {website_name}</Typography>
      <Typography
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Info
      </Typography>
    </Box>
  );
};
const MinimalOpportunityView = ({
  title,
  deadline,
  page,
  date_created,
  country,
  link,
  website_name,
}) => {
  return (
    <Box sx={{ margin: "20px", border: "1px solid #ccc", padding: "20px" }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">Deadline: {deadline}</Typography>
      <Typography variant="body2">Country: {country}</Typography>
      <Typography variant="body2">Website: {website_name}</Typography>
      <Typography variant="body2">Summary</Typography>
      <Typography variant="body2">{page.summary}</Typography>
      <Typography
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Info
      </Typography>
    </Box>
  );
};
export { SingleOpportunityView, MinimalOpportunityView };

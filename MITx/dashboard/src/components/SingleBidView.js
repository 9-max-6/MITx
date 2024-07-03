import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
const SingleBidView = ({ title, deadline, page, country, link }) => {
  return (
    <Card
      sx={{
        border: "1px solid #2a487e",
        backgroundColor: "inherit",
        mb: "12px",
      }}
    >
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">Deadline: {deadline}</Typography>
        <Typography variant="body2">Country: {country}</Typography>
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
      </CardContent>
    </Card>
  );
};

const SingleBidViewDetailed = ({ title, deadline, page, country, link }) => {
  return (
    <Card
      sx={{
        border: "1px solid #2a487e",
        backgroundColor: "inherit",
        mb: "12px",
        width: "70%",
        marginY: "12px",
        marginX: "auto",
      }}
    >
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">Deadline: {deadline}</Typography>
        <Typography variant="body2">Country: {country}</Typography>
        <Typography variant="body2">Summary</Typography>
        <Typography variant="body2">{page.summary}</Typography>
        <Typography variant="body2">{page.main}</Typography>
        <Typography
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </Typography>
      </CardContent>
    </Card>
  );
};

export { SingleBidView, SingleBidViewDetailed };

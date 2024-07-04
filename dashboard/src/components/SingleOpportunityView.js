import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./Auth/AuthContext";
import { Typography, Box, Button } from "@mui/material";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import { TrackContext } from "./TrackContext/TrackContext";

function isTracked(users, userid) {
  return users.includes(Number(userid));
}

function trackOpp(pk, onSuccess) {
  axios
    .post("https://mitx.mutukumaxwell.tech/api/bids/", { pk }, { withCredentials: true })
    .then((response) => {
      console.log(response);
      onSuccess();
    })
    .catch((error) => console.error(error));
}

function untrackOpp(pk, onSuccess) {
  axios
    .delete("https://mitx.mutukumaxwell.tech/api/bids/", {
      data: { pk },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      onSuccess();
    })
    .catch((error) => console.error(error));
}

const MinimalOpportunityView = ({
  title,
  deadline,
  page,
  country,
  link,
  website_name,
  pk,
  users,
}) => {
  const { userid } = useContext(AuthContext);
  const { tracking, setTracking } = useContext(TrackContext);
  const [tracked, setTracked] = useState(isTracked(users, userid));

  return (
    <Box
      className="opportunity-box"
      sx={{ margin: "20px", border: "1px solid #ccc", p: "20px" }}
    >
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
      <Box position="relative" height="36px" boxSizing="content-box">
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            gap: "12px",
            top: "0px",
            right: "0px",
            color: "white",
          }}
        >
          {tracked ? (
            <Button
              onClick={() =>
                untrackOpp(pk, () => {
                  setTracked(false);
                  setTracking(!tracking);
                })
              }
              sx={{
                backgroundColor: "#1d2c4c",
                color: "white",
                "&:hover": { backgroundColor: "#4f94e2", color: "black" },
              }}
            >
              Untrack
            </Button>
          ) : (
            <Button
              onClick={() =>
                trackOpp(pk, () => {
                  setTracked(true);
                  setTracking(!tracking);
                })
              }
              sx={{
                backgroundColor: "#1d2c4c",
                color: "white",
                "&:hover": { backgroundColor: "#4f94e2", color: "black" },
              }}
            >
              Track
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export { MinimalOpportunityView };

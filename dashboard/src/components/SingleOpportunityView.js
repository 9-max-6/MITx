import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./Auth/AuthContext";
import { Typography, Box, Button } from "@mui/material";
import { TrackContext } from "./TrackContext/TrackContext";
import { useTheme } from "@mui/material";

function isTracked(users, userid) {
  return users.includes(Number(userid));
}

function trackOpp(pk, onSuccess) {
  axios
    .post(
      "https://mitx.mutukumaxwell.tech/api/bids/",
      { pk },
      { withCredentials: true }
    )
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
  const [expired, setexpired] = useState(false);

  const theme = useTheme();

  const deadlineCalculator = () => {
    const the_deadline = new Date(deadline);
    const now = new Date();
    const daysRemanining = deadline - now;
    if (daysRemanining < 1) {
      setexpired(true);
    }
    return daysRemanining;
  };

  return (
    <Box
      className="opportunity-box"
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "24px",
        marginRight: "24px",
        marginLeft: "24px",
        position: "relative",
        transition: "0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#dde2ff",
        },
      }}
    >
      <Box
        sx={{
          p: "12px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#1f1650",
            textTransform: "uppercase",
          }}
          variant="h6"
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginY: "12px",
        }}
      >
        <blockquote>
          <Typography
            sx={{
              color: "#6c63ff",
              fontWeight: "600",
            }}
            variant="h6"
          >
            Summary
          </Typography>

          <Typography sx={{}} variant="body1">
            {page.main}
          </Typography>
        </blockquote>
      </Box>

      <Box sx={{}}>
        <blockquote>
          <Typography variant="body1">
            {" "}
            Country: {country ? country : "unknown"}{" "}
          </Typography>
          <Typography variant="body1">Website: {website_name}</Typography>
          <Typography
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            For more information, click here.
          </Typography>
        </blockquote>
      </Box>
      <Box
        position="relative"
        height="36px"
        boxSizing="content-box"
        sx={{
          m: "12px",
        }}
      >
        <Typography
          sx={{
            color: `${expired ? "red" : "green"}`,
            ml: "36px",
            fontWeight: "700",
          }}
          variant="body1"
        >
          Deadline: {deadline}
        </Typography>

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
                backgroundColor: "#6c63ff",
                color: "white",
                "&:hover": { backgroundColor: "#1f1650", color: "white" },
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
                backgroundColor: "#1f1650",
                color: "white",
                "&:hover": {
                  backgroundColor: "#6c63ff",
                  color: "white",
                  transition: "0.3s ease-in-out",
                },
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

const DetailedOpportunityView = ({
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
  const [expired, setexpired] = useState(false);

  const theme = useTheme();

  const deadlineCalculator = () => {
    const the_deadline = new Date(deadline);
    const now = new Date();
    const daysRemanining = deadline - now;
    if (daysRemanining < 1) {
      setexpired(true);
    }
    return daysRemanining;
  };
  useEffect(() => {
    deadlineCalculator();
  });
  return (
    <Box
      className="opportunity-box"
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        my: "24px",
        position: "relative",
        transition: "0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#dde2ff",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1f1650",
          p: "12px",
          textAlign: "center",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            textTransform: "uppercase",
          }}
          variant="h6"
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginY: "12px",
        }}
      >
        <blockquote>
          <Typography
            sx={{
              color: "#6c63ff",
              fontWeight: "600",
            }}
            variant="h6"
          >
            Summary
          </Typography>

          <Typography sx={{}} variant="h6">
            {page.main}
          </Typography>
        </blockquote>
      </Box>

      <Box sx={{}}>
        <blockquote>
          <Typography variant="body1">
            {" "}
            Country: {country ? country : "unknown"}{" "}
          </Typography>
          <Typography variant="body1">Website: {website_name}</Typography>
          <Typography
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            For more information, click here.
          </Typography>
        </blockquote>
      </Box>
      <Box
        position="relative"
        height="36px"
        boxSizing="content-box"
        sx={{
          m: "12px",
        }}
      >
        <Typography
          sx={{
            color: `${expired ? "red" : "green"}`,
            ml: "36px",
            fontWeight: "700",
          }}
          variant="body1"
        >
          Deadline: {deadline}
        </Typography>

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
                backgroundColor: "#6c63ff",
                color: "white",
                "&:hover": { backgroundColor: "#1f1650", color: "white" },
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
                backgroundColor: "#1f1650",
                color: "white",
                "&:hover": {
                  backgroundColor: "#6c63ff",
                  color: "white",
                  transition: "0.3s ease-in-out",
                },
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
export { MinimalOpportunityView, DetailedOpportunityView };

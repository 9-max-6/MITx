import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

const SingleBidViewDetailed = ({ title, deadline, page, country, link }) => {
  const [expired, setexpired] = useState(false);

  const deadlineCalculator = () => {
    const the_deadline = new Date(deadline);
    const now = new Date();
    const daysRemaining = the_deadline - now;
    if (daysRemaining < 1) {
      setexpired(true);
    }
    return daysRemaining;
  };
  useEffect(() => {
    deadlineCalculator();
  }, []);
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "inherit",
        position: "relative",
        boxSizing: "border-box",
        padding: "12px",
        marginBottom: "12px",
      }}
    >
      <Box
        sx={{
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
      </Box>

      <Box
        sx={{
          height: "16px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginY: "12px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <KeyboardArrowRightIcon
            sx={{
              alignSelf: "flex-end",
              color: "#6c63ff",
              height: "36px",
              width: "36px",
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
};

export { SingleBidViewDetailed };

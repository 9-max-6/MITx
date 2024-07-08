import React from "react";
import { Box, Typography } from "@mui/material";
import "./styles/resetpassword.css";
function Archive() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        className="coming-soon image"
        sx={{
          height: "300px",
          width: "300px",
        }}
      ></Box>
      <Box>
        <Typography
          sx={{
            color: "#6c63ff",
            fontWeight: "700",
          }}
          variant="h3"
        >
          Site under construction!
        </Typography>
      </Box>
    </Box>
  );
}

export default Archive;

import { Box } from "@mui/material";
import React from "react";
import "./styles/home.css";

function Background() {
  return (
    <>
      <Box
        className="background-remote"
        sx={{
          height: "300px",
          width: "300px",
          position: "absolute",
        }}
      ></Box>
      <Box
        className="background-vision"
        sx={{
          height: "300px",
          width: "300px",
          position: "absolute",
        }}
      ></Box>
    </>
  );
}

export default Background;

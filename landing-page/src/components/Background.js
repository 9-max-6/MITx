import { Box } from "@mui/material";
import React from "react";
import "./styles/home.css";

function Background() {
  return (
    <>
      <Box
        className="background-remote"
        sx={{
          height: {
            md: "200px",
            lg: "200px",
            xl: "300px",
          },
          width: {
            md: "200px",
            lg: "200px",
            xl: "300px",
          },
          position: "absolute",
        }}
      ></Box>
      <Box
        className="background-vision"
        sx={{
          height: {
            md: "200px",
            lg: "200px",
            xl: "300px",
          },
          width: {
            md: "200px",
            lg: "200px",
            xl: "300px",
          },

          position: "absolute",
        }}
      ></Box>
    </>
  );
}

export default Background;

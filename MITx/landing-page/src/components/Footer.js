import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography>Created by Maxwell</Typography>
    </Box>
  );
}

export default Footer;

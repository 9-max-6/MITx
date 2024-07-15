import React from "react";
import { Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
      <Typography>&copy; 2024 MITx. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;

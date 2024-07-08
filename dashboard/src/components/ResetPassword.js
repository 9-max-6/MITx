import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./styles/resetpassword.css";
import { Link } from "react-router-dom";

function ResetPassword() {
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
      <Link to="/login">
        <Button
          sx={{
            m: "36px",
            color: "white",
            boxSizing: "border-box",
            backgroundColor: "#6c63ff",
            paddingX: "24px",
            "&:hover": {
              backgroundColor: "#1f1650",
              transition: "0.3s ease-in-out",
            },
          }}
        >
          Go back
        </Button>
      </Link>
    </Box>
  );
}

export default ResetPassword;

import { Typography, Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./styles/home.css";
import Background from "./Background";

function Home() {
  function toLoginPage() {
    console.log("Redirecting to the login page");
    window.location.href = "https://mitx.mutukumaxwell.tech/dashboard/";
  }
  return (
    <Box className="home-content">
      <Box
        marginBottom="36px"
        sx={{
          marginBottom: {
            xs: "12px",
            md: "36px",
          },
        }}
      >
        <Typography
          sx={{
            color: "#1f1650",
            fontSize: {
              sm: "2rem",
              md: "3rem",
              lg: "6rem",
            },
          }}
          variant="h1"
        >
          MITx
        </Typography>
      </Box>
      <Box className="home-content-text">
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              sm: "xx-large",
              md: "x-large",
              lg: "xx-large",
            },
          }}
        >
          The <span>AI Powered</span> platform that
        </Typography>
      </Box>
      <Box className="home-content-text">
        <Typography
          sx={{
            fontSize: {
              sm: "xx-large",
              md: "x-large",
              lg: "xx-large",
            },
          }}
          variant="h4"
        >
          brings company specific
        </Typography>
      </Box>
      <Box className="home-content-text">
        <Typography
          sx={{
            fontSize: {
              sm: "xx-large",
              md: "x-large",
              lg: "xx-large",
            },
          }}
          variant="h4"
        >
          insights to the edge of your
        </Typography>
      </Box>
      <Box className="home-content-text">
        <Typography
          sx={{
            fontSize: {
              sm: "xx-large",
              md: "x-large",
              lg: "xx-large",
            },
          }}
          variant="h4"
        >
          imagination
        </Typography>
      </Box>

      <Box
        sx={{
          m: "24px",
          display: "flex",
          gap: "12px",
        }}
      >
        <Link to="/how">
          <Button
            sx={{
              boxSizing: "border-box",
              color: "white",
              backgroundColor: "#6c63ff",
              fontSize: {
                md: "small",
                lg: "large",
              },
              paddingX: {
                md: "12px",
                lg: "24px",
              },
              "&:hover": {
                boxShadow: "0px 0px 15px 4px rgba(108,99,255,0.5)",
                WebkitBoxShadow: "0px 0px 15px 4px rgba(108,99,255,0.5)",
                MozBoxShadow: "0px 0px 15px 4px rgba(108,99,255,0.5)",
                color: "white",
                backgroundColor: "#6c63ff",
                transition: "0.3s ease-in-out",
              },
            }}
          >
            Explore
          </Button>
        </Link>
      </Box>

      <Background />
    </Box>
  );
}

export default Home;

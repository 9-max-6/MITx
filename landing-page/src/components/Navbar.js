import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  function toLoginPage() {
    console.log("Redirecting to the login page");
    window.location.href = "https://mitx.mutukumaxwell.tech/dashboard/";
  }
  return (
    <Box className="navbar-wrapper">
      <Link to="/">
        <Box className="logo"></Box>
      </Link>
      <ul className="navbar">
        <li>
          <Link to="/how">
            <Button
              sx={{
                color: "#1f1650",
                fontSize: {
                  md: "small",
                  lg: "larger",
                },
                "&:hover": { backgroundColor: "#6c63ff", color: "white" },
              }}
            >
              How
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/features">
            <Button
              sx={{
                color: "#1f1650",
                fontSize: {
                  md: "small",
                  lg: "larger",
                },
                "&:hover": { backgroundColor: "#6c63ff", color: "white" },
              }}
            >
              Features
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/insights">
            <Button
              sx={{
                color: "#1f1650",
                fontSize: {
                  md: "small",
                  lg: "larger",
                },
                "&:hover": { backgroundColor: "#6c63ff", color: "white" },
              }}
            >
              Insights
            </Button>
          </Link>
        </li>
      </ul>

      <Box className="contact-us">
        <Button
          sx={{
            color: "#1f1650",
            outline: "1px solid #1f1650",
            fontSize: {
              md: "small",
              lg: "larger",
              xl: "larger",
            },
            padding: {
              sm: "8px",
              lg: "8px",
              xl: "8px",
            },
            "&:hover": {
              backgroundColor: "#1f1650",
              color: "white",
              transition: "0.3s ease-in-out",
            },
          }}
          onClick={toLoginPage}
        >
          Login
        </Button>
        <Link to="/contact-us">
          <Button
            sx={{
              backgroundColor: "#6c63ff",
              color: "white",
              fontSize: {
                md: "small",
                lg: "larger",
                xl: "larger",
              },
              padding: {
                sm: "8px",
                lg: "8px",
                xl: "9px",
              },
              "&:hover": {
                backgroundColor: "#1f1650",
                color: "white",
                transition: "0.3s ease-in-out",
              },
            }}
          >
            Contact us
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Navbar;

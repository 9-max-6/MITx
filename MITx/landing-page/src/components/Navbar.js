import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
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
                fontSize: "larger",
                "&:hover": { backgroundColor: "#6c63ff", color: "white" },
              }}
            >
              How
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/ai">
            <Button
              sx={{
                color: "#1f1650",
                fontSize: "larger",
                "&:hover": { backgroundColor: "#6c63ff", color: "white" },
              }}
            >
              AI
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/insights">
            <Button
              sx={{
                color: "#1f1650",
                fontSize: "larger",
                "&:hover": { backgroundColor: "#6c63ff", color: "white" },
              }}
            >
              Insights
            </Button>
          </Link>
        </li>
      </ul>

      <Box className="contact-us">
        <Link to="/contact-us">
          <Button
            sx={{
              backgroundColor: "#6c63ff",
              color: "white",
              padding: "12px",
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

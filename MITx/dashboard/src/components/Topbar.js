import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./components.css";

function Topbar() {
  // logout function
  const logOut = () => {
    localStorage.clear();
    console.log("Logged out");
  };
  return (
    <Box className="Navbar">
      <Box className="farLeft">
        <Box className="logo"></Box>
        <ul>
          <Link to="/">
            <Button>
              <li className="Dashboard">Dashboard</li>
            </Button>
          </Link>

          <Link to="/opps">
            <Button>
              <li>Opportunities</li>
            </Button>
          </Link>

          <Link to="/bids">
            <Button>
              <li>Bids</li>
            </Button>
          </Link>
          <Link to="/archive">
            <Button>
              <li className="center">Archive</li>
            </Button>
          </Link>
        </ul>
      </Box>
      <Box className="farRight">
        <ul>
          <Link to="/settings">
            <li>
              <AccountCircleIcon
                style={{ height: "36px", width: "36px", alignSelf: "flex-end" }}
              />
            </li>
          </Link>
          <li>
            <Button onClick={logOut}>Logout</Button>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default Topbar;

import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./components.css";
import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Topbar() {
  // logout function
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(isAuthenticated);
  const logOut = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.clear();
        setisAuthenticated(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Logged out");
  };
  return (
    <>
      {isAuthenticated ? (
        <Box className="Navbar">
          <Box className="farLeft">
            <Box className="logo"></Box>
            {}
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
                    style={{
                      height: "36px",
                      width: "36px",
                      alignSelf: "flex-end",
                    }}
                  />
                </li>
              </Link>
              <li>
                <Button onClick={logOut}>Logout</Button>
              </li>
            </ul>
          </Box>
        </Box>
      ) : (
        <Box display="hidden"></Box>
      )}
    </>
  );
}

export default Topbar;

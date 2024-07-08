import { React, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "./Auth/AuthContext";
import "./styles/components.css";

function Topbar() {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(isAuthenticated);
  const logOut = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://mitx.mutukumaxwell.tech/api/logout/",
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
            {}
            <ul>
              <Link to="/">
                <Button>
                  <li className="Dashboard">
                    <Typography sx={{}} variant="h6">
                      Home
                    </Typography>
                  </li>
                </Button>
              </Link>
            </ul>
            <ul>
              <Link to="/opps">
                <Button>
                  <li>
                    <Typography sx={{}} variant="h6">
                      opportunities
                    </Typography>
                  </li>
                </Button>
              </Link>

              <Link to="/bids">
                <Button>
                  <li>
                    <Typography sx={{}} variant="h6">
                      bids
                    </Typography>
                  </li>
                </Button>
              </Link>
              <Link to="/archive">
                <Button>
                  <li>
                    <Typography sx={{}} variant="h6">
                      archive
                    </Typography>
                  </li>
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

import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Box, CardContent, Typography, Button } from "@mui/material";
import { Card } from "@mui/material";
import axios from "axios";
import { typography } from "./typography";
import "./styles/login.css";

function Login() {
  // Use the authcontent
  const { setisAuthenticated, setUsername, setUserid } =
    useContext(AuthContext);

  // for navigation after login
  const navigate = useNavigate();

  // login credentials state
  const [username, localsetusername] = useState();
  const [password, setpassword] = useState("");

  // error messages state to be displayed when something goes wrong.
  const [error, seterror] = useState("");

  // error messages state to be displayed when something goes wrong.
  const [showerror, setshowerror] = useState(false);

  function getLandingPage() {
    console.log("Redirecting to landing page");
    window.location.href = "https://mitx.mutukumaxwell.tech";
  }
  const handleLogin = async (e) => {
    // prevent page from reloading
    e.preventDefault();

    // Don't show error when user attempts to login
    setshowerror(false);

    const postData = {
      email: username,
      password: password,
    };

    // async request to login
    axios
      .post("https://mitx.mutukumaxwell.tech/api/login/", postData, {
        withCredentials: true,
      })
      .then((response) => {
        // authenticate
        setisAuthenticated(true);

        // Saved logged in user information
        setUsername(response.data.name);
        setUserid(response.data.id);

        // Save the logged in status in case the user logs in
        localStorage.setItem("authStatus", true);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userId", response.data.id);

        // redirect to login
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          // network error
          seterror(typography.messages.network_error);
        } else {
          // password error
          seterror(typography.messages.login_error);
        }
        setshowerror(true);
      });
  };

  return (
    <Box className="login-page">
      <Card
        sx={{
          alignSelf: "center",
          height: {
            lg: "400px",
            xl: "480px",
          },
          width: {
            lg: "480px",
            xl: "560px",
          },
          gap: "36px",
          backgroundColor: "inherit",
        }}
        elevation={2}
      >
        <CardContent
          sx={{
            padding: "36px",
          }}
        >
          <form className="form" method="POST">
            <Box mb="24px">
              <Typography
                sx={{
                  color: "#6c63ff",
                  fontWeight: "700",
                }}
                variant="h5"
              >
                Login to access your profile
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Email</Typography>
              <input
                type="email"
                id="useremail"
                name="useremail"
                placeholder="  Your email"
                onChange={(e) => {
                  localsetusername(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Password</Typography>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="  Your password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                my: "20px",
                alignSelf: "flex-end",
              }}
            >
              <Button
                sx={{
                  color: "white",
                  boxSizing: "border-box",
                  backgroundColor: "#6c63ff",
                  paddingX: "24px",
                  "&:hover": {
                    backgroundColor: "#1f1650",
                    transition: "0.3s ease-in-out",
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
            {showerror && (
              <Box className="error">
                <Typography
                  sx={{
                    fontSize: {
                      sm: "12px",
                      md: "12px",
                      lg: "16px",
                      xl: "16px",
                    },
                    fontWeight: "600",
                    color: "#F50057",
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}
            <Box>
              {" "}
              <Typography
                sx={{
                  color: "#1f1650",
                }}
                variant="h6"
              >
                Forgot your password?
              </Typography>
              <Typography
                sx={{
                  color: "#1f1650",
                }}
                variant="h6"
              >
                Click{" "}
                <Link
                  sx={{
                    color: "red",
                  }}
                  to="reset-password"
                >
                  <span className="link-reset">here</span>
                </Link>{" "}
                to reset password
              </Typography>
            </Box>
          </form>
          <Box
            position="absolute"
            sx={{
              top: "48px",
              right: "36px",
            }}
          >
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
          </Box>
          <Box
            onClick={getLandingPage}
            position="absolute"
            sx={{
              top: "48px",
              left: "36px",
            }}
            className="logo"
          ></Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

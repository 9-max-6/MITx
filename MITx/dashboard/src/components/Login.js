import React, { useContext, useState } from "react";
import { AuthContext } from "./Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";

function Login() {
  const { setisAuthenticated, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, localsetusername] = useState();
  const [password, setpassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const postData = {
      email: username,
      password: password,
    };
    axios
      .post("http://127.0.0.1:8000/api/login/", postData, {
        withCredentials: true,
      })
      .then((response) => {
        setisAuthenticated(true);
        console.log(response);
        setUsername(response.data.name);
        console.log(response);
        localStorage.setItem("authStatus", true);
        localStorage.setItem("userName", response.data.name);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <Box
      sx={{
        width: "300px",
      }}
    >
      <form method="POST">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Email</p>
          <input
            type="email"
            id="useremail"
            name="useremail"
            onChange={(e) => {
              localsetusername(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Password</p>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            my: "20px",
          }}
        >
          <button onClick={handleLogin}>Submit</button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;

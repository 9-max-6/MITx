import { unstable_createMuiStrictModeTheme } from "@mui/material";
import React from "react";
import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  let authStatus = localStorage.getItem("authStatus");
  let userName = localStorage.getItem("userName");
  let userId = localStorage.getItem("userId");
  if (authStatus === null) {
    authStatus = false;
  }

  const [isAuthenticated, setisAuthenticated] = useState(authStatus);
  const [username, setUsername] = useState(userName);
  const [userid, setUserid] = useState(userId);
  const contextValue = {
    isAuthenticated,
    setisAuthenticated,
    username,
    setUsername,
    userid,
    setUserid,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

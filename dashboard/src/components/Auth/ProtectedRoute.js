import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const { isAuthenticated, setisAuthenticated } = useContext(AuthContext);
  const [loadedStatus, setloadedStatus] = useState(false);
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;

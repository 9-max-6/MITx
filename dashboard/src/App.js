import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Dashboard from "../../dashboard/src/components/Dashboard";
import Opportunities from "./components/Opportunities";
import Bids from "../../dashboard/src/components/Bids";
import Archive from "../../dashboard/src/components/Archive";
import Faq from "../../dashboard/src/components/Faq";
import Settings from "../../dashboard/src/components/Settings";
import "./index.css";
import "./App.css";
import HelpIcon from "@mui/icons-material/Help";
import Topbar from "./components/Topbar";
import { Box } from "@mui/material";
import { AuthContext } from "./components/Auth/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [loaded, setloaded] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="app">
      <Box
        sx={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
      >
        <HelpIcon
          style={{
            height: "48px",
            width: "48px",
            color: "#1d2c4c",
          }}
        />
      </Box>
      <Topbar />
      <main className="main">
        <Box
          className="mainContent"
          sx={{
            width: isAuthenticated ? "calc(100% - 128px)" : "100%",
            margin: isAuthenticated ? "128px auto 0 auto" : "0px",
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login/reset-password" element={<ResetPassword />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              exact
            />
            <Route
              path="/opps"
              element={
                <ProtectedRoute>
                  <Opportunities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bids"
              element={
                <ProtectedRoute>
                  <Bids />
                </ProtectedRoute>
              }
            />
            <Route
              path="/archive"
              element={
                <ProtectedRoute>
                  <Archive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <Faq />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </main>
    </div>
  );
}

export default App;

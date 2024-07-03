import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import { TrackProvider } from "./components/TrackContext/TrackContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TrackProvider>
          <App />
        </TrackProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

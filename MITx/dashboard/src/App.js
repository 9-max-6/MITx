import "./App.css";
import { Routes, Route } from "react-router-dom";
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

function App() {
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
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/opps" element={<Opportunities />} />
            <Route path="/bids" element={<Bids />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

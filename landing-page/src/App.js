import React from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import AI from "./components/AI";
import How from "./components/How";
import "./App.css";
import Insights from "./components/Insights";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTheme } from "@emotion/react";

function App() {
  const theme = useTheme();
  return (
    <Box className="app-wrapper">
      <Navbar />
      <Box className="main">
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/how" element={<How />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;

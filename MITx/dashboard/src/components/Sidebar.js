import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import ArchiveIcon from "@mui/icons-material/Archive";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HelpIcon from "@mui/icons-material/Help";

function MySidebar() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        height: "100vh",
      }}
    >
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#6870fa",
                color: "#0056b3",
              },
            },
          }}
        >
          <MenuItem component={<Link to="/" />}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              ml="24px"
            >
              <HomeIcon />
              <Typography>Dashboard</Typography>
            </Box>
          </MenuItem>
          <Typography sx={{ m: "15px 0 5px 20px" }}>Recent</Typography>
          <MenuItem component={<Link to="/opps" />}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              ml="24px"
            >
              <TipsAndUpdatesIcon />
              <Typography>Opportunities</Typography>
            </Box>
          </MenuItem>
          <MenuItem component={<Link to="/bids" />}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              ml="24px"
            >
              <FavoriteBorderIcon />
              <Typography>Bids</Typography>
            </Box>
          </MenuItem>
          <Typography sx={{ m: "15px 0 5px 20px" }}>Playground</Typography>
          <MenuItem component={<Link to="/archive" />}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              ml="24px"
            >
              <ArchiveIcon />
              <Typography>Archive</Typography>
            </Box>
          </MenuItem>
          <MenuItem component={<Link to="/faq" />}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              ml="24px"
            >
              <HelpIcon />
              <Typography>FAQ</Typography>
            </Box>
          </MenuItem>
          <MenuItem component={<Link to="/settings" />}>
            <Box
              alignSelf="flex-end"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              ml="24px"
            >
              <SettingsIcon />
              <Typography>Settings</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default MySidebar;

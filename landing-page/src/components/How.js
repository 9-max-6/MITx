import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./styles/how.css";
function How() {
  const theme = useTheme();
  return (
    <Box
      className="grid"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      sx={{
        marginX: {
          xs: "0px",
          sm: "0px",
          lg: "200px",
          xl: "300px",
        },
      }}
      gridAutoRows="200px"
    >
      <Box
        className="illustration"
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Box className="problem-illustration"></Box>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        alignItems="center"
        sx={{
          "&:hover": {
            backgroundColor: "#dde2ff",
            borderRadius: "24px",
            transition: "0.3s ease-in-out",
          },
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Typography
          className="typo"
          sx={{
            color: "#1f1650",
            fontWeight: "100",
            fontSize: {
              sm: "large",
              md: "larger",
              lg: "x-large",
            },
          }}
          variant="h6"
        >
          As a researcher, finding the right <span>opportunities</span> for your
          company can be a cumbersome process given all the websites you have to
          visit manually. With MITx, now you can...
        </Typography>
      </Box>

      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        sx={{
          "&:hover": {
            backgroundColor: "#dde2ff",
            borderRadius: "24px",
            transition: "0.3s ease-in-out",
          },
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Box className="blur"></Box>

        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "100",
            fontSize: {
              sm: "large",
              md: "larger",
              lg: "x-large",
            },
          }}
          variant="h6"
        >
          MITx automates this process by scraping the information from the very
          same websites that you would visit on a daily basis. You can use this
          time to sharpen your writing skills.
        </Typography>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Box className="animate"></Box>
      </Box>

      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        padding="36px"
      >
        <Box className="extraction"></Box>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        padding="36px"
        sx={{
          "&:hover": {
            backgroundColor: "#dde2ff",
            borderRadius: "24px",
            transition: "0.3s ease-in-out",
          },
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Box className="blur"></Box>

        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "100",
            fontSize: {
              sm: "large",
              md: "larger",
              lg: "x-large",
            },
          }}
          variant="h6"
        >
          It then cleans it and extracts relevant information around
          opportunities posted by NGOs and AID organizations around the world.
          Meanwhile, you're having a coffee and refreshing your mind to better
          present your ideas to organization.
        </Typography>
      </Box>

      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        sx={{
          "&:hover": {
            backgroundColor: "#dde2ff",
            borderRadius: "24px",
            transition: "0.3s ease-in-out",
          },
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Box className="blur"></Box>

        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "100",
            fontSize: {
              sm: "large",
              md: "larger",
              lg: "x-large",
            },
          }}
          variant="h6"
        >
          At the end of it all, your opportunities await you with everything you
          need to know about an opportunity clearly laid out. Stuff like the
          references you need to make sure that your company has the relevant
          experience to handle a project are already attached to the curated
          content MITx will serve.
        </Typography>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: {
            xs: "8px",
            sm: "12px",
            lg: "24px",
            xl: "36px",
          },
        }}
      >
        <Box className="productivity"></Box>
      </Box>
    </Box>
  );
}

export default How;

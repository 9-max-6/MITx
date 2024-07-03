import React from "react";
import { Box, Typography } from "@mui/material";
import "./styles/how.css";
function How() {
  return (
    <Box
      className="grid"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="200px"
      marginX="200px"
    >
      <Box
        gridColumn="span 2"
        gridRow="span 2"
        display="flex"
        position="relative"
      ></Box>
      <Box
        className="illustration"
        gridColumn="span 5"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        padding="36px"
      >
        <Box className="problem-illustration"></Box>
      </Box>
      <Box
        gridColumn="span 5"
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
        }}
      >
        <Box className="blur"></Box>

        <Typography
          className="typo"
          sx={{
            color: "#1f1650",
            fontWeight: "100",
          }}
          variant="h6"
        >
          As a researcher, finding the right <span>opportunities</span> for your
          company can be a cumbersome process given all the websites you have to
          visit manually. With MITx, now you can...
        </Typography>
      </Box>

      <Box
        gridColumn="span 2"
        gridRow="span 2"
        display="flex"
        position="relative"
      >
        <Typography
          sx={{
            color: "#6c63ff",
            fontWeight: "700",
          }}
          variant="h6"
        >
          Scrape
        </Typography>
      </Box>
      <Box
        gridColumn="span 5"
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
        }}
      >
        <Box className="blur"></Box>

        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "100",
          }}
          variant="h6"
        >
          MITx automates this process by scraping the information from the very
          same websites that you would visit on a daily basis. You can use this
          time to sharpen your writing skills.
        </Typography>
      </Box>
      <Box
        gridColumn="span 5"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        padding="36px"
      >
        <Box className="animate"></Box>
      </Box>
      <Box
        gridColumn="span 2"
        gridRow="span 2"
        display="flex"
        position="relative"
        className="steps"
      >
        <Typography
          sx={{
            color: "#6c63ff",
            fontWeight: "700",
          }}
          variant="h6"
        >
          Extract
        </Typography>
      </Box>
      <Box
        gridColumn="span 5"
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
        gridColumn="span 5"
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
        }}
      >
        <Box className="blur"></Box>

        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "100",
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
        className="steps"
        gridColumn="span 2"
        gridRow="span 2"
        display="flex"
        position="relative"
      >
        <Typography
          sx={{
            color: "#6c63ff",
            fontWeight: "700",
          }}
          variant="h6"
        >
          Curate
        </Typography>
      </Box>
      <Box
        gridColumn="span 5"
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
        }}
      >
        <Box className="blur"></Box>

        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "100",
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
        gridColumn="span 5"
        gridRow="span 2"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        padding="36px"
      >
        <Box className="productivity"></Box>
      </Box>
    </Box>
  );
}

export default How;

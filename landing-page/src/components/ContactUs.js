import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { React, useState } from "react";
import "./styles/contactus.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ContactUs() {
  const theme = useTheme();

  const [email, setemail] = useState("");

  const gitlink = "https://github.com/9-max-6";
  const linkedinlink = "https://www.linkedin.com/in/maxwell-mutuku/";
  const xlink = "https://x.com/binary_bandit_";

  const submitEmail = () => {
    console.log(email);
  };
  return (
    <Box
      sx={{
        width: {
          xs: "500px",
          sm: "500px",
          lg: "700px",
          xl: "800px",
        },
        marginX: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "50vh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box>
          <Typography
            sx={{
              color: "#6c63ff",
              fontWeight: "700",
              fontSize: "larger",
            }}
          >
            Maxwell Mutuku
          </Typography>
          <Typography>
            Max is a full-stack engineer and systems administrator based in
            Nairobi, Kenya. He has a passion for programming and a strong,
            unwavering commitment to building solutions that bring impact.
          </Typography>
          <Typography
            sx={{
              paddingTop: "20px",
            }}
          >
            Check out his socials and github account below
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "12px",
              my: "30px",
            }}
          >
            <Typography
              component="a"
              href={gitlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </Typography>
            <Typography
              component="a"
              href={xlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon />
            </Typography>
            <Typography
              component="a"
              href={linkedinlink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Typography>
            Enter you email address below and one of our sales representatives
            will reach out.
          </Typography>
          <form>
            <input
              className="custom-button "
              type="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            ></input>
            <Button onClick={submitEmail}>
              <ArrowForwardIcon />
            </Button>
          </form>
        </Box>
        <Box textAlign="center"></Box>
      </Box>
    </Box>
  );
}

export default ContactUs;

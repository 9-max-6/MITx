import React from "react";
import { Box, CardContent, Typography, Card } from "@mui/material";
import { useTheme } from "@emotion/react";
import "./styles/ai.css";

function AI() {
  const theme = useTheme();
  return (
    <Box
      className="grid"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      sx={{
        width: {
          xs: "500px",
          sm: "600px",
          lg: "720px",
          xl: "1000px",
        },
      }}
      margin="auto"
      gap="24px"
    >
      <Box
        className="title-ai"
        gridColumn="span 12"
        gridRow="span 1"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{
            color: "#6c63ff",
            fontWeight: "800px",
            textTransform: "uppercase",
            fontSize: {
              sm: "large",
              md: "larger",
              lg: "x-large",
            },
          }}
          variant="h5"
        >
          Leveraging AI for Superior Content
        </Typography>
        <Typography
          sx={{
            color: "#1f1650",
            fontWeight: "800px",
            fontSize: {
              sm: "small",
              md: "large",
              lg: "large",
            },
          }}
          variant="h6"
        >
          In our platform, we harness the power of artificial intelligence to
          bring you the most relevant and high-quality content.
        </Typography>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 1"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        boxSizing="border-box"
      >
        <Card
          sx={{
            minWidth: "300px",
            height: {
              sm: "300px",
              lg: "400px",
              xl: "400px",
            },
            backgroundColor: "inherit",
          }}
        >
          <Box className="blur"></Box>

          <Box className="card">
            <Typography
              sx={{
                color: "inherit",
                textTransform: "uppercase",
              }}
              variant="h6"
            >
              Realtime
            </Typography>
          </Box>
          <CardContent>
            <Typography
              sx={{
                color: "#1f1650",
                fontSize: {
                  sm: "small",
                  md: "large",
                  lg: "large",
                },
              }}
            >
              Our AI constantly monitors and scrapes the internet for the latest
              information. This ensures that the content you see is always
              up-to-date and reflects the latest trends and news.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 1"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
        boxSizing="border-box"
      >
        <Card
          sx={{
            minWidth: "300px",
            height: {
              sm: "300px",
              lg: "400px",
              xl: "400px",
            },
            backgroundColor: "inherit",
            flexFlow: "1",
          }}
        >
          <Box className="blur"></Box>

          <Box className="card">
            <Typography
              sx={{
                color: "inherit",
                textTransform: "uppercase",
              }}
              variant="h6"
            >
              Smart Filtering
            </Typography>
          </Box>
          <CardContent>
            <Typography
              sx={{
                color: "#1f1650",
                fontSize: {
                  sm: "small",
                  md: "large",
                  lg: "large",
                },
              }}
            >
              The AI filters through vast amounts of data, discarding irrelevant
              and low-quality content. This smart filtering process guarantees
              that you receive only the most valuable and pertinent information.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        gridColumn="span 6"
        gridRow="span 1"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            flexGrow: "1",
            height: {
              sm: "300px",
              lg: "400px",
              xl: "400px",
            },
            backgroundColor: "inherit",
          }}
        >
          <Box className="blur"></Box>

          <Box className="card">
            <Typography
              sx={{
                color: "inherit",
                textTransform: "uppercase",
              }}
              variant="h6"
            >
              Intelligent Generation
            </Typography>
          </Box>
          <CardContent>
            <Typography
              sx={{
                color: "#1f1650",
                fontSize: {
                  sm: "small",
                  md: "large",
                  lg: "large",
                },
              }}
            >
              Using advanced natural language processing (NLP) techniques, our
              AI generates readable and engaging articles, summaries, and other
              content forms. This means you get high-quality, easy-to-understand
              information crafted from the data.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        className="title-ai"
        gridColumn="span 6"
        gridRow="span 1"
        display="flex"
        position="relative"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            height: {
              sm: "300px",
              lg: "400px",
              xl: "400px",
            },
            backgroundColor: "inherit",
            flexGrow: "1",
          }}
        >
          <Box className="blur"></Box>

          <Box className="card">
            <Typography
              sx={{
                color: "inherit",
                textTransform: "uppercase",
              }}
              variant="h6"
            >
              Personalized Experience
            </Typography>
          </Box>
          <CardContent>
            <Typography
              sx={{
                color: "#1f1650",
                fontSize: {
                  sm: "small",
                  md: "large",
                  lg: "large",
                },
              }}
            >
              Our AI learns from your company data and corporate objectives,
              tailoring the content to better suit your interests as a
              researcher. This personalized approach ensures that what you see
              is always relevant and engaging to you.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AI;

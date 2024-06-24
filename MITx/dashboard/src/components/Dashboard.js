import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import "./dashboard.css";

function Dashboard() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
      <Box
        className="dashboardGrid"
        gridColumn="span 4"
        outline="1px solid blue"
        gridRow="span 2"
        padding="0px"
      >
        <Card
          sx={{
            height: "100%",
            width: "100%",
          }}
          elevation={2}
        >
          <CardContent>
            <Typography variant="h4">User profile</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        className="dashboardGrid"
        gridColumn="span 8"
        gridRow="span 5"
        outline="1px solid blue"
      >
        <Typography variant="h4">Opportunities</Typography>
      </Box>
      <Box
        className="dashboardGrid"
        gridColumn="span 4"
        gridRow="span 3"
        outline="1px solid blue"
      >
        <Typography variant="h4">Your Bids</Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;

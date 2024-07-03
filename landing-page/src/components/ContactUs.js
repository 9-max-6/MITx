import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { React, useState } from "react";
import "./styles/contactus.css";

function ContactUs() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [companysize, setcompanysize] = useState("");
  const [companyname, setcompanyname] = useState("");

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="1000px"
      height="100vh"
      margin="auto"
    >
      <Box
        className="coming-soon"
        sx={{
          alignSelf: "center",
          height: "500px",
          width: "100%",
        }}
      ></Box>
      <Box
        sx={{
          alignSelf: "center",
          my: "36px",
        }}
      >
        <Typography
          sx={{
            color: "#6c63ff",
            fontWeight: "700",
          }}
          variant="h3"
        >
          Site under construction!
        </Typography>
      </Box>
    </Box>
  );
}

export default ContactUs;

// <Box className="hello"></Box>
// <Card
//   sx={{
//     alignSelf: "center",
//     height: "480px",
//     width: "560px",
//     gap: "36px",
//   }}
//   elevation={2}
// >
//   <CardContent>
//     <form method="POST">
//       <Box mb="24px" display="flex">
//         <Typography
//           sx={{
//             alignSelf: "center",
//           }}
//           variant="h5"
//         >
//           Write to our marketing team
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography variant="h6">Email</Typography>
//         <input
//           type="email"
//           id="useremail"
//           name="useremail"
//           placeholder="  Your email"
//           onChange={(e) => {
//             setname(e.target.value);
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           mt: "24px",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography>Company</Typography>

//         <input
//           type="text"
//           id="companyname"
//           name="companyname"
//           placeholder=" Name of your company"
//           onChange={(e) => {
//             setcompanyname(e.target.value);
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           mt: "24px",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Typography>Company</Typography>

//         <input
//           type=""
//           id="companyname"
//           name="companyname"
//           placeholder=" Name of your company"
//           onChange={(e) => {
//             setcompanyname(e.target.value);
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           my: "20px",
//           position: "relative",
//         }}
//       >
//         <Button
//           sx={{
//             backgroundColor: "#6c63ff",
//             color: "white",
//             padding: "12px",

//             paddingX: "24px",
//             position: "absolute",
//             right: "12px",
//             "&:hover": {
//               backgroundColor: "#1f1650",
//               color: "white",
//               transition: "0.3s ease-in-out",
//             },
//           }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </form>
//   </CardContent>
// </Card>

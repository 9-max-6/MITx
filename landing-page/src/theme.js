import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6c63ff",
    },
    secondary: {
      main: "#1f1650",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#ecf0ff;",
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    h1: {
      fontSize: "3rem",
    },
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;

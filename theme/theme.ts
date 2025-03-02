import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#ff5722" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#212121", secondary: "#757575" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5, color: "#757575" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { padding: "10px 20px" },
        containedPrimary: {
          "backgroundColor": "#3f51b5",
          "color": "#ffffff",
          "&:hover": { backgroundColor: "#2c387e" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { padding: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
      },
    },
  },
});

export default theme;

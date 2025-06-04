// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#9D00FF",
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        "*": {
          fontFamily: `'Poppins', sans-serif`,
        },
        body: {
          margin: 0,
          fontFamily: `'Poppins', sans-serif`,
        },
      }}
    />

    <ToastContainer />
    <App />
  </ThemeProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Theme, ThemeProvider} from "@aws-amplify/ui-react";

const theme: Theme = {
  name: "my-theme",
  primaryColor: "purple",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

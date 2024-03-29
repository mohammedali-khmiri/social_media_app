import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

/* Rendering the App component to the DOM. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

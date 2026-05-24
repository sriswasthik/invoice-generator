import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider
} from "./context/ThemeContext";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";

import "./styles.css";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <ThemeProvider>

      <AuthProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </AuthProvider>
    </ThemeProvider>

  </StrictMode>
);
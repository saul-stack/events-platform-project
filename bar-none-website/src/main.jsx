import "./styles/index.css";

import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </StrictMode>
  </BrowserRouter>
);

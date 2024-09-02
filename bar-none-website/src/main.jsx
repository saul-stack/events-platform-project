import "./styles/index.css";

import React, { StrictMode } from "react";

import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);

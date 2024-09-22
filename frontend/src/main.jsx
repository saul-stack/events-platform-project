import "./styles/css/index.css";

import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { UserProvider } from "./contexts/UserContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);

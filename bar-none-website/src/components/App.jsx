import "../styles/App.css";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Navbar from "./global/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
    console.log("test success");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

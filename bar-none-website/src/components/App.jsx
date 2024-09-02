import "../styles/App.css";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CalendarPage, EventsPage, HomePage, PreferencesPage } from "./pages";

import Navbar from "./global//Navbar";

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
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/my_calendar" element={<CalendarPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </>
  );
}

export default App;

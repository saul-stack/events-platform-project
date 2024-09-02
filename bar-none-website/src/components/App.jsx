import "../styles/App.css";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import CalendarPage from "./CalendarPage";
import EventsPage from "./EventsPage";
import Navbar from "./global/Navbar";
import HomePage from "./HomePage";
import PreferencesPage from "./PreferencesPage";

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

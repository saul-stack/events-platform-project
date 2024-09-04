import "../styles/App.css";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AboutPage,
  AccountPage,
  CalendarPage,
  EventsPage,
  LoginPage,
} from "./pages";

import Navbar from "./global/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/events");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/my-calendar" element={<CalendarPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

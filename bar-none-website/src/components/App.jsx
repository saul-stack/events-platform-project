import "../styles/App.css";

import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AboutPage,
  AccountPage,
  CalendarPage,
  EventsPage,
  LoginPage,
} from "./pages";

import React from "react";
import Navbar from "./global/Navbar";

function App() {
  const navigate = useNavigate();

  /* Temporarily disabled automatic navigation on page mount */
  /*  useEffect(() => {
    navigate("/events");
  }, []);
 */
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-account" element={<AccountPage />} />
        <Route path="/my-calendar" element={<CalendarPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

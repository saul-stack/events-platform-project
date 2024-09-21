import "../styles/App.css";

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AboutPage,
  AccountPage,
  AdminPage,
  EventPage,
  EventsPage,
  LoginPage,
} from "./pages";

import Navbar from "./global-components/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/events");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;

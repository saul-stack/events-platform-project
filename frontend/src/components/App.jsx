import "../styles/css/App.css";

import {
  AboutPage,
  AccountPage,
  AdminPage,
  EventPage,
  EventsPage,
  FailPage,
  LoginPage,
  SuccessPage,
} from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./global-components/Navbar";
import React from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/" element={<Navigate to="/events" />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailPage />} />
      </Routes>
    </>
  );
}

export default App;

import "../styles/App.css";

import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AboutPage,
  AccountPage,
  CalendarPage,
  EventsPage,
  LoginPage,
} from "./pages";

import { UserContext } from "../contexts/UserContext";
import Navbar from "./global/Navbar";

function App() {
  const { user } = useContext(UserContext);
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
        <Route path="/account" element={<AccountPage />} />
        <Route path="/my-calendar" element={<CalendarPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <p>Logged in as: {user.name}</p>
    </>
  );
}

export default App;

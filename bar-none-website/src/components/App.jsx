import "../styles/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./global/Navbar";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

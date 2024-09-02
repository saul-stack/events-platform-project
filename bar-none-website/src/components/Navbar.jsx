import "../styles/Navbar.css";

import React from "react";

const Navbar = () => {
  const menuItems = ["Home", "Events", "My Calendar", "Preferences"];

  return (
    <div className="navbar">
      <div className="navbar-content">
        {menuItems.map((item, index) => (
          <h1 key={index}>{item}</h1>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

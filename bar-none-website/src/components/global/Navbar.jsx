import "../../styles/Navbar.css";

import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  const menuItems = [
    { name: "Home", route: "/home" },
    { name: "Events", route: "/events" },
    { name: "My Calendar", route: "/calendar" },
    { name: "Preferences", route: "/preferences" },
  ];

  return (
    <div className="navbar">
      <div className="navbar-content">
        {menuItems.map((item, index) => (
          <Link to={item.route} key={index} className="navbar-button">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

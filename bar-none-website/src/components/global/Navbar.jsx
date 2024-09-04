import "../../styles/Navbar.css";

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    { name: "Home", route: "/home" },
    { name: "Events", route: "/events" },
    { name: "My Calendar", route: "/my_calendar" },
    { name: "Account", route: "/account" },
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

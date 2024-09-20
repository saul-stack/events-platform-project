import "../../styles/Navbar.css";

import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const menuItems = [
    { name: "About", route: "/about" },
    { name: "Events", route: "/events" },
    {
      name: "My Calendar",
      route: user.name && user.name.length > 0 ? "/my-calendar" : "/login",
    },
    {
      name: user.name && user.name.length > 0 ? `${user.name}` : "Login",
      route: user.name && user.name.length > 0 ? "/my-account" : "/login",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {menuItems.map((item, index) => (
          <div className="navbar-link" key={index}>
            <Link to={item.route} className="navbar-button">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

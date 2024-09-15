import "../../styles/Navbar.css";

import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const menuItems = [
    { name: "About", route: "/about" },
    { name: "Events", route: "/events" },
    { name: "My Calendar", route: "/my-calendar" },
    {
      name: user.name && user.name.length > 0 ? "Account" : "Login",
      route: user.name && user.name.length > 0 ? "/my-account" : "/login",
    },
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

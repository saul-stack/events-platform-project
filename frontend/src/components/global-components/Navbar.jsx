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
      name:
        user.user_name && user.user_name.length > 0
          ? `${user.user_name}`
          : "Login",
      route:
        user.user_name && user.user_name.length > 0 ? "/account" : "/login",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {menuItems.map((item, index) => (
          <Link to={item.route}>
            <div className="navbar-link" key={index}>
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

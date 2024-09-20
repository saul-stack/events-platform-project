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
      name: user.name && user.name.length > 0 ? `${user.name}` : "Login",
      route: user.name && user.name.length > 0 ? "/my-account" : "/login",
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

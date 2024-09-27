import "../../styles/css/Navbar.css";

import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const location = useLocation();
  const [routeBase, setRouteBase] = useState(null);
  const { user } = useContext(UserContext);
  const { user_name, role } = user;

  useEffect(() => {
    setRouteBase(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {}, [routeBase]);

  const menuItems = [
    { name: "About", route: "/about" },
    { name: "Events", route: "/events" },
    {
      name:
        user.first_name && user.first_name.length > 0
          ? `${user.first_name}`
          : "Login",
      route:
        user.user_name && user.user_name.length > 0
          ? user.role === "admin"
            ? "/admin"
            : "/account"
          : "/login",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {menuItems.map((item, index) => (
          <Link to={item.route} key={index}>
            <div
              className={`navbar-link ${
                item.route.split("/")[1] === routeBase
                  ? "navbar-link-active"
                  : ""
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

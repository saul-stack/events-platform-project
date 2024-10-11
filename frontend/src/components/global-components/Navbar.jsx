import "../../styles/css/Navbar.css";

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";
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
        <a href="/about">
          <img className="logo" src={logo} alt="logo" />
        </a>
        <div className="navbar-link-container">
          {menuItems.map((item, index) => (
            <a href={item.route} key={index}>
              <div
                className={`navbar-link ${
                  item.route.split("/")[1] === routeBase
                    ? "navbar-link-active"
                    : ""
                }`}
              >
                {item.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

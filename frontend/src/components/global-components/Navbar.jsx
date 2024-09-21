import "../../styles/Navbar.css";

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const location = useLocation();
  const [routeBase, setRouteBase] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setRouteBase(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    console.log("routeBase changed to", routeBase);
  }, [routeBase]);

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

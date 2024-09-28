import React, { useContext, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import { logUserIn } from "../../../api-functions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await logUserIn(username, password);
      await setUser(loggedInUser);
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else navigate("/account");
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="main-content">
      <div className="login-container">
        <p className="header">
          Login to watch and book events, and manage your booked events.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label className="text-input" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-input" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

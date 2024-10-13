import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { logUserIn } from "../../../api-functions";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user.role === "admin") {
      navigate("/admin");
      return;
    }
    if (user.user_name) {
      navigate("/account");
      return;
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await logUserIn(username, password);
      await setUser(loggedInUser);
      if (
        loggedInUser.role != "admin" &&
        location.state &&
        location.state.redirectEventId
      ) {
        const eventId = location.state.redirectEventId;
        navigate(`/events/${eventId}`, {
          state: { showBuyForm: true },
        });
        return;
      }
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else navigate("/account");
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <main className="main-content">
      <section className="login-container">
        <header>
          <h2>Login</h2>
          <p>Login to watch and book events.</p>
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="text-boxes">
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
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;

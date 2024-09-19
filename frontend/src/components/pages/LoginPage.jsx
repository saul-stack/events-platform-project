import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../../api-functions";
import { UserContext } from "../../contexts/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;

    try {
      setErrorMessage(null);
      await getUserByUsername(username);
      setUser({ name: username });
      navigate("/my-account");
    } catch (error) {
      const errorMessage = error.response.data.error;
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="main-content">
      <h1>You are not logged in.</h1>
      <p>Login to watch and book events, and manage your booked events.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;

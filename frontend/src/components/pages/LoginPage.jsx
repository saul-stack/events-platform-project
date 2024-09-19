import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    setUser({ name: username });
    navigate("/my-account");
  };
  return (
    <div className="main-content">
      <h1>You are not logged in.</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;

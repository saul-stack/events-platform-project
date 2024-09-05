import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function AccountPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    setUser({ name: null });
    navigate("/login");
  }

  return (
    <div>
      <p>
        Logged in as: <b>{user.name}</b>
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default AccountPage;

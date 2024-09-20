import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import MyEvents from "../AccountPage/MyEvents";
function AccountPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleLogout() {
    setUser({ name: null });
    navigate("/login");
  }

  return (
    <div className="main-content">
      <p>
        Logged in as: <b>{user.name}</b>
      </p>
      <button onClick={handleLogout}>Logout</button>

      <MyEvents></MyEvents>
    </div>
  );
}
export default AccountPage;

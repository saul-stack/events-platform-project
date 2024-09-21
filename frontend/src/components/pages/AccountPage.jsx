import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import MyEvents from "../AccountPage/MyEvents";
function AccountPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { role, user_name } = user;

  function handleLogout() {
    setUser({ name: null });
    navigate("/login");
  }

  return (
    <div className="main-content">
      <p>
        Logged in as {role}: {user_name}
      </p>
      <button onClick={handleLogout}>Logout</button>
      <MyEvents />
    </div>
  );
}
export default AccountPage;

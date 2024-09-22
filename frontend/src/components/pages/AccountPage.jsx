import { useContext } from "react";
import { useLogout } from "../../../account-util-functions";
import { UserContext } from "../../contexts/UserContext";
import MyEvents from "../AccountPage/MyEvents";

function AccountPage() {
  const logout = useLogout();
  const { user, setUser } = useContext(UserContext);
  const { role, user_name } = user;

  return (
    <div className="main-content">
      <p>
        Logged in as {role}: {user_name}
      </p>
      <button onClick={logout}>Logout</button>
      <MyEvents />
    </div>
  );
}
export default AccountPage;

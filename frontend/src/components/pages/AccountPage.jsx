import MyEvents from "../AccountPage/MyEvents";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useLogout } from "../../../account-util-functions";

function AccountPage() {
  const logout = useLogout();
  const { user, setUser } = useContext(UserContext);
  const { role, user_name } = user;

  return (
    <main className="main-content">
      <header id="logout-bar">
        <p>
          {role}: {user_name}
        </p>
        <button onClick={logout}>Logout</button>
      </header>
      <section>
        <MyEvents />
      </section>
    </main>
  );
}
export default AccountPage;

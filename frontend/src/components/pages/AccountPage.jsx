import "../../styles/css/AccountPage.css";

import { useContext } from "react";
import { useLogout } from "../../../account-util-functions";
import { UserContext } from "../../contexts/UserContext";
import MyEvents from "../AccountPage/MyEvents";

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

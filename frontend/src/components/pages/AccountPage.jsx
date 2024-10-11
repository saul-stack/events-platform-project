import "../../styles/css/AccountPage.css";

import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../account-util-functions";
import { UserContext } from "../../contexts/UserContext";
import MyEvents from "../AccountPage/MyEvents";

function AccountPage() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { user, setUser } = useContext(UserContext);
  const { role, user_name } = user;

  useEffect(() => {
    if (!user_name) {
      setUser({});
      navigate("/login");
      return;
    }

    if (role === "admin") {
      navigate("/admin");
      return;
    }
  }, []);

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

import "../../styles/css/AccountPage.css";

import { useContext, useEffect } from "react";

import MyEvents from "../AccountPage/MyEvents";
import { UserContext } from "../../contexts/UserContext";
import { useLogout } from "../../../account-util-functions";
import { useNavigate } from "react-router-dom";

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

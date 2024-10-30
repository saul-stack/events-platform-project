import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../account-util-functions";
import { UserContext } from "../../contexts/UserContext";
import MyEvents from "../AccountPage/MyEvents";
import NewEventPanel from "../AdminPage/NewEventPanel";

const AdminPage = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { user, setUser } = useContext(UserContext);
  const { role, user_name } = user;

  useEffect(() => {
    if (role != "admin") {
      navigate("/login");
    }
  }, []);

  return (
    <main className="main-content">
      <header>
        <p>Admin Page (Logged in as {user.user_name})</p>
        <button onClick={logout}>Logout</button>
      </header>
      <section>
        <NewEventPanel />
      </section>
      <section>
        <MyEvents />
      </section>
    </main>
  );
};

export default AdminPage;

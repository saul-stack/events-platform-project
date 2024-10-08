import { useContext, useEffect } from "react";

import NewEventPanel from "../AdminPage/NewEventPanel";
import { UserContext } from "../../contexts/UserContext";
import { useLogout } from "../../../account-util-functions";
import { useNavigate } from "react-router-dom";

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
        <p>Admin Page</p>
        <button onClick={logout}>Logout</button>
      </header>
      <section>
        <NewEventPanel />
      </section>
    </main>
  );
};

export default AdminPage;

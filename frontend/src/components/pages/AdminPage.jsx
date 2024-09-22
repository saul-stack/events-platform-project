import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../account-util-functions";
import { UserContext } from "../../contexts/UserContext";
import AdminPanel from "../AdminPage/AdminPanel";

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
    <div className="main-content">
      <div>
        <p>Admin Page </p>
        <button onClick={logout}>Logout</button>
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;

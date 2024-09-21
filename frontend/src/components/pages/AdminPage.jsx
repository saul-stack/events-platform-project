import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { role, user_name } = user;

  useEffect(() => {
    if (role != "admin") {
      navigate("/login");
    }
  }, []);

  function handleLogout() {
    setUser({ name: null });
    navigate("/login");
  }

  return (
    <div className="main-content">
      <div>
        <p>Admin Page </p>
        <form></form>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminPage;

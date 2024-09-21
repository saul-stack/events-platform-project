import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./src/contexts/UserContext";

const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser({ name: null });
    navigate("/login");
  };

  return logout;
};

export { useLogout };

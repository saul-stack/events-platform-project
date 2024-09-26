import { UserContext } from "./src/contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser({ name: null });
    navigate("/login");
  };

  return logout;
};

const toggleWatchEvent = async (
  userId,
  eventId,
  events_watched,
  updateUser,
  navigate
) => {
  if (userId && eventId) {
    let isWatched = events_watched.includes(eventId);
    if (!isWatched) {
      await watchEvent(userId, eventId);
    } else {
      await unwatchEvent(userId, eventId);
    }
    const response = await getUserById(userId);
    updateUser(response);
  } else {
    navigate("/login");
  }
};

export { toggleWatchEvent, useLogout };

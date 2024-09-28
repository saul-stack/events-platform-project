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

const addToGoogleCalendar = (event) => {
  let { description, title, time, date } = event;

  title = title + " @ Bar-None Club";

  const datePart = date.split("T")[0].replace(/-/g, "");
  const timePart = time.split(":").slice(0, 2).join("") + "00";

  const startDate = `${datePart}T${timePart}Z`;
  const endDate = `${datePart}T${(parseInt(time.split(":")[0]) + 2)
    .toString()
    .padStart(2, "0")}${time.split(":")[1]}00Z`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=Bar-None+Club,+St+Stephens.+Street,+Bristol,+BS1+1EQ&ctz=Europe/London}`;
  window.open(googleCalendarUrl, "_blank");
};

export { addToGoogleCalendar, toggleWatchEvent, useLogout };

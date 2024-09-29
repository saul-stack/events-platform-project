import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";

import EventCardSmall from "../global-components/EventCardSmall";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const EventsGrid = ({
  events,
  error,
  titleText,
  isBought,
  showWatchButton,
}) => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const toggleWatchEvent = async (userId, eventId) => {
    let events_watched = user.events_watched || [];
    if (userId && eventId) {
      let isWatched = events_watched.includes(eventId);
      if (!isWatched) await watchEvent(userId, eventId);
      else {
        await unwatchEvent(userId, eventId);
      }
      const response = await getUserById(userId);
      updateUser(response);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="events-grid-container">
      <div className="container-topbar">
        <h2>{titleText}</h2>
      </div>
      <div id="events-grid">
        {events ? (
          events.map((event) => (
            <EventCardSmall
              showWatchButton={showWatchButton}
              key={event.id}
              event={event}
              user={user}
              toggleWatchEvent={toggleWatchEvent}
              isBought={isBought}
            />
          ))
        ) : (
          <div>{error}</div>
        )}
      </div>
    </div>
  );
};
export default EventsGrid;

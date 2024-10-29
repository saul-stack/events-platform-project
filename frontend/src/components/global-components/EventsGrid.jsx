import "../../styles/css/EventsGrid.css";

import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import EventCardSmall from "../global-components/EventCardSmall";

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
    <section className="events-grid-container">
      <header className="container-topbar">
        <h2>{titleText}</h2>
      </header>
      <div id="events-grid">
        {events ? (
          events.map((event, index) => (
            <EventCardSmall
              showWatchButton={showWatchButton}
              key={`${event.id}-${index}`}
              event={event}
              user={user}
              toggleWatchEvent={toggleWatchEvent}
              isBought={isBought}
              titleText={titleText}
            />
          ))
        ) : (
          <div>{error}</div>
        )}
      </div>
    </section>
  );
};
export default EventsGrid;

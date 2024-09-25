import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";

import EventCardSmall from "../global-components/EventCardSmall";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const EventsGrid = ({ events, error, timeline }) => {
  const navigate = useNavigate();

  const { user, updateUser } = useContext(UserContext);

  let events_watched = user.events_watched || [];

  const toggleWatchEvent = async (userId, eventId) => {
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
  const titleText =
    timeline === "upcoming"
      ? "Upcoming Events"
      : timeline === "past"
      ? "Past Events"
      : null;
  return (
    <div id="events-grid">
      {titleText && <h1>{titleText}</h1>}
      {events ? (
        events.map((event) => <EventCardSmall key={event.id} event={event} />)
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
export default EventsGrid;

import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";

import EventCardSmall from "../global-components/EventCardSmall";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const EventsGrid = ({ events, error, timeline }) => {
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

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getEventById } from "../../../api-functions";

const EventCardLarge = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="event-card-large">
      <div className="event-card-large-topbar">
        <div className="event-card-large-topbar-back-button">
          <Link
            to="/events"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <p>back</p>
          </Link>
        </div>
        <h1>{event.title}</h1>
      </div>
      <img src={event.image_url} alt={event.title} />
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Advance Price: £{event.advance_price}</p>
      <p>
        Tickets Sold: {event.tickets_sold} / {event.tickets_total}
      </p>
      <p>Seated: {event.is_seated ? "Yes" : "No"}</p>
    </div>
  );
};

export default EventCardLarge;

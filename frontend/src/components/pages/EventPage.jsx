import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getEventById } from "../../../api-functions";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="main-content">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Advance Price: {event.advance_price}</p>
      <p>
        Tickets Sold: {event.tickets_sold} / {event.tickets_total}
      </p>
      <p>Seated: {event.is_seated ? "Yes" : "No"}</p>
    </div>
  );
};

export default EventPage;

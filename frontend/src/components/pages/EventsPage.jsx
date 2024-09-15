import React, { useEffect, useState } from "react";

import { getAllEvents } from "../../../api-functions";
import EventCard from "../global/EventCard";

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const result = await getAllEvents();
      console.log("result", result);
      setEvents(result);
    };

    fetchAllEvents();
  }, []);

  return (
    <div>
      <h1>EventsPage is here</h1>
      <p>
        This page will display upcoming events as cards in a grid. Possible user
        interactions include viewing details about the event, adding it to
        "my-calendar" and purchasing tickets.
      </p>
      <div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;

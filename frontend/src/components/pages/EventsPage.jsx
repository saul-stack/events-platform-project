import React, { useEffect, useState } from "react";

import { getAllEvents } from "../../../api-functions";
import EventsGrid from "../EventsPage/EventsGrid";

function EventsPage() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const result = await getAllEvents();

      if (Array.isArray(result)) {
        setEvents(result);
      } else {
        setError(result);
      }
    };

    fetchAllEvents();
  }, []);

  return (
    <div className="main-content">
      <h1>Upcoming Events</h1>
      <EventsGrid events={events} error={error} />
    </div>
  );
}

export default EventsPage;

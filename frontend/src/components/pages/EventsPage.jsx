import React, { useEffect, useState } from "react";

import EventsGrid from "../global-components/EventsGrid";
import { getAllEvents } from "../../../api-functions";

function EventsPage() {
  const [events, setEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const result = await getAllEvents();

      if (Array.isArray(result)) {
        const now = new Date();
        const upcoming = result.filter((event) => new Date(event.date) >= now);
        const past = result.filter((event) => new Date(event.date) < now);

        setEvents(result);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } else {
        setError(result);
      }
    };

    fetchAllEvents();
  }, []);

  return (
    <div className="main-content">
      <EventsGrid events={upcomingEvents} timeline="upcoming" />

      <EventsGrid events={pastEvents} timeline="past" />
    </div>
  );
}

export default EventsPage;

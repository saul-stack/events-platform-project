import React, { useEffect, useState } from "react";

import EventsGrid from "../global-components/EventsGrid";
import { getEvents } from "../../../api-functions";

function EventsPage() {
  const [events, setEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getEvents();

      if (Array.isArray(result)) {
        const now = new Date();
        const upcoming = result.filter((event) => new Date(event.date) >= now);
        const past = result.filter((event) => new Date(event.date) < now);

        setEvents(result);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setIsLoading(false);
      } else {
        setError(result);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="main-content">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <EventsGrid
            showWatchButton={true}
            events={upcomingEvents}
            titleText="Upcoming Events"
            enableSorting={true}
          />
          <EventsGrid
            showWatchButton={true}
            events={pastEvents}
            titleText="Past Events"
            enableSorting={true}
          />
        </>
      )}
    </div>
  );
}

export default EventsPage;

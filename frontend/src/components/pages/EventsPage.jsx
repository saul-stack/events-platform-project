import React, { useEffect, useState } from "react";

import { getAllEvents } from "../../../api-functions";
import EventsGrid from "../EventsPage/EventsGrid";

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
    <div className="main-content">
      <h1>Upcoming Events</h1>
      <EventsGrid events={events} />
    </div>
  );
}

export default EventsPage;

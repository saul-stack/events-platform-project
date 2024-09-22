import React, { useContext, useEffect, useState } from "react";

import { getEventById } from "../../../api-functions";
import { UserContext } from "../../contexts/UserContext";
import EventsGrid from "../global-components/EventsGrid";

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const [eventsWatched, setEventsWatched] = useState([]);
  const [eventsBooked, setEventsBooked] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      let watchedEvents = [];
      let bookedEvents = [];

      for (let eventId of user.events_watched) {
        try {
          const event = await getEventById(eventId);
          watchedEvents.push(event);
        } catch (error) {
          console.error(`Failed to fetch event with ID ${eventId}:`, error);
        }
      }

      for (let eventId of user.events_booked) {
        try {
          const event = await getEventById(eventId);
          bookedEvents.push(event);
        } catch (error) {
          console.error(`Failed to fetch event with ID ${eventId}:`, error);
        }
      }

      setEventsWatched(watchedEvents);
      setEventsBooked(bookedEvents);
    };

    fetchEvents();
  }, [user]);

  return (
    <div className="main-content">
      <div>
        <h1>Tickets</h1>
        <EventsGrid events={eventsBooked} />
      </div>
      <div>
        <h1>Interested</h1>
        <EventsGrid events={eventsWatched} />
      </div>
    </div>
  );
};

export default MyEvents;

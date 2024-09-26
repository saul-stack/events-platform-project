import React, { useContext, useEffect, useState } from "react";

import EventsGrid from "../global-components/EventsGrid";
import { UserContext } from "../../contexts/UserContext";
import { getEventById } from "../../../api-functions";

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const [eventsWatched, setEventsWatched] = useState([]);
  const [eventsBooked, setEventsBooked] = useState([]);
  const [filteredEventsWatched, setFilteredEventsWatched] = useState([]);

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
      setFilteredEventsWatched(
        watchedEvents.filter(
          (watchedEvent) =>
            !bookedEvents.find(
              (bookedEvent) => bookedEvent.id === watchedEvent.id
            )
        )
      );
    };

    fetchEvents();
  }, [user]);

  return (
    <div className="main-content">
      <div id="my-events">
        {eventsBooked.length > 0 && (
          <div>
            <EventsGrid events={eventsBooked} titleText="My Tickets " />
          </div>
        )}

        {filteredEventsWatched.length > 0 && (
          <div>
            <EventsGrid events={filteredEventsWatched} titleText="Interested" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;

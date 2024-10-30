import React, { useContext, useEffect, useState } from "react";

import { getEventById } from "../../../api-functions";
import { UserContext } from "../../contexts/UserContext";
import EventsGrid from "../global-components/EventsGrid";

const MyEvents = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

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
        } catch (error) {}
      }

      for (let eventId of user.events_booked) {
        try {
          const event = await getEventById(eventId);
          bookedEvents.push(event);
        } catch (error) {}
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
      setIsLoading(false);
    };

    fetchEvents();
  }, [user]);

  return (
    <div>
      {user && isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {(eventsBooked.length > 0 || filteredEventsWatched.length > 0) && (
            <div id="my-events">
              {eventsBooked.length > 0 && (
                <div>
                  <EventsGrid
                    events={eventsBooked}
                    titleText="My Tickets"
                    isBought={true}
                    showWatchButton={false}
                    showViewButton={false}
                  />
                </div>
              )}

              {filteredEventsWatched.length > 0 && (
                <div>
                  <EventsGrid
                    showBuyButton={true}
                    events={filteredEventsWatched}
                    titleText="Interested"
                    showWatchButton={true}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyEvents;

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getEvents } from "../../../api-functions";
import EventsGrid from "../global-components/EventsGrid";

function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = { sort: "date, time" };
        const result = await getEvents(params);

        if (Array.isArray(result)) {
          const now = new Date();
          const upcoming = result.filter(
            (event) => new Date(event.date) >= now
          );
          const past = result.filter((event) => new Date(event.date) < now);

          setEvents(result);
          setUpcomingEvents(upcoming);
          setPastEvents(past);
          setIsLoading(false);
        } else {
          setError(result);
        }
      } catch (error) {
        navigate("/failure", { state: { errorMessage: error.message } });
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    setRefresh(!refresh);
  }, []);

  return (
    <main className="main-content">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <section>
            <EventsGrid
              showWatchButton={true}
              events={upcomingEvents}
              titleText="Upcoming Events"
              enableSorting={true}
            />
          </section>
          <section>
            <EventsGrid
              showBuyButton={false}
              showWatchButton={false}
              events={pastEvents}
              titleText="Previous Events"
              enableSorting={false}
            />
          </section>
        </>
      )}
    </main>
  );
}

export default EventsPage;

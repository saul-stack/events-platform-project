import "../../styles/css/EventsGrid.css";

import { useContext, useEffect, useState } from "react";
import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";

import { useNavigate } from "react-router-dom";
import { getEvents } from "../../../api-functions";
import { UserContext } from "../../contexts/UserContext";
import EventCardSmall from "../global-components/EventCardSmall";

const EventsGrid = ({
  error,
  titleText,
  isBought,
  showWatchButton,
  refresh,
  setRefresh,
}) => {
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const updateUserObject = async () => {
      const response = await getUserById(user.id);
      updateUser(response);
    };

    const updateEvents = async () => {
      if (titleText == "Upcoming Events") {
        const params = { sort: "date, time" };
        const response = await getEvents(params);
        setEvents(
          response.filter((event) => new Date(event.date) >= new Date())
        );
      } else if (titleText == "Previous Events") {
        const params = { sort: "date, time" };
        const response = await getEvents(params);
        setEvents(
          response.filter((event) => new Date(event.date) < new Date())
        );
      } else {
        navigate("/failure", {
          state: {
            errorMessage: "There was an error loading our upcoming events.",
          },
        });
      }
    };

    if (user.id) {
      updateUserObject();
    }
    if (refresh && setRefresh) {
      setRefresh(!refresh);
    }
    updateEvents();
  }, []);

  const toggleWatchEvent = async (userId, eventId) => {
    let events_watched = user.events_watched || [];
    try {
      if (userId && eventId) {
        let isWatched = events_watched.includes(eventId);
        if (!isWatched) await watchEvent(userId, eventId);
        else {
          await unwatchEvent(userId, eventId);
        }
        const response = await getUserById(userId);
        updateUser(response);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/failure", { state: { errorMessage: error.message } });
    }
  };

  return (
    <section className="events-grid-container">
      <header className="container-topbar">
        <h2>{titleText}</h2>
      </header>
      <div id="events-grid">
        {events ? (
          events.map((event, index) => (
            <EventCardSmall
              showWatchButton={showWatchButton}
              key={`${event.id}-${index}`}
              event={event}
              user={user}
              toggleWatchEvent={toggleWatchEvent}
              isBought={isBought}
              titleText={titleText}
            />
          ))
        ) : (
          <div>{error}</div>
        )}
      </div>
    </section>
  );
};
export default EventsGrid;

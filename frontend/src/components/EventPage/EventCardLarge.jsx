import { Link, useNavigate, useParams } from "react-router-dom";
import {
  formatDateForFrontend as formatDate,
  formatTimeForFrontend as formatTime,
} from "../../../js-util-functions";
import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import { addToGoogleCalendar } from "../../../account-util-functions";
import { getEventById } from "../../../api-functions";

const EventCardLarge = ({ handleBuyButtonClick }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [event, setEvent] = useState(null);

  const handleAddToCalendar = () => {
    addToGoogleCalendar(event);
  };

  const handleWatchButtonClick = () => {
    const toggleWatchEvent = async (userId, eventId) => {
      let events_watched = user.events_watched || [];
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
    };
    toggleWatchEvent(user.id, event.id);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Event not found</div>;
  }
  const { title, advance_price, description, is_seated, image_url } = event;

  const date = formatDate(event.date);
  const time = formatTime(event.time);

  return (
    <div className="event-card-large">
      <div className="topbar">
        <div className="event-card-large-topbar-back-button">
          <Link
            to="/events"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <p>back</p>
          </Link>
        </div>
        <h1>{title}</h1>
      </div>

      <div className="image-and-description">
        <img className="image" src={image_url} alt={title} />
        <div className="description">
          <p>{description}</p>
        </div>
      </div>

      <div className="details-container">
        <div className="details-top">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className="details-bottom">
          <p>£{advance_price}</p>
          {is_seated ? <p>Seated</p> : <p>Standing</p>}
        </div>
        <button onClick={handleBuyButtonClick}>BUY TICKETS</button>

        {user === null || !user?.events_watched?.includes(event.id) ? (
          <button onClick={handleWatchButtonClick}>WATCH EVENT</button>
        ) : (
          <button onClick={handleWatchButtonClick}>UNWATCH EVENT</button>
        )}
      </div>
      <button onClick={handleAddToCalendar}>Add to Google Calendar</button>
    </div>
  );
};

export default EventCardLarge;

import "../../styles/css/EventCardSmall.css";

import {
  formatDateForFrontend as formatDate,
  formatTimeForFrontend as formatTime,
} from "../../../js-util-functions";
import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

const EventCardSmall = ({ event, user }) => {
  const buttonContainerRef = useRef(null);

  const navigate = useNavigate();
  const [reload, setReload] = useState(false); // State variable to trigger reload

  const defaultImageUrl =
    "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const handleClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleWatchEvent = (userId, eventId) => {
    console.log(reload);
    setReload(!reload);
    if (userId && eventId) {
      watchEvent(userId, eventId);
    } else {
      navigate("/login");
    }
  };

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(event.date).toLocaleDateString(undefined, dateOptions);
  const time = formatTime(event.time);

  const { id } = event;

  const events_watched = user.events_watched ? user.events_watched : [];
  const events_booked = user.events_booked ? user.events_booked : [];
  const isBooked = events_booked.includes(id);
  const isWatched = events_watched.includes(id);

  useEffect(() => {
    if (buttonContainerRef.current) {
      const numberOfButtons = buttonContainerRef.current.children.length;
      buttonContainerRef.current.style.gridTemplateColumns = `repeat(${numberOfButtons}, 1fr)`;
    }
  }, [isWatched, isBooked, reload]);

  return (
    <div className="event-card-small">
      <div className="event-card-link" onClick={() => handleClick(event.id)}>
        <div
          className="image"
          style={{
            backgroundImage: `url(${
              event.image_url.length > 0
                ? event.image_url
                : "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            })`,
          }}
        ></div>
        <div className="details">
          <div className="default-view">
            <h1 className="title">{event.title}</h1>
            <div className="type-and-time-container">
            <p className="type">{event.event_type}</p>
            <p className="time">{time}</p>
            </div>
            <p className="date">{date}</p>
          </div>
          <div className="hover-view">
            <p>{event.description}</p>
          </div>
        </div>
      </div>

      <div className="button-container" ref={buttonContainerRef}>
        {!isBooked ? (
          <button href="#" className="button">
            BUY TICKETS
          </button>
        ) : (
          <button href="#" className="button">
            VIEW MY TICKETS
          </button>
        )}

        {!isBooked &&
          (!isWatched ? (
            <button
              onClick={() => handleWatchEvent(user.id, event.id)}
              className="button"
            >
              WATCH EVENT
            </button>
          ) : (
            <button href="#" className="button">
              WATCHED
            </button>
          ))}
      </div>
    </div>
  );
};

export default EventCardSmall;

import "../../styles/css/EventCardSmall.css";

import {
  formatDateForFrontend as formatDate,
  formatTimeForFrontend as formatTime,
} from "../../../js-util-functions";
import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

const EventCardSmall = ({ event, user, toggleWatchEvent }) => {
  const buttonContainerRef = useRef(null);
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  let { id, date, time } = event;

  date = formatDate(date);
  time = formatTime(time);

  let events_booked = user.events_booked || [];
  let events_watched = user.events_watched || [];

  let isBooked = events_booked.includes(id);
  let isWatched = events_watched.includes(id);

  useEffect(() => {
    isWatched = events_watched.includes(id);
  }, [events_booked, events_watched]);

  useEffect(() => {
    if (buttonContainerRef.current) {
      const numberOfButtons = buttonContainerRef.current.children.length;
      buttonContainerRef.current.style.gridTemplateColumns = `repeat(${numberOfButtons}, 1fr)`;
    }
  }, [isWatched, isBooked]);

  return (
    <div className="event-card-small">
      <div
        className="event-card-link"
        onClick={() => navigate(`/events/${id}`)}
      >
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

        {!isBooked && (
          <button
            onClick={() => toggleWatchEvent(user.id, event.id)}
            href="#"
            className="button"
          >
            {isWatched ? "Unwatch" : "Watch Event"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCardSmall;

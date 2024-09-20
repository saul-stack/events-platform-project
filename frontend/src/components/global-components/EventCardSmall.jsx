import "../../styles/EventCardSmall.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../../js-util-functions";

const EventCardSmall = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(`Event clicked: ${id}`);
    navigate(`/events/${id}`);
  };

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(event.date).toLocaleDateString(undefined, dateOptions);

  const time = formatTime(event.time);

  return (
    <div className="event-card-small" onClick={() => handleClick(event.id)}>
      <div
        className="event-image"
        style={{ backgroundImage: `url(${event.image_url})` }}
      ></div>
      <div className="event-details">
        <p className="event-date">{date}</p>
        <h1 className="event-title">{event.title}</h1>
        <p className="event-type">{event.event_type}</p>
        <p className="event-time">{time}</p>
      </div>
      <a href="#" className="event-button">
        MORE INFO
      </a>
    </div>
  );
};

export default EventCardSmall;

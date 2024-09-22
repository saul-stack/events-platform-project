import "../../styles/EventCardSmall.css";

import React from "react";
import { formatTime } from "../../../js-util-functions";
import { useNavigate } from "react-router-dom";

const EventCardSmall = ({ event }) => {
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const handleClick = (id) => {
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
        style={{
          backgroundImage: `url(${
            event.image_url.length > 0
              ? event.image_url
              : "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          })`,
        }}
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

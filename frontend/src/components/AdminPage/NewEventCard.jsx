import React, { useEffect } from "react";

import { formatTime } from "../../../js-util-functions";

const NewEventCard = ({ event }) => {
  useEffect(() => {
    console.log(event);
  }, [event]);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(event.date).toLocaleDateString(undefined, dateOptions);
  const time = formatTime(event.time);

  const { event_type, title, image_url, id } = event;

  return (
    <div className="new-event-card">
      <div
        className="event-image"
        style={{ backgroundImage: `url(${image_url})` }}
      ></div>
      <div className="event-details">
        <p className="event-date">{date}</p>
        <h1 className="event-title">{title}</h1>
        <p className="event-type">{event_type}</p>
        <p className="event-time">{time}</p>
      </div>
      <a href="#" className="event-button">
        ADD EVENT
      </a>
    </div>
  );
};

export default NewEventCard;

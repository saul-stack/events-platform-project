import React from "react";

const EventCard = ({ event }) => {
  const cardStyle = {
    backgroundImage: `url(${event.image_url})`,
  };

  return (
    <div id="event-card" style={cardStyle}>
      <h2>{event.title}</h2>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
    </div>
  );
};

export default EventCard;

import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, eventId }) => {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundImage: `url(${event.image_url})`,
  };

  const handleClick = (id) => {
    console.log(`Event clicked: ${id}`);
    navigate(`/events/${id}`);
  };

  return (
    <div
      id="event-card"
      style={cardStyle}
      onClick={() => handleClick(event.id)}
    >
      <h2>{event.title}</h2>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
    </div>
  );
};

export default EventCard;

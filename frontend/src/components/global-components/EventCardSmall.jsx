import React from "react";
import { useNavigate } from "react-router-dom";

const EventCardSmall = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(`Event clicked: ${id}`);
    navigate(`/events/${id}`);
  };

  const cardStyle = {
    backgroundImage: `url(${event.image_url})`,
  };

  const date = new Date(event.date).toLocaleDateString();

  return (
    <div
      id="event-card"
      style={cardStyle}
      onClick={() => handleClick(event.id)}
    >
      <h2>{event.title}</h2>
      <p>{date}</p>
      <p>{event.time}</p>
    </div>
  );
};

export default EventCardSmall;

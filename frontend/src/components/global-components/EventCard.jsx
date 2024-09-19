const EventCard = ({ event }) => {
  return (
    <div id="event-card">
      <h2>{event.title}</h2>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.location}</p>
    </div>
  );
};

export default EventCard;

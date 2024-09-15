import EventCard from "../global-components/EventCard";
const EventsGrid = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
export default EventsGrid;

import EventCard from "../global-components/EventCard";
const EventsGrid = ({ events, error }) => {
  return (
    <div id="events-grid">
      {events ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
export default EventsGrid;

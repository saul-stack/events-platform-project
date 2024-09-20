import EventCardSmall from "../global-components/EventCardSmall";

const EventsGrid = ({ events, error }) => {
  return (
    <div id="events-grid">
      {events ? (
        events.map((event) => <EventCardSmall key={event.id} event={event} />)
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
export default EventsGrid;

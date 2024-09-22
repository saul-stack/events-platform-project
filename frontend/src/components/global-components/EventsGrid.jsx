import EventCardSmall from "../global-components/EventCardSmall";

const EventsGrid = ({ events, error, timeline }) => {
  const titleText =
    timeline === "upcoming"
      ? "Upcoming Events"
      : timeline === "past"
      ? "Past Events"
      : null;
  return (
    <div id="events-grid">
      {titleText && <h1>{titleText}</h1>}
      {events ? (
        events.map((event) => <EventCardSmall key={event.id} event={event} />)
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};
export default EventsGrid;

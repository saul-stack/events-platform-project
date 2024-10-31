import "../../styles/css/EventCardSmall.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  formatDateForFrontend as formatDate,
  formatTimeForFrontend as formatTime,
} from "../../../js-util-functions";

const EventCardSmall = ({
  event,
  user,
  toggleWatchEvent,
  showWatchButton,
  titleText,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const buttonContainerRef = useRef(null);
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  let { id, date, time, advance_price, is_ticketed } = event;

  date = formatDate(date);
  time = formatTime(time);
  const ticketsAvailable = event.tickets_total - event.tickets_sold;

  const location = useLocation();
  let showViewButton = true;
  if (
    (location && location.pathname === "/account") ||
    (location && location.pathname === "/admin")
  ) {
    showViewButton = false;
  }

  let events_booked = user.events_booked || [];
  let events_watched = user.events_watched || [];

  let isBooked = events_booked.includes(id);
  let isWatched = events_watched.includes(id);
  const eventIsUpcoming = new Date(event.date) > new Date();

  let showBuyButton = is_ticketed && eventIsUpcoming;

  useEffect(() => {
    isWatched = events_watched.includes(id);
  }, [events_booked, events_watched]);

  useEffect(() => {
    if (buttonContainerRef.current) {
      const numberOfButtons = buttonContainerRef.current.children.length;
      buttonContainerRef.current.style.gridTemplateColumns = `repeat(${numberOfButtons}, 1fr)`;
    }
  }, [isWatched, isBooked]);

  const handleWatchButtonClick = async (userId, eventId) => {
    setIsLoading(true);
    await toggleWatchEvent(userId, eventId);
    setIsLoading(false);
  };

  const handleBuyTicket = () => {
    if (!user.id) {
      navigate("/login", { state: { redirectEventId: id } });
      return;
    }
    navigate(`/events/${id}`);
  };

  const handleClick = () => {
    navigate(`/account`);
  };
  return (
    <div className="event-card-small">
      <div
        className="event-card-link"
        onClick={() => navigate(`/events/${id}`)}
      >
        <div className="image-container">
          {
            <div className="type-and-time-container">
              <div className="type">
                <p
                  className={`${event.event_type
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {event.event_type}
                </p>
              </div>
            </div>
          }
          {advance_price === 0 && <p className="free-icon">FREE</p>}
          {ticketsAvailable < 1 &&
            eventIsUpcoming &&
            is_ticketed &&
            titleText != "My Tickets" && (
              <p className="sold-out-icon">SOLD OUT</p>
            )}

          <div
            className="image"
            style={{
              backgroundImage: `url(${
                event.image_url.length > 0
                  ? event.image_url
                  : "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              })`,
            }}
          ></div>
        </div>
        <div className="details">
          <div className="default-view">
            <h1 className="title">{event.title}</h1>
            <p className="date">
              {date} @ {time}
            </p>
          </div>
          <div className="hover-view">
            <div className="description">
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container" ref={buttonContainerRef}>
        {!isBooked && showBuyButton ? (
          <>
            {ticketsAvailable > 0 ? (
              <button href="#" onClick={handleBuyTicket} className="buy-button">
                {advance_price === 0 ? "GET TICKETS" : "BUY TICKETS"}
              </button>
            ) : (
              <button href="#" className="button-sold-out">
                GET TICKETS{" "}
              </button>
            )}
          </>
        ) : (
          <>
            {showViewButton && isBooked && (
              <button onClick={handleClick} href="#" className="button">
                VIEW MY TICKETS
              </button>
            )}
          </>
        )}
        {!isBooked && showWatchButton && (
          <>
            <div className="watch-button-container">
              {isWatched ? (
                <button
                  disabled={isLoading}
                  onClick={() => handleWatchButtonClick(user.id, event.id)}
                  href="#"
                  className="watch-button-watched"
                >
                  {" "}
                  Watching
                </button>
              ) : (
                <button
                  disabled={isLoading}
                  onClick={() => handleWatchButtonClick(user.id, event.id)}
                  href="#"
                  className="watch-button-unwatched"
                >
                  {" "}
                  Watch
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCardSmall;

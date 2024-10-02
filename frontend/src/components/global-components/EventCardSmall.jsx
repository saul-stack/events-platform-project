import "../../styles/css/EventCardSmall.css";

import { useEffect, useRef } from "react";
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
  showBuyButton,
}) => {
  const buttonContainerRef = useRef(null);
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  let { id, date, time, advance_price, is_seated } = event;

  date = formatDate(date);
  time = formatTime(time);

  const location = useLocation();
  let showViewButton = true;
  if (location && location.pathname === "/account") {
    showViewButton = false;
  }

  let events_booked = user.events_booked || [];
  let events_watched = user.events_watched || [];

  let isBooked = events_booked.includes(id);
  let isWatched = events_watched.includes(id);

  useEffect(() => {
    isWatched = events_watched.includes(id);
  }, [events_booked, events_watched]);

  useEffect(() => {
    if (buttonContainerRef.current) {
      const numberOfButtons = buttonContainerRef.current.children.length;
      buttonContainerRef.current.style.gridTemplateColumns = `repeat(${numberOfButtons}, 1fr)`;
    }
  }, [isWatched, isBooked]);

  const handleBuyTicket = () => {
    if (!user.id) {
      navigate("/login");
      return;
    }
    navigate(`/events/${id}`, { state: { showBuyForm: true } });
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
          {advance_price === 0 && <p className="free-icon">FREE</p>}

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
              <p className="time">{time}</p>
            </div>
            <p className="date">{date}</p>
          </div>
          <div className="hover-view">
            <div className="description">
              <h1 className="title">{event.title}</h1>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container" ref={buttonContainerRef}>
        {!isBooked && showBuyButton ? (
          <button href="#" onClick={handleBuyTicket} className="buy-button">
            {advance_price === 0 ? "GET TICKETS" : "BUY TICKETS"}
          </button>
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
          <div className="watch-button-container">
            {isWatched ? (
              <button
                onClick={() => toggleWatchEvent(user.id, event.id)}
                href="#"
                className="watch-button-watched"
              >
                Watching ✔️
              </button>
            ) : (
              <button
                onClick={() => toggleWatchEvent(user.id, event.id)}
                href="#"
                className="watch-button-unwatched"
              >
                Watch Event
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCardSmall;

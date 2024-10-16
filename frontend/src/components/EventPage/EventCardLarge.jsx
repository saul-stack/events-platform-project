import "../../styles/css/EventCardLarge.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  formatDateForFrontend as formatDate,
  formatTimeForFrontend as formatTime,
} from "../../../js-util-functions";
import { getUserById, unwatchEvent, watchEvent } from "../../../api-functions";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
import { addToGoogleCalendar } from "../../../account-util-functions";
import { getEventById } from "../../../api-functions";

const EventCardLarge = ({ handleBuyButtonClick }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const handleAddToCalendar = () => {
    addToGoogleCalendar(event);
  };

  const handleAttemptPurchase = () => {
    if (ticketsAvailable > 0) {
      handleBuyButtonClick();
    }
  };

  const handleWatchButtonClick = async () => {
    const toggleWatchEvent = async (userId, eventId) => {
      try {
        let events_watched = user.events_watched || [];
        if (userId && eventId) {
          let isWatched = events_watched.includes(eventId);
          if (!isWatched) await watchEvent(userId, eventId);
          else {
            await unwatchEvent(userId, eventId);
          }
          const response = await getUserById(userId);
          updateUser(response);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/failure", { state: { errorMessage: error.message } });
      }
    };
    toggleWatchEvent(user.id, event.id);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        navigate("/failure", { state: { errorMessage: error.message } });
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Loading</div>;
  }
  const { title, advance_price, description, is_seated, image_url } = event;

  let isEventBooked = false;
  if (user.events_booked != null) {
    isEventBooked = user.events_booked.includes(event.id);
  }

  const eventIsUpcoming = new Date(event.date) > new Date();

  const date = formatDate(event.date);
  const time = formatTime(event.time);
  const ticketsAvailable = event.tickets_total - event.tickets_sold;

  return (
    <div className="event-card-large">
      <div className="topbar">
        <div className="event-card-large-topbar-back-button">
          <Link
            to="/events"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <p>back</p>
          </Link>
        </div>
        <h2 className="title">
          {ticketsAvailable < 1 ? "SOLD OUT: " : ""}
          {title}
        </h2>
      </div>

      <div className="image-and-description">
        <img className="image" src={image_url} alt={title} />
        <div className="description">
          <p>{description}</p>
        </div>
      </div>

      <div className="details-container">
        <div className="details-top">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className="details-bottom">
          {advance_price > 0 ? <p>£{advance_price}</p> : <p>Free</p>}
          {is_seated ? <p>Seated</p> : <p>Standing</p>}
        </div>

        {user.role != "admin" && eventIsUpcoming && (
          <div className="watch-button-container">
            {!isEventBooked && (
              <>
                {ticketsAvailable > 0 ? (
                  <>
                    {advance_price > 0 ? (
                      <button onClick={handleAttemptPurchase}>
                        Buy Tickets
                      </button>
                    ) : (
                      <button onClick={handleAttemptPurchase}>
                        Get Tickets
                      </button>
                    )}
                  </>
                ) : (
                  <button className="button-sold-out">Get Tickets</button>
                )}
              </>
            )}

            {user === null || !user?.events_watched?.includes(event.id) ? (
              <button onClick={handleWatchButtonClick}>Watch</button>
            ) : (
              <button
                className="watch-button-watched"
                onClick={handleWatchButtonClick}
              >
                Unwatch
              </button>
            )}
            <button onClick={handleAddToCalendar}>Add to Calendar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCardLarge;

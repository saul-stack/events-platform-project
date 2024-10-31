import "../../styles/css/EventCardLarge.css";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getEventById,
  getUserById,
  unwatchEvent,
  watchEvent,
} from "../../../api-functions";
import {
  formatDateForFrontend as formatDate,
  formatTimeForFrontend as formatTime,
} from "../../../js-util-functions";

import { addToGoogleCalendar } from "../../../account-util-functions";
import { UserContext } from "../../contexts/UserContext";
import LoadingCard from "../global-components/LoadingCard";
import DeleteEventForm from "./DeleteEventForm";

const EventCardLarge = ({ handleBuyButtonClick }) => {
  const [isWatching, setIsWatching] = useState(false);
  const { eventId } = useParams();
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const [usersWatchingArray, setUsersWatchingArray] = useState([]);
  let updatedUsersWatchingArray = [];

  const [attendeesArray, setAttendeesArray] = useState([]);
  let updatedAttendeesArray = [];

  const handleAddToCalendar = () => {
    addToGoogleCalendar(event);
  };

  const handleDeleteEvent = async () => {
    setShowDeleteForm(true);
  };

  const handleAttemptPurchase = () => {
    if (ticketsAvailable > 0) {
      handleBuyButtonClick();
    }
  };

  const handleWatchButtonClick = async () => {
    setIsLoading(true);
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
          setRefresh(!refresh);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/failure", { state: { errorMessage: error.message } });
      } finally {
        setIsLoading(false);
      }
    };
    toggleWatchEvent(user.id, event.id);
  };

  useEffect(() => {
    const checkIfWatched = async () => {
      setIsWatching(false);
      if (user.id) {
        const userObject = await getUserById(user.id);
        const isWatched = userObject.events_watched.includes(Number(eventId));
        setIsWatching(isWatched);
      }
    };

    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
        const attendees = eventData.users_booked;
        for (let attendee of attendees) {
          const user = await getUserById(attendee);
          updatedAttendeesArray.push(user);
        }
        setAttendeesArray(updatedAttendeesArray);

        const usersWatching = eventData.users_watched;
        for (let userWatching of usersWatching) {
          const user = await getUserById(userWatching);
          updatedUsersWatchingArray.push(user);
        }
        setUsersWatchingArray(updatedUsersWatchingArray);
      } catch (error) {
        navigate("/failure", { state: { errorMessage: error.message } });
      }
    };

    checkIfWatched();
    fetchEvent();
  }, [eventId, refresh]);

  if (!event) {
    return <div>Loading</div>;
  }
  const {
    title,
    advance_price,
    description,
    is_seated,
    image_url,
    is_ticketed,
    tickets_sold,
    tickets_total,
  } = event;

  let isEventBooked = false;
  if (user.events_booked != null) {
    isEventBooked = user.events_booked.includes(event.id);
  }

  const eventIsUpcoming = new Date(event.date) > new Date();

  const date = formatDate(event.date);
  const time = formatTime(event.time);
  const ticketsAvailable = event.tickets_total - event.tickets_sold;

  return (
    <>
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
            {!eventIsUpcoming ? "ENDED: " : ""}
            {eventIsUpcoming && ticketsAvailable < 1 && is_ticketed
              ? "SOLD OUT: "
              : ""}
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
          {showDeleteForm && (
            <DeleteEventForm
              showDeleteForm={showDeleteForm}
              setShowDeleteForm={setShowDeleteForm}
            />
          )}

          {eventIsUpcoming && (
            <>
              {isLoading ? (
                <LoadingCard />
              ) : (
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

                  <button onClick={handleWatchButtonClick}>
                    {isWatching ? "Unwatch" : "Watch"}
                  </button>
                  <button onClick={handleAddToCalendar}>Add to Calendar</button>
                </div>
              )}
            </>
          )}
          {user.role === "admin" && (
            <>
              {!showDeleteForm && (
                <button onClick={handleDeleteEvent}>DELETE EVENT</button>
              )}
              {is_ticketed && (
                <>
                  <div className="ticket-numbers">
                    <p>
                      Tickets sold: {tickets_sold}/{tickets_total}
                    </p>
                    <p>Tickets available: {tickets_total - tickets_sold}</p>
                  </div>

                  {event.users_booked.length > 0 && (
                    <div className="attendees">
                      <h2>Attendees</h2>

                      {attendeesArray.map((attendee, index) => (
                        <ul key={index}>
                          <li>
                            <p>
                              {attendee.first_name} {attendee.last_name} (
                              {attendee.user_name}) ID : {attendee.id}
                            </p>
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}

                  {event.users_watched.length > 0 && (
                    <div className="users-watching">
                      <h2>Users Interested</h2>

                      {usersWatchingArray.map((user, index) => (
                        <ul key={index}>
                          <li>
                            <p>
                              {user.first_name} {user.last_name} (
                              {user.user_name}) ID : {user.id}
                            </p>
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventCardLarge;

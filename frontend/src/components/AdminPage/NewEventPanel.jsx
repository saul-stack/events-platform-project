import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { postNewEvent } from "../../../api-functions";
import { formatDateForPostgres } from "../../../js-util-functions";
import NewEventCard from "./NewEventCard";

let currentDate = new Date();

const dateTomorrow = new Date(currentDate);
dateTomorrow.setDate(dateTomorrow.getDate() + 1);

const formattedDate = formatDateForPostgres(dateTomorrow);
const defaultEvent = {
  "title": "",
  "date": formattedDate,
  "time": "00:00",
  "description": "...",
  "event_type": "",
  "advance_price": 0.0,
  "door_price": 0.0,
  "tickets_total": 0,
  "tickets_sold": 0,
  "is_seated": false,
  "is_ticketed": false,
  "is_recurring": false,
  "image_url":
    "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "users_booked": [],
  "users_watched": [],
};
const NewEventPanel = () => {
  const [newEvent, setNewEvent] = useState(defaultEvent);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewEvent(newEvent);
    setNewEvent(defaultEvent);
    navigate("/events");
  };

  return (
    <div className="new-event-panel">
      <div>
        <div id="new-event-form">
          <p>Add new event</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newEvent.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={newEvent.time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleChange}
                required
                style={{ resize: "none", width: "80%" }}
              ></textarea>
            </div>
            <div>
              <label htmlFor="event_type">Event Type:</label>
              <select
                id="event_type"
                name="event_type"
                value={newEvent.event_type}
                onChange={handleChange}
                required
              >
                <option value="">Select an event type</option>
                <option value="Music">Music</option>
                <option value="Comedy">Comedy</option>
                <option value="Social">Social</option>
                <option value="Workshop">Workshop</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="is_ticketed">Ticketed:</label>
              <input
                type="checkbox"
                id="is_ticketed"
                name="is_ticketed"
                checked={newEvent.is_ticketed}
                onChange={handleChange}
              />
            </div>
            {newEvent.is_ticketed && (
              <>
                <div>
                  <label htmlFor="advance_price">Advance Price:</label>
                  <input
                    type="number"
                    id="advance_price"
                    name="advance_price"
                    value={newEvent.advance_price}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="door_price">Door Price:</label>
                  <input
                    type="number"
                    id="door_price"
                    name="door_price"
                    value={newEvent.door_price}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tickets_total">Tickets Available:</label>
                  <input
                    type="number"
                    id="tickets_total"
                    name="tickets_total"
                    value={newEvent.tickets_total}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="is_seated">Seated:</label>
              <input
                type="checkbox"
                id="is_seated"
                name="is_seated"
                checked={newEvent.is_seated}
                onChange={handleChange}
              />
            </div>
            <div></div>
            <div>
              <label htmlFor="image_url">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                name="image_url"
                value={newEvent.image_url}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
      <NewEventCard event={newEvent} />
    </div>
  );
};

export default NewEventPanel;

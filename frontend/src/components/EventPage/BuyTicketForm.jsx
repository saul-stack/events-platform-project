import React, { useEffect, useState } from "react";

import { getEventById } from "../../../api-functions";
import { useParams } from "react-router-dom";

const BuyTicketForm = ({ setShowBuyTicketForm, showBuyTicketForm }) => {
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleBackButtonClick = () => {
    setShowBuyTicketForm(!showBuyTicketForm);
  };

  const handleTicketsChange = (e) => {
    const value = Number(e.target.value);
    setTickets(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("trying to buy tickets");
  };

  return (
    <div id="buy-ticket-form">
      <button onClick={handleBackButtonClick}>Go back</button>
      <h1>Buy tickets</h1>

      <p>Tickets Remaining {event.tickets_total - event.tickets_sold}</p>
      <p>£{event.advance_price * tickets}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tickets">Number of tickets:</label>
        <input
          type="number"
          id="tickets"
          name="tickets"
          value={tickets}
          onChange={handleTicketsChange}
          min="1"
        />
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

export default BuyTicketForm;

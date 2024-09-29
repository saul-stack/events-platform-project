import React, { useEffect, useState } from "react";

import { getEventById } from "../../../api-functions";
import { useParams } from "react-router-dom";

const BuyTicketForm = ({ setShowBuyTicketForm, showBuyTicketForm }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);

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
      {event && event.advance_price > 0 ? (
        <h1>Buy tickets</h1>
      ) : (
        <h1>Get Free tickets</h1>
      )}
      {event && (
        <>
          <p>Tickets Remaining {event.tickets_total - event.tickets_sold}</p>
          <p> Max 1 ticket per person.</p>

          {event.advance_price > 0 ? (
            <p>£{event.advance_price}</p>
          ) : (
            <p>Free</p>
          )}
        </>
      )}
      <form onSubmit={handleSubmit}>
        {event && event.advance_price > 0 ? (
          <button type="submit">Buy</button>
        ) : (
          <button type="submit">Get</button>
        )}
      </form>
    </div>
  );
};

export default BuyTicketForm;

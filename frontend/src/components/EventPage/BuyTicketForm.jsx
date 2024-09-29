import React, { useEffect, useState } from "react";
import { getEventById, sendStripePaymentRequest } from "../../../api-functions";

import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

const STRIPE_PUBLIC_KEY =
  "pk_test_51Q4OtrKPnPjjFVwWr0qpGmeUl6V4tx2F9whrrPCmvHX1ZHfLyIwOhKal9lyydienbwnJm9wnIC9n3AhbjJV4YFnU00BwXLxsJO";

const BuyTicketForm = ({ setShowBuyTicketForm, showBuyTicketForm }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    const response = await sendStripePaymentRequest(event.id);
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    try {
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      console.log("hi");

      console.log(result);
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }

    /*

    console.log(result, "<<<<<<<<<<<<");

    if (result.success === true) {
      const newUser = {
        ...user,
        events_booked: [...user.events_booked, Number(eventId)],
      };

      updateUser(newUser);
      navigate("/account");
      console.log(result);
    } */
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

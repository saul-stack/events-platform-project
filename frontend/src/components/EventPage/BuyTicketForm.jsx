import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext } from "react";
import { getEventById } from "../../../api-functions";
import { UserContext } from "../../contexts/UserContext";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:9090/api/";
const STRIPE_PUBLIC_KEY = process.env.VITE_STRIPE_PUBLIC_KEY || "";

const api = axios.create({ baseURL: BASE_URL });

const BuyTicketForm = ({ setShowBuyTicketForm, showBuyTicketForm }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext);

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

  const makePayment = async (e) => {
    if (!user.id) {
      navigate("/login", { state: { redirectEventId: eventId } });
      return;
    }

    e.preventDefault();
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    const url = `${BASE_URL}/create-checkout-session`;
    const body = { event };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
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
      <form onSubmit={makePayment}>
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

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BuyTicketForm from "../EventPage/BuyTicketForm";
import EventCardLarge from "../EventPage/EventCardLarge";
import { UserContext } from "../../contexts/UserContext";

const EventPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { showBuyForm } = location.state || {};
  const navigate = useNavigate();

  const [showBuyTicketForm, setShowBuyTicketForm] = useState(false);

  useEffect(() => {
    if (showBuyForm) {
      setShowBuyTicketForm(true);
    }
  }, [showBuyForm]);

  const handleBuyButtonClick = () => {
    setShowBuyTicketForm(!showBuyTicketForm);
    if (!user.id) {
      navigate("/login");
    }
  };

  return (
    <main className="main-content">
      {!showBuyTicketForm && (
        <article>
          <EventCardLarge
            showBuyTicketForm={showBuyTicketForm}
            handleBuyButtonClick={handleBuyButtonClick}
          />
        </article>
      )}
      {showBuyTicketForm && (
        <section>
          <BuyTicketForm
            showBuyTicketForm={showBuyTicketForm}
            setShowBuyTicketForm={setShowBuyTicketForm}
          />
        </section>
      )}
    </main>
  );
};

export default EventPage;

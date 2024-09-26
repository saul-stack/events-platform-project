import React, { useState } from "react";

import BuyTicketForm from "../EventPage/BuyTicketForm";
import EventCardLarge from "../EventPage/EventCardLarge";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const EventPage = () => {
  const location = useLocation();
  const { showBuyForm } = location.state || {};

  const [showBuyTicketForm, setShowBuyTicketForm] = useState(false);

  useEffect(() => {
    if (showBuyForm) {
      setShowBuyTicketForm(true);
    }
  }, [showBuyForm]);

  const handleBuyButtonClick = () => {
    setShowBuyTicketForm(!showBuyTicketForm);
  };

  return (
    <div className="main-content">
      <EventCardLarge
        showBuyTicketForm={showBuyTicketForm}
        handleBuyButtonClick={handleBuyButtonClick}
      />
      {showBuyTicketForm && (
        <BuyTicketForm
          showBuyTicketForm={showBuyTicketForm}
          setShowBuyTicketForm={setShowBuyTicketForm}
        />
      )}
    </div>
  );
};

export default EventPage;

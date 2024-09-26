const BuyTicketForm = ({ setShowBuyTicketForm, showBuyTicketForm }) => {
  const handleBackButtonClick = () => {
    setShowBuyTicketForm(!showBuyTicketForm);
  };

  return (
    <div id="buy-ticket-form">
      <button onClick={handleBackButtonClick}>Go back</button>
      <h1>Buy tickets</h1>
    </div>
  );
};

export default BuyTicketForm;

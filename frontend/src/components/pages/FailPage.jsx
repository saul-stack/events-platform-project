import { useNavigate } from "react-router-dom";
const FailPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/account");
  };
  return (
    <div className="main-content">
      <h1>Payment Failure</h1>
      <p>Your payment was unsuccessful</p>
      <button onClick={handleClick}>My Tickets</button>
    </div>
  );
};

export default FailPage;

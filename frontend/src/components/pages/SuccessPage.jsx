import { useNavigate } from "react-router-dom";
const SuccessPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/account");
  };
  return (
    <div className="main-content">
      <h1>Success</h1>
      <p>Your payment was successful</p>
      <button onClick={handleClick}>My Tickets</button>
    </div>
  );
};

export default SuccessPage;

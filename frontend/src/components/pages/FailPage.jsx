import { useLocation, useNavigate } from "react-router-dom";

const FailPage = () => {
  const location = useLocation();
  const errorMessage = location.state.errorMessage;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/account");
  };
  return (
    <div className="main-content">
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <p>Please try again later.</p>
      <button onClick={handleClick}>My Tickets</button>
    </div>
  );
};

export default FailPage;

import { useNavigate } from "react-router-dom";
const FailPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/account");
  };
  return (
    <div className="main-content">
      <h1>Failure</h1>
      <p>Your payment was not successful</p>
      <button onClick={handleNavigate}>My Events</button>
    </div>
  );
};

export default FailPage;

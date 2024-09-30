import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { bookEvent } from "../../../api-functions";
import { UserContext } from "../../contexts/UserContext";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useContext(UserContext);
  console.log(user);

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const eventId = queryParams.get("eventId");

    if (eventId) {
      const newUser = {
        ...user,
        events_booked: [...user.events_booked, Number(eventId)],
      };
      updateUser(newUser);

      console.log(user.id, eventId);
      bookEvent(user.id, Number(eventId));
    }
    navigate("/account");
  }, [location.search, user, navigate]);

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

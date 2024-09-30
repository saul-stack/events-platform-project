import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { bookEvent } from "../../../api-functions";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useContext(UserContext);

  console.log(location);

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const eventId = queryParams.get("eventId");
    console.log(eventId);

    if (eventId) {
      const newUser = {
        ...user,
        events_booked: [...user.events_booked, Number(eventId)],
      };
      updateUser(newUser);

      console.log(user.id, eventId);
      bookEvent(user.id, Number(eventId));
      console.log(newUser);
      navigate("/account");
    }
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

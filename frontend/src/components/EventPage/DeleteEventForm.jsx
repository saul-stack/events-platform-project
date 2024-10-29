import { useNavigate, useParams } from "react-router-dom";

import { deleteEventById } from "../../../api-functions";

const DeleteEventForm = ({ setShowDeleteForm }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const handleDeleteEvent = async () => {
    await deleteEventById(eventId);
    navigate("/events");
  };
  const handleBackButtonClick = () => {
    setShowDeleteForm(false);
  };
  return (
    <div id="delete-event-form">
      <p>Are you sure you want to delete this event?</p>
      <button onClick={handleDeleteEvent}>Yes</button>
      <button onClick={handleBackButtonClick}>No</button>
    </div>
  );
};

export default DeleteEventForm;

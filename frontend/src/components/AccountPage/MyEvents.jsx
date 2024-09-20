import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
function MyEvents() {
  const user = useContext(UserContext);
  return (
    <div className="main-content">
      <h1>My Events</h1>
    </div>
  );
}
export default MyEvents;

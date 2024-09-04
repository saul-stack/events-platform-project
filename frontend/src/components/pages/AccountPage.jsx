import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
function AccountPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>AccountPage is here</h1>
      <p>
        Logged in as: <b>{user.name}</b>
      </p>
    </div>
  );
}
export default AccountPage;

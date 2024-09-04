import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
function AccountPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>AccountPage is here</h1>
      <p>
        This page displays user information. If the user is not logged in, this
        page will redirect to login page.
      </p>
      <p>
        Logged in as: <b>{user.name}</b>
      </p>
    </div>
  );
}
export default AccountPage;

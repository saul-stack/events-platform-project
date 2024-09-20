import React, { useState } from "react";

const UserContext = React.createContext({ user: {} });

const UserProvider = ({ children }) => {
  const defaultUser = {
    id: null,
    first_name: null,
    last_name: null,
    user_name: null,
    events_watched: null,
    events_booked: null,
    email: null,
    password: null,
    role: null,
  };

  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

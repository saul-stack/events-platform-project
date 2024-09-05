import React, { useState } from "react";

const UserContext = React.createContext({ user: {} });

const UserProvider = ({ children }) => {
  const defaultUser = {
    name: null,
  };

  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

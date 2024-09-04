import React, { useState } from "react";

const UserContext = React.createContext({ user: {} });

const UserProvider = ({ children }) => {
  const testUser = {
    name: "",
  };

  const [user, setUser] = useState(testUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

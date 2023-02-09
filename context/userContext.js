const { createContext, Children, useState } = require("react");

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, newUser, setNewUser }}>
      {children}
    </UserContext.Provider>
  );
};

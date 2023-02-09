import { UserContext } from "./userContext";

const { createContext, useState, useContext } = require("react");

export const InboxContext = createContext();

export function InboxProvider({ children }) {
  const [inboxId, setInboxId] = useState("");
  const [conversations, setConversations] = useState();
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState("");
  const { user } = useContext(UserContext);
  const handleParticipants = (members) => {
    const notMe = members?.filter((members) => members !== user.data._id);
    if (notMe) {
      setReceiverId(...notMe);
    }
  };

  return (
    <InboxContext.Provider
      value={{
        inboxId,
        setInboxId,
        handleParticipants,
        receiverId,
        setReceiverId,
        messages,
        setMessages,
        conversations,
        setConversations,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}

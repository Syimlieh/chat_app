import { UserContext } from "./userContext";

const { createContext, useState, useContext } = require("react");

export const InboxContext = createContext();

export function InboxProvider({ children }) {
  const [inboxId, setInboxId] = useState("");
  const [conversations, setConversations] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState("");
  const { user } = useContext(UserContext);
  const [chatType, setChatType] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groupModal, setGroupModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState({});
  const [notification, setNotification] = useState([{
    notificationCount: 0,
    notificationChat: {}
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingInbox, setIsTypingInbox] = useState(null);

  const handleParticipants = (members) => {
    const notMe = members?.filter((member) => member._id !== user.data._id);
    if (notMe) {
      setReceiverId(notMe[0]._id);
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
        setGroupModal,
        chatType,
        setChatType,
        setGroupId,
        groupId,
        groupModal,
        setSelectedChat,
        selectedChat,
        notification,
        setNotification,
        setIsTyping,
        isTyping,
        setIsTypingInbox,
        isTypingInbox,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}

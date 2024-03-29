import { Messages, Conversation, Users, Inbox, Group } from "@/model";
import dbConnect from "@/lib/dbConnect";
dbConnect();

const fetchConvo = async (id, socket, sendUserSocket, groupId) => {
  try {
    const user = await Users.findOne({ _id: id });
    if (!user) return socket.emit("error", { error: "user not found" });
    // Find all the conversations that the user is a participant in
    const conversations = await Conversation.find({
      participants: user._id,
    })
      .populate("inboxId")
      .populate("participants", "_id userName email")
      .populate("groups", "groupName");

    if (conversations?.length <= 0) {
      return socket.emit("inboxFetched", {
        success: true,
        message: "No conversation Yet, Please start a new conversation",
      });
    }

    //get The other member from participants
    const otherParticipants = conversations.map((conversation) => {
      const other = conversation.participants.filter((participant) => {
        return participant._id.toString() !== user._id.toString();
      });
      return { ...conversation.toObject(), other };
    });
    // Get the inboxIds for all the conversations
    const inboxIds = conversations.map((conversation) => conversation.inboxId);

    // Find all the inboxes with the given inboxIds
    const inboxes = await Inbox.find({
      _id: { $in: inboxIds },
    }).populate("senderId", "_id email userName");
    if (!inboxes) {
      return socket.emit("inboxFetched", {
        success: true,
        message: "Inbox empty, Please start a new Conversatio",
      });
    }

    socket.emit("inboxFetched", {
      success: true,
      message: "Fetching inbox Successfully",
      data: otherParticipants,
    });
    
  } catch (error) {
    socket.emit("error", {
      success: false,
      message: "Failed to fetch inbox",
    });
  }
};

const createdMessage = async (msg, socket, sendUserSocket) => {
  try {
    const { senderId, receiverId, messageText, type, groupId } = msg;
    // Check if sender exists
    const sender = await Users.findById(senderId);
    if (!sender) return socket.emit("error", { error: "Sender not found" });

    let conversation;
    let inbox;
    if (type === "group") {
      console.log("inside group")
      conversation = await Conversation.findOne({
        groups: groupId,
        type,
      });
      const group = await Group.findOne({ _id: groupId });
      if (!group) return socket.emit("error", { error: "Group not found" });
    } else {
      // Check if receiver exists
      const receiver = await Users.findById(receiverId);
      if (!receiver) return socket.emit("error", { error: "Receiver not found" });
      // Create a new conversation or retrieve existing one
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = await new Conversation({
          participants: [senderId, receiverId],
          type: "personal",
        }).save();
        inbox = await new Inbox({
          senderId,
          lastMessage: messageText,
        }).save();
        conversation.inboxId = inbox._id;
        await conversation.save();
      }
    }
    // Create a new inbox or retrieve existing one
    inbox = await Inbox.findOne({
      _id: conversation.inboxId,
    });

    inbox.lastMessage = messageText;
    inbox.seen = false;
    await inbox.save();

    // Save the new message
    await new Messages({
      senderId,
      inboxId: inbox._id,
      messageText,
      meta: msg?.meta ? msg.meta : null,
    }).save();
    
    const messages = await Messages.find({ inboxId: inbox._id })
      .sort({
        createdAt: 1,
      })
      .populate("senderId", "_id email userName");
    fetchConvo(senderId, socket, sendUserSocket, groupId);
    socket.to(sendUserSocket).emit("fetchLastMessage", {
      success: true,
      message: "Last Message Fetch Successfully",
      data: inbox,
    });
    socket.to(groupId).emit("fetchLastMessage", {
      success: true,
      message: "Last Message Fetch Successfully",
      data: inbox,
    });
    socket.to(sendUserSocket).emit("messages", {
      success: true,
      message: "Messages Fetch Successfully",
      data: messages,
    });
    socket.to(groupId).emit("messages", {
      success: true,
      message: "Messages Fetch Successfully",
      data: messages,
    });
    socket.emit("messages", {
      success: true,
      message: "Message sent successfully",
      data: messages,
    });
  } catch (error) {
    socket.emit("error", {
      success: false,
      message: "Failed to send message",
      data: error.message,
    });
  }
};


export { createdMessage, fetchConvo };

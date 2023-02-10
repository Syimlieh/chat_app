import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";
import { Messages, Conversation, Users, Inbox } from "@/model";
import messageHandler from "@/utils/socket/messagehandler";
import { Server } from "socket.io";

const handler = nc(onError);
dbConnect;
async function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    res.end();
    return;
  }
  //if not already initialized
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    console.log("server connected");
    const createdMessage = async (msg) => {
      const { senderId, receiverId, messageText } = msg;

      // Check if sender exists
      const sender = await Users.findById(senderId);
      if (!sender) return io.emit("error", { error: "Sender not found" });

      // Check if receiver exists
      const receiver = await Users.findById(receiverId);
      if (!receiver) return io.emit("error", { error: "Receiver not found" });

      // Create a new conversation or retrieve existing one
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      // socket.broadcast.emit("newIncomingMessage", msg);

      let inbox;
      if (!conversation) {
        conversation = await new Conversation({
          participants: [senderId, receiverId],
          type: "personal",
        }).save();
        inbox = await new Inbox({
          senderId,
          receiverId,
          lastMessage: messageText,
        }).save();
        conversation.inboxId = inbox._id;
        await conversation.save();
      }
      // Create a new inbox or retrieve existing one
      inbox = await Inbox.findOne({
        _id: conversation.inboxId,
      });

      inbox.lastMessage = messageText;
      inbox.seen = false;
      await inbox.save();

      // Update the conversation with the inboxId

      // Save the new message
      await new Messages({
        senderId,
        receiverId,
        inboxId: inbox._id,
        messageText,
        meta: msg?.meta ? msg.meta : null,
      }).save();
      const messages = await Messages.find({ inboxId: inbox._id });
      console.log({ messages });
      socket.emit("messages", {
        success: true,
        message: "Message sent successfully",
        data: messages,
      });
    };

    socket.on("sendMessage", createdMessage);
  };
  //on connection socket
  io.on("connection", onConnection);
  res.end();
}

// io.on("connection", (socket) => {
//   console.log("User connected: ", socket.id);
//   socket.on("sendMessage", async (data) => {
//     await dbConnect();
//     const { senderId, receiverId, messageText, meta } = req.body;

//     // Check if sender exists
//     const sender = await Users.findById(senderId);
//     if (!sender) return io.emit("error", { error: "Sender not found" });

//     // Check if receiver exists
//     const receiver = await Users.findById(receiverId);
//     if (!receiver) return io.emit("error", { error: "Receiver not found" });

//     // Create a new conversation or retrieve existing one
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     let inbox;
//     if (!conversation) {
//       conversation = await new Conversation({
//         participants: [senderId, receiverId],
//         type: "personal",
//       }).save();
//       inbox = await new Inbox({
//         senderId,
//         receiverId,
//         lastMessage: messageText,
//       }).save();
//       conversation.inboxId = inbox._id;
//       await conversation.save();
//     }
//     // Create a new inbox or retrieve existing one
//     inbox = await Inbox.findOne({
//       _id: conversation.inboxId,
//     });

//     inbox.lastMessage = messageText;
//     inbox.seen = false;
//     await inbox.save();

//     // Update the conversation with the inboxId

//     // Save the new message
//     await new Messages({
//       senderId,
//       receiverId,
//       inboxId: inbox._id,
//       messageText,
//       meta,
//     }).save();
//     socket.emit("messageSent", {
//       success: true,
//       message: "Message sent successfully",
//       data: inbox,
//     });
//   });
// });

export default SocketHandler;

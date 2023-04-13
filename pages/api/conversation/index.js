import dbConnect from "@/lib/dbConnect";
import { Messages, Conversation, Users, Inbox } from "@/model";
import { createdMessage } from "@/services/conversation.service";
import SocketHandler from "../socket";

async function ConversationHandler(req, res) {
  // SocketHandler(req, res); // Call the original SocketHandler function

  let io;
  if (res.socket.server.io) {
    console.log('Socket is already running conversation');
    io = res.socket.server.io;
  } else {
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  io.on("connection", (socket) => {
    console.log("Client connected from conversation", socket.id);
  
    socket.on("sendMessage", (msg) => {
      createdMessage(msg, socket);
    });
  
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  res.end();
}

export default ConversationHandler;


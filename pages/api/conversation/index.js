import { createdMessage } from "@/services/conversation.service";
import { initSocketIO }  from '@/lib/socket';

async function ConversationHandler(req, res) {
  try {
  let io;
  if(!res.socket.server.io) {
    io = initSocketIO(res.socket.server);
  } else {
    io = res.socket.server.io;
  }
  console.log("socket for send message", io?.id)
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
  } catch (error) {
    console.log("error found in send message ----> ", error.message)
    res.end();
  }
  
}

export default ConversationHandler;


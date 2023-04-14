import { createdMessage } from "@/services/conversation.service";
import { initSocketIO }  from '@/lib/socket';

async function ConversationHandler(req, res) {
  const io = initSocketIO(res.socket.server);

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


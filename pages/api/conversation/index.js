import { createdMessage } from "@/services/conversation.service";
import { initSocketIO }  from '@/lib/socket';

const SocketHandler = async (req, res) => {
  try {
  let io;
  if(!res.socket.server.io) {
    io = initSocketIO(res.socket.server);
  } else {
    io = res.socket.server.io;
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
  } catch (error) {
    
  }
  
}

export default SocketHandler;


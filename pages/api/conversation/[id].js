import { fetchConvo } from "@/services/conversation.service";
import { Server } from "socket.io";

const SocketHandler = async (req, res) => {
  let io;
  if (res.socket.server.io) {
    console.log('Socket is already running conversation');
    io = res.socket.server.io;
  } else {
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  io.on("connection", (socket) => {
    console.log("conversation inbox", socket.id);
  
    const { id } = req.query;
    socket.on("fetchConvo", () => {
      fetchConvo(id, socket)
    });
  
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  res.end();
};

export default SocketHandler;

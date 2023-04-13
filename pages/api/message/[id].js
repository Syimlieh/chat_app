import { fetchMessages } from "@/services/message.service";
import { Server } from "socket.io";

const SocketHandler = async (req, res) => {
  let io;
  if (res.socket.server.io) {
    console.log("socket running in messages");
    io = res.socket.server.io;
  } else {
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  io.on("connection", (socket) => {
    console.log("messge connection", socket.id);
    socket.on("fetchMessages", (id) => {
      fetchMessages(id, socket);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });

  res.end();
};

export default SocketHandler;

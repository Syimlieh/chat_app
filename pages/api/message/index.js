import { fetchMessages } from "@/services/message.service";
import { initSocketIO } from "@/lib/socket";
import { Server } from "socket.io";

const SocketHandler = async (req, res) => {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  const onlineUser = new Map();
  io.on("connection", (socket) => {
    socket.on("addUser", (id) => {
      onlineUser.set(id, socket.id);
    });
    socket.on("fetchMessages", (data) => {
      const { inboxId, currentUser } = data;
      const sendUserSocket = onlineUser.get(currentUser);
      fetchMessages(inboxId, socket, sendUserSocket);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket?.id}`);
    });
  });
  res.end();
};

export default SocketHandler;

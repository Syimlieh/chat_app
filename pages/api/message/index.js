import { fetchMessages } from "@/services/message.service";
import { initSocketIO } from "@/lib/socket";

const SocketHandler = async (req, res) => {
  try {
    let io;
    if (!res.socket.server.io) {
      io = initSocketIO(res.socket.server);
    } else {
      io = res.socket.server.io;
    }
    console.log("fetch message got called", io?.id)
    io.on("connection", (socket) => {
      console.log("connected for message")
      socket.on("fetchMessages", (data) => {
        console.log("Fetching messages event")
        const { inboxId, currentUser } = data;
        fetchMessages(inboxId, socket);
      });

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket?.id}`);
      });
    });
    res.end();
  } catch (error) {
    console.log("error found in send message ----> ", error.message);
    res.end();
  }
};

export default SocketHandler;

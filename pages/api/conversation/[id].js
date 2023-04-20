import { fetchConvo } from "@/services/conversation.service";
import { initSocketIO } from "@/lib/socket";

const SocketHandler = async (req, res) => {
  try {
    let io;
    if (!res.socket.server.io) {
      io = initSocketIO(res.socket.server);
    } else {
      io = res.socket.server.io;
    }

    io.on("connection", (socket) => {

      socket.on("fetchConvo", (id) => {
        fetchConvo(id, socket);
      });

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    res.end();
  } catch (error) {
    console.log("error found in send message ----> ", error.message);
    res.end();
  }
};

export default SocketHandler;

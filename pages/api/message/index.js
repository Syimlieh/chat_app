import { fetchMessages } from "@/services/message.service";
import { initSocketIO } from "@/lib/socket";
import onlineUsers from "@/onlineUsers";

const SocketHandler = async (req, res) => {
  try {
    let io;
    if (!res.socket.server.io) {
      io = initSocketIO(res.socket.server);
    } else {
      io = res.socket.server.io;
    }
    console.log("fetch message called")
    io.on("connection", (socket) => {
      socket.on("addUser", (id) => {
        console.log({id})
        onlineUsers[id] = socket.id;
      });
      
      socket.on("fetchMessages", (data) => {
        console.log("fetch message called connected")
        const { inboxId, currentUser } = data;
        console.log({currentUser});
        
        console.log({onlineUsers});
        fetchMessages(inboxId, socket);
      });

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket?.id}`);
        Object.keys(onlineUsers).forEach(key => {
          if (onlineUsers[key] === socket.id) {
            delete onlineUsers[key];
          }
        });
      });
    });
    res.end();
  } catch (error) {
    console.log("error found in send message ----> ", error.message);
    res.end();
  }
};

export default SocketHandler;

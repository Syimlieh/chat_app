import { createdMessage } from "@/services/conversation.service";
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

    console.log("called send Messagssssssse");
    
    io.on("connection", (socket) => {
      socket.on("addUser", (id) => {
        onlineUsers[id] = socket.id;
      });

      socket.on("sendMessage", (msg) => {
        const sendUserSocket = onlineUsers[msg.receiverId];
        createdMessage(msg, socket, sendUserSocket);
        socket.off("sendMessage", () => {
          console.log("socket sendMessage removed")
        });
      });
      

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        Object.keys(onlineUsers).forEach((key) => {
          if (onlineUsers[key] === socket.id) {
            delete onlineUsers[key];
          }
        });
      });
    });
    console.log("send response")
    res.end();
  } catch (error) {
    console.log("error send message ---------> ", error.message);
  }
};

export default SocketHandler;

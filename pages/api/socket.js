import { Server } from "socket.io";
import { createdMessage, fetchConvo } from "@/services/conversation.service";
import { fetchMessages } from "@/services/message.service";
import onlineUsers from "@/onlineUsers";
import { Group } from "@/model";

const SocketHandler = async (req, res) => {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on("fetchConvo", (id) => {
          fetchConvo(id, socket);
        });
        socket.on("fetchMessages", (data) => {
          const { inboxId } = data;
          fetchMessages(inboxId, socket);
        });
        socket.on("addUser", async (id) => {
          onlineUsers[id] = socket.id;
          console.log("add user", id, onlineUsers);
          // join group
            const groups = await Group.find({ members: {$elemMatch: { memberId: id } } });
            groups.forEach(group => {
              socket.join(String(group._id));
              console.log(`User with ID ${id} joined room ${group._id}`);
          });
        });

        socket.on("sendMessage", (msg) => {
          const sendUserSocket = onlineUsers[msg.receiverId];
          createdMessage(msg, socket, sendUserSocket);
        });

        socket.on("disconnect", () => {
          console.log(`Socket disconnected: ${socket.id}`);
          Object.keys(onlineUsers).forEach((key) => {
            if (onlineUsers[key] === socket.id) {
              delete onlineUsers[key];
            }
          });
        });
      });
    }
    res.end();
  } catch (error) {
    console.log("SocketHandler error:", error.message);
    res.end();
  }
};

export default SocketHandler;

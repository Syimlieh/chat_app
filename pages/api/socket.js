// import messageHandler from "@/utils/socket/messagehandler";
// import { Server } from "socket.io";

// export default function SocketHandler(req, res) {
//   // It means that socket server was already initialised
//   if (res.socket.server.io) {
//     res.end();
//     return;
//   }

//   const io = new Server(res.socket.server);
//   res.socket.server.io = io;

//   const onConnection = (socket) => {
//     console.log("first connection");
//     const createdMessage = async (msg) => {
//       // Check if sender exists
//       console.log(msg);
//       const sender = await Users.findById(senderId);
//       if (!sender) return io.emit("error", { error: "Sender not found" });
//       socket.broadcast.emit("newIncomingMessage", msg);
//     };

//     socket.on("sendMessage", createdMessage);
//   };

//   io.on("connection", onConnection);

//   res.end();
// }

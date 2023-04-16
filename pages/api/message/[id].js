import { fetchMessages } from "@/services/message.service";
import { initSocketIO }  from '@/lib/socket';
import { Server } from 'socket.io';

const SocketHandler = async (req, res) => {
  const io = new Server()
  console.log(`Socket message: `);
  io.on('connection', (socket) => {
    
    console.log(`Socket connected message: ${socket?.id}`);
    
    socket.on("fetchMessages", (id) => {
      console.log("fetchMessages")
      fetchMessages(id, socket);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket?.id}`);
    });
  });

  res.end();
};

export default SocketHandler;

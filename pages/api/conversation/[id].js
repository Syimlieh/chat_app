import { fetchConvo } from '@/services/conversation.service';
import { initSocketIO }  from '@/lib/socket';
import { fetchMessages } from '@/services/message.service';

const SocketHandler = async (req, res) => {
  const io = initSocketIO(res.socket.server);

  io.on('connection', (socket) => {
    console.log(`Socket connected conversation id: ${socket.id}`);
    
    socket.on('fetchConvo', (id) => {
      console.log("conversation email", id)
      fetchConvo(id, socket);
    });
    
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  res.end();
};

export default SocketHandler;

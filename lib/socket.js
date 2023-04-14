// socket.js
import { Server } from 'socket.io';

let io;

const initSocketIO = (server) => {
  if (!io) {
    io = new Server(server);
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }

  return io;
};

export { initSocketIO };
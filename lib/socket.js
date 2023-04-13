const { Server } = require('socket.io');

let io;
// Initialize socket connection for conversation endpoints

const initializeSocket = (server) => {
  // Socket.IO can attach on same port as HTTP server object, 
  io = new Server(server);
  server.io = io;
  io.on('connection', (socket) => {
    console.log('Socket connected Hurray:', socket.id);

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    console.log("not connected");
    throw new Error('Socket.io has not been initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO  };
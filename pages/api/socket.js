import { createdMessage } from '@/services/conversation.service';
import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  let io = res.socket.server.io;
  if (io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    io = new Server(res.socket.server) // remove the `const` keyword here
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler
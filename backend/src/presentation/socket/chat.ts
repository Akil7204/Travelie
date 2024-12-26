// socket
import { Server as SocketIOServer, Socket } from "socket.io";

export default function socketHandler (io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    socket.on("joinRoom", (chatId: string) => {
      console.log(`User joined room: ${chatId}`);
      socket.join(chatId);
    });

    socket.on("message", (messageData) => {
      console.log(messageData);
      
      console.log(`Message received in room ${messageData.chatId}:`, messageData);
    
      if (!messageData.chatId || !messageData.text) {
        console.error("Invalid message data:", messageData);
        return;
      }
    
      io.to(messageData.chatId).emit("message", messageData);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

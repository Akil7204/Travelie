// socket.ts
import { Server as SocketIOServer, Socket } from "socket.io";

export const socketHandler = (io: SocketIOServer) => {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected");

    // Handle joining a chat room
    socket.on("joinRoom", (chatId: string) => {
      console.log(`User joined room: ${chatId}`);
      socket.join(chatId);
    });

    socket.on("message", (messageData) => {
      console.log(`Message received in room ${messageData.chatId}:`, messageData);
    
      // Check the structure of messageData to ensure it's coming in as expected
      if (!messageData.chatId || !messageData.text) {
        console.error("Invalid message data:", messageData);
        return;
      }
    
      // Emit the message to all users in the room
      io.to(messageData.chatId).emit("message", messageData);
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

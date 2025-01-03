import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment"; // Importing moment
import { getMessages, messageSend } from "@/app/services/chatAPI";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  text: string;
  sender: string;
  time: string;
}

interface Message {
  _id: string;
  text: string;
  companyId: string;
  userId: {
    _id: string;
    username: string;
  };
}

interface ChatBoxProps {
  selectedUser: string;
  chat: Message[];
  senderId: any;
  senderModel: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedUser,
  chat,
  senderId,
  senderModel,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

  useEffect(() => {
    // const socketInstance = io("https://travelie.life");
    const socketInstance = io("https://travelie.onrender.com");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", chat[0]._id);
    }
  }, [chat[0], socket]);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await getMessages(chat[0]?._id, senderId);
        const messagesData = response?.data || [];
        setMessages(messagesData);
      } catch (error) {
        setMessages([]);
        console.error("Failed to fetch chat details:", error);
      }
    };

    fetchChatDetails();
  }, [chat[0]]);

  // Listen for new messages via socket
  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage: Message) => {
        console.log("got it");
        setMessages((prevMessages: any) => [...prevMessages, newMessage]);
        console.log(newMessage);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatId = chat[0]?._id;

    const messageData = {
      chatId: chatId,
      senderId: chat[0]?.companyId,
      senderModel: "Company",
      text: newMessage,
    };

    try {
      await messageSend(messageData);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (timestamp: string) => {
    return moment(timestamp).format('h:mm A'); 
  };

  return (
    <div className="w-3/4 h-full p-4 flex flex-col justify-between bg-white shadow-lg">
      <div className="overflow-y-auto space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {selectedUser}
        </h2>
        <hr className="border-gray-300 mb-4" />

        {messages.map((message: any, index: any) => (
          <div
            key={index}
            className={`flex ${
              message.senderModel !== "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`bg-${
                message.senderModel !== "User"
                  ? "blue-500 text-white"
                  : "gray-200 text-black"
              } p-4 rounded-lg max-w-xs`}
            >
              <p>{message.text}</p>
              <span className="text-xs mt-2 block text-right">
                {formatTime(message.createdAt)} {/* Display formatted time */}
              </span>
            </div>
          </div>
        ))}

        {/* Ref for the last message to scroll into view */}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="border-t p-4 flex items-center">
        <input
          type="text"
          placeholder="Write message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

"use client"
import { getMessages, messageSend, sendMessage } from "@/app/services/chatAPI";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  _id: string;
  text: string;
  senderId: {
    _id: string;
    username: string;
    profileImage?: string;
  };
  senderModel: string; // 'User' or 'Company'
}

interface ChatAreaProps {
  chatId: any;
  senderId: string; // Current user (admin/user) ID
  senderModel: string;
  chat: any;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  chatId,
  senderId,
  senderModel,
  chat,
}) => {
  const [messages, setMessages] = useState<Message[]>([]); // State to hold fetched messages
  const [companyName, setCompanyName] = useState<string | undefined>();
  const [companyProfileImage, setCompanyProfileImage] = useState<
    string | undefined
  >();
  const [newMessage, setNewMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:4000", {
      transports: ["websocket"],
      autoConnect: false,
    });

    socketConnection.connect();
    setSocket(socketConnection);

    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
      }
    };
  }, [senderId]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", chatId._id);
    }
  }, [chatId, socket]);


  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage: Message) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await getMessages(chatId._id);
        const messagesData = response?.data || [];
        // console.log(messagesData);

        setMessages(messagesData); 
        // console.log(chat);
        setCompanyName(chatId.companyId.companyname);
      } catch (error) {
        setMessages([]);
        setCompanyName("");
        console.error("Failed to fetch chat details:", error);
      }
    };

    fetchChatDetails();
    
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatId: chatId._id,
      senderId: senderId,
      senderModel: senderModel,
      text: newMessage,
    };

    try {
      const result = await messageSend(messageData);
      console.log(result);
      
      setNewMessage(""); 
      
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="ml-1/3 flex-grow h-screen mt-0">
      {/* Header with profile info */}
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
        <img
          src={companyProfileImage || "/img/DefaultProfilePicMale.png"}
          alt={`${companyName}'s profile`}
          className="rounded-full bg-gray-300 h-10 w-10"
        />
        <div>
          <p className="font-semibold">{companyName}</p>
          <p className="text-sm text-gray-500">Company</p>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex-grow mb-4 overflow-y-auto h-1/2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderModel === "User" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  msg.senderModel === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No messages yet</p>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type your message"
          className="flex-grow p-2 border rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;

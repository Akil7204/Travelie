import React, { useState } from "react";
import axios from "axios";

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
  chat: Message[]; // Should hold chat messages
  // messages: ChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedUser,
  chat, // Consider renaming this to messages for clarity
  // messages,
  // onNewMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatId = chat[0]?._id; 

    const messageData = {
      chatId: chatId,
      senderId: chat[0]?.companyId, 
      senderModel: "Company",
      text: newMessage,
    };
    console.log({messageData});
    

    try {
      const response = await axios.post("/api/messages", messageData);
      if (response.status === 200) {
        const message: ChatMessage = {
          text: newMessage,
          sender: selectedUser,
          time: new Date().toISOString(),
        };

        // onNewMessage(message);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-3/4 h-full p-4 flex flex-col justify-between bg-white shadow-lg">
      {/* <div className="overflow-y-auto space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">{selectedUser}</h2>
        <hr className="border-gray-300 mb-4" />

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === selectedUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`bg-${message.sender === selectedUser ? "blue-500 text-white" : "gray-200 text-black"} p-4 rounded-lg max-w-xs`}>
              <p>{message.text}</p>
              <span className="text-xs mt-2 block text-right">{message.time}</span>
            </div>
          </div>
        ))}
      </div> */}

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

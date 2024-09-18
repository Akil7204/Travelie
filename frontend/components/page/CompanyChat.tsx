import React from 'react';

interface ChatMessage {
  text: string;
  sender: string;
  time: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  selectedUser: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, selectedUser }) => {
  return (
    <div className="w-3/4 h-full p-4 flex flex-col justify-between bg-white shadow-lg">
      <div className="overflow-y-auto space-y-4">
        {/* Heading for the selected user's chat */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">{selectedUser}</h2>

        {/* Line after the heading */}
        <hr className="border-gray-300 mb-4" />

        {/* Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`bg-${message.sender === 'me' ? 'blue-500 text-white' : 'gray-200 text-black'} p-4 rounded-lg max-w-xs`}>
              <p>{message.text}</p>
              <span className="text-xs mt-2 block text-right">{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input area for writing messages */}
      <div className="border-t p-4 flex items-center">
        <input
          type="text"
          placeholder="Write message"
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button className="p-2 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

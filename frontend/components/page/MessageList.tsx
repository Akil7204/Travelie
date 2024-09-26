import React from 'react';

interface Message {
  _id: string; 
  name: string;
  message: string;
  companyId: {
    companyname: string;
    email: string;
    profileImage?: string; 
  };
  userId: string;
  time: string;
  active: boolean;
}

interface MessageListProps {
  messages: Message[];
  onChatSelect: any ;
}

const defaultProfileImage = '/img/DefaultProfilePicMale.png'; 

const MessageList: React.FC<MessageListProps> = ({ messages, onChatSelect }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-4 h-screen">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <ul>
        {messages.map((msg) => (
          <li
            key={msg._id} 
            className={`flex items-center p-3 mb-2 rounded-lg ${
              msg.active ? 'bg-blue-400' : 'bg-white'
            }`}
            onClick={() => onChatSelect(msg)} 
          >
            {/* Display profile image */}
            <img
              src={msg.companyId.profileImage || defaultProfileImage}
              alt={`${msg.companyId.companyname}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-grow">
              <p
                className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => onChatSelect(msg)}
              >
                {msg.companyId.companyname}
              </p>
              <p className="text-sm text-gray-600">{msg.message}</p>
            </div>
            <span className="text-xs text-gray-400">{msg.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;

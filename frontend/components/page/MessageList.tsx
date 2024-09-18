import React from 'react';

interface Message {
  name: string;
  message: string;
  companyId: {
    companyname: string;
    email: string;
    profileImage?: string; // Optional field in case the profile image is added later
  };
  userId: string;
  time: string;
  active: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const defaultProfileImage = '/img/DefaultProfilePicMale.png'; // Default profile image URL

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Message</h2>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <ul>
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`flex items-center p-3 mb-2 rounded-lg ${
              msg.active ? 'bg-blue-200' : 'bg-white'
            }`}
          >
            {/* Display profile image */}
            <img
              src={msg.companyId.profileImage || defaultProfileImage}
              alt={`${msg.companyId.companyname}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-grow">
              <p className="font-semibold">{msg.companyId.companyname}</p>
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

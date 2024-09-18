import React, { useEffect, useState } from 'react';

interface Message {
  _id: string;
  content: string;
  fromMe: boolean; // Indicates if the message is from the current user
}

interface ChatAreaProps {
  chatId: string; // Chat ID for the current chat
  messages: Message[]; // Array of messages for the chat
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId, messages }) => {
  const [companyName, setCompanyName] = useState<string>(''); // State for the company name
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined); // State for the profile image

  // Fetch company details based on chatId (you can adjust this based on your API)
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      // Simulate an API call to get company details based on chatId
      try {
        const response = await fetch(`/api/company/${chatId}`); // Update with your actual API endpoint
        const data = await response.json();
        setCompanyName(data.companyName); // Set the company name
        setProfileImage(data.profileImage); // Set the profile image
      } catch (error) {
        console.error('Failed to fetch company details:', error);
      }
    };

    fetchCompanyDetails();
  }, [chatId]); // Fetch company details when chatId changes

  return (
    <div className="ml-1/3 flex-grow h-screen mt-0 ">
      {/* Header with profile info */}
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
        <img
          src={profileImage || '/img/DefaultProfilePicMale.png'}
          alt={`${companyName}'s profile`}
          className="rounded-full bg-gray-300 h-10 w-10"
        />
        <div>
          <p className="font-semibold">{companyName}</p>
          <p className="text-sm text-gray-500">Active Now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex-grow mb-4 overflow-y-auto h-1/2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-xs p-2 rounded-lg ${msg.fromMe ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p>{msg.content}</p>
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
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">Send</button>
      </div>
    </div>
  );
};

export default ChatArea;

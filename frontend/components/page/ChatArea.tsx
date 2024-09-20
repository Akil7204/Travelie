import { getMessages, sendMessage } from '@/app/services/chatAPI';
import React, { useEffect, useState } from 'react';

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
  chat: any
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId, senderId, senderModel, chat }) => {
  const [messages, setMessages] = useState<Message[]>([]); // State to hold fetched messages
  const [companyName, setCompanyName] = useState<string | undefined>();
  const [companyProfileImage, setCompanyProfileImage] = useState<string | undefined>();
  const [newMessage, setNewMessage] = useState<string>('');

  // Fetch both chat messages and company details based on chatId
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        
        const response = await getMessages(chatId._id);
        const messagesData = response?.data || [];
        // console.log(messagesData);
        
        setMessages(messagesData); // Set messages in the state
        // console.log(chat);
        setCompanyName(chatId.companyId.companyname)
      } catch (error) {
        setMessages([]);
        setCompanyName("")
        console.error('Failed to fetch chat details:', error);
      }
    };

    fetchChatDetails();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const result = await sendMessage(chatId, senderId, newMessage, senderModel);
      console.log('Message sent:', result);
      
      // Optionally, you can refresh messages here or append the new message
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="ml-1/3 flex-grow h-screen mt-0">
      {/* Header with profile info */}
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
        <img
          src={companyProfileImage || '/img/DefaultProfilePicMale.png'}
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
            <div key={msg._id} className={`flex ${msg.senderModel === 'User' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-xs p-2 rounded-lg ${msg.senderModel === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
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

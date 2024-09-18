import React from 'react';

const MessageList = () => {
  


  const messages = [
    { name: 'Liston Fermi', message: 'Yeah sure, tell me zafor', time: 'just now', active: true },
    { name: 'Kiran Kannan', message: 'Thank you so much, sir', time: '2 d', active: false },
    { name: 'Marvin McKinney', message: 'You\'re Welcome', time: '1 m', active: false },
  ];



  return (
    <div className="w-1/3  bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Message</h2>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className={`flex items-center p-3 mb-2 rounded-lg ${msg.active ? 'bg-blue-200' : 'bg-white'}`}>
            <div className="flex-grow">
              <p className="font-semibold">{msg.name}</p>
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

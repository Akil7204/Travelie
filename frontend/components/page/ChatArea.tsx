import React from 'react';

const ChatArea = () => {
  const messages = [
    { sender: 'Liston Fermi', content: 'Hello and thanks for signing up...', time: 'Today', fromMe: true },
    { sender: 'Zafor', content: 'Hello, Good Evening.', time: 'Time', fromMe: true },
    { sender: 'Zafor', content: 'I only have a small doubt about your lecture.', time: 'Time', fromMe: true },
    { sender: 'Liston Fermi', content: 'Yeah sure, tell me zafor', time: 'just now', fromMe: false }
  ];

  return (
    <div className="flex-grow h-screen p-4 pt-20">
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div>
          <p className="font-semibold">Liston Fermi</p>
          <p className="text-sm text-gray-500">Active Now</p>
        </div>
      </div>
      <div className="bg-white p-4 h-3/4 rounded-lg shadow-lg flex-grow mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`max-w-xs p-2 rounded-lg ${msg.fromMe ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
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

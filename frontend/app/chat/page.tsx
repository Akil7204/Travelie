import ChatArea from '@/components/page/ChatArea';
import MessageList from '@/components/page/MessageList';
import React from 'react';

const MessagePage = () => {
  return (
    <div className="flex h-screen">
      <MessageList />
      <ChatArea />
    </div>
  );
};

export default MessagePage;

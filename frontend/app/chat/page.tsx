"use client";

import Navbar from "@/components/NavBar";
import ChatArea from "@/components/page/ChatArea";
import MessageList from "@/components/page/MessageList";
import Profile from "@/components/profile/Profile";
import React from "react";

const MessagePage = () => {
  return (
    <>
      <Navbar />
      <Profile>
        <div className="flex flex-grow">
          <MessageList />
          <ChatArea />
        </div>
      </Profile>
    </>
  );
};

export default MessagePage;

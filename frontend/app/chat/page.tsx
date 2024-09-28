"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import ChatArea from "@/components/page/ChatArea";
import MessageList from "@/components/page/MessageList";
import Profile from "@/components/profile/Profile";
import { getMessages, userChats } from "../services/chatAPI"; 

interface User {
  _id: string;
}

const MessagePage = () => {
  const [chats, setChats] = useState([]); 
  const [users, setUsers] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); 
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsers(user);
    }
  }, []);

 
  useEffect(() => {
    const getChats = async () => {
      try {
        if (users) {
          const { data } = await userChats(users._id);
          console.log({data});
          setChats(data); 
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };
    if (users) {
      getChats();
    }
  }, [users]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <>
        <Navbar />
        <Profile>
          <div className="flex flex-grow items-center justify-center h-full">
            <p className="text-lg font-semibold">
              You haven't booked any trips yet. Book a trip to start chatting with a company!
            </p>
          </div>
        </Profile>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Profile>
        <div className="flex flex-grow">
          {/* Left side with MessageList */}
          <MessageList 
            messages={chats} 
            onChatSelect={setSelectedChatId} 
          />
          
          {/* Right side with ChatArea */}
          <div className="flex-grow p-4">
            {selectedChatId && users?._id ? (
              <ChatArea chatId={selectedChatId}  senderId={users?._id} senderModel="User" chat={chats} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg font-semibold text-gray-500">
                  Click on any user to start a conversation
                </p>
              </div>
            )}
          </div>
        </div>
      </Profile>
    </>
  );
};

export default MessagePage;

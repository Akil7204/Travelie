"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import ChatArea from "@/components/page/ChatArea";
import MessageList from "@/components/page/MessageList";
import Profile from "@/components/profile/Profile";
import { getMessages, userChats } from "../services/chatAPI"; // Assume getMessages is the function to fetch messages for a chat

interface User {
  _id: string;
}

const MessagePage = () => {
  const [chats, setChats] = useState([]); // Store chats here
  const [users, setUsers] = useState<User | null>(null); // Store user data here
  const [loading, setLoading] = useState(true); // Loading state to handle async operation
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // Store selected chat ID
  const [messages, setMessages] = useState([]); // Store messages for the selected chat

  // Get user data from local storage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsers(user);
    }
  }, []);

  // Fetch user chats when user data is available
  useEffect(() => {
    const getChats = async () => {
      try {
        if (users) {
          const { data } = await userChats(users._id); // Fetch user chats by user ID
          console.log({data});
          
          setChats(data); // Set the fetched chats
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    if (users) {
      getChats();
    }
  }, [users]);


  // While loading, show a loading message or spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user has no chats (hasn't booked any trips), show a prompt message
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

  // If the user has chats, but no chat is selected, show the "click to start conversation" message
  return (
    <>
      <Navbar />
      <Profile>
        <div className="flex flex-grow">
          {/* Left side with MessageList */}
          <MessageList 
            messages={chats} 
            onChatSelect={setSelectedChatId} // Callback to set selected chat ID
          />
          
          {/* Right side with ChatArea or default message */}
          <div className="flex-grow p-4">
            {selectedChatId && users?._id ? (
              // Show ChatArea if a chat is selected
              <ChatArea chatId={selectedChatId}  senderId={users?._id} senderModel="User" chat={chats} />
            ) : (
              // Show default message if no chat is selected
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

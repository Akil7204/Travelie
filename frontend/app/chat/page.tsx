"use client";

import Navbar from "@/components/NavBar";
import ChatArea from "@/components/page/ChatArea";
import MessageList from "@/components/page/MessageList";
import Profile from "@/components/profile/Profile";
import React, { useEffect, useState } from "react";
import { userChats } from "../services/chatAPI";

interface User {
  _id: string,
}

const MessagePage = () => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState<User>();

  useState(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsers(user);
    }
  });

  useEffect(() => {
    const getChats = async () => {
      try {
        if (users) {
          const  {data}  = await userChats(users?._id);
          console.log(data);
          setChats(data)
          
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getChats()
  }, [users]);

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

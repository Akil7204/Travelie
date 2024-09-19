"use client";
import { companyChats } from "@/app/services/chatAPI";
import Layout from "@/components/company/Layout";
import ChatBox from "@/components/page/CompanyChat";
import ChatSidebar from "@/components/page/CompanySidebar";
import { useEffect, useState } from "react";

interface Company {
  _id: string;
}

interface Message {
  _id: string;
  text: string;
  companyId: string;
  userId: {
    _id: string; // Ensure _id is present
    username: string;
  };
  time: string;
}

interface ChatMessage {
  text: string;
  sender: string;
  time: string;
}

const ChatApp = () => {
  const [users, setUsers] = useState<Company | null>(null);
  const [chats, setChats] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const companyData = localStorage.getItem("company");
    if (companyData) {
      const company = JSON.parse(companyData);
      setUsers(company);
    }
  }, []);

  useEffect(() => {
    const getChats = async () => {
      if (users) {
        try {
          const { data } = await companyChats(users._id);
          setChats(data);
        } catch (error: any) {
          console.error(error);
          setError("Failed to load chats.");
        } finally {
          setLoading(false);
        }
      }
    };
    getChats();
  }, [users]);

  const uniqueUsers = Array.from(new Set(chats.map((chat) => chat.userId._id)))
    .map((id) => {
      const chat = chats.find((chat) => chat.userId._id === id);
      return { _id: id, username: chat?.userId.username };
    })
    .filter((user) => user.username);

  const selectedUserId = uniqueUsers.find(
    (user) => user.username === selectedUser
  )?._id;

  const filteredMessages: ChatMessage[] = chats
    .filter((chat) => chat.userId.username === selectedUser)
    .map((chat) => ({
      text: chat.text,
      sender: chat.userId.username,
      time: chat.time,
    }));

    // const handleNewMessage = (message: ChatMessage) => {
    //   const newMessage: Message = { // Create a function to generate a unique ID
    //     companyId: users!._id, // Use the current company ID
    //     text: message.text,
    //     userId: { _id: selectedUserId!, username: message.sender },
    //     time: message.time,
    //   };
    
    //   setChats((prevChats) => [...prevChats, newMessage]);
    // };

  return (
    <Layout>
      <div className="h-screen flex">
        <ChatSidebar
          users={uniqueUsers.map((user) => user.username!)}
          selectedUser={selectedUser || ""}
          setSelectedUser={(username) => {
            const user = uniqueUsers.find((u) => u.username === username);
            setSelectedUser(user?.username || null);
          }}
        />

        {selectedUser && selectedUserId ? (
          <ChatBox
            // messages={filteredMessages}
            selectedUser={selectedUser}
            chat={chats} // Update to correctly pass chat messages
            // onNewMessage={handleNewMessage}
          />
        ) : (
          <div className="w-3/4 h-full p-4">Select a user to view chats.</div>
        )}

        {loading && <div>Loading chats...</div>}
        {error && <div>{error}</div>}
      </div>
    </Layout>
  );
};

export default ChatApp;
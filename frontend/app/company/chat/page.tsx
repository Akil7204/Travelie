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
  text: string;
  sender: string;
  time: string;
}

const ChatApp = () => {
  const [users, setUsers] = useState<Company | null>(null);
  const [chats, setChats] = useState<Message[]>([]); // Define the chat messages array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Fetch user information from local storage
  useEffect(() => {
    const companyData = localStorage.getItem("company");
    if (companyData) {
      const company = JSON.parse(companyData);
      setUsers(company);
    }
  }, []);

  // Fetch chats when users are set
  useEffect(() => {
    const getChats = async () => {
      try {
        if (users) {
          const { data } = await companyChats(users._id);
          setChats(data);
          console.log(data);
          
        }
      } catch (error: any) {
        console.error(error);
        setError("Failed to load chats.");
      } finally {
        setLoading(false);
      }
    };
    if (users) {
      getChats();
    }
  }, [users]);

  return (
    <div>aii</div>
    // <Layout>
    //   <div className="h-screen flex">
    //     {/* Sidebar with users */}
    //     <ChatSidebar
    //       users={users} // Ensure this matches the expected props for ChatSidebar
    //       selectedUser={selectedUser}
    //       setSelectedUser={setSelectedUser}
    //     />

    //     {/* Chatbox showing dynamic messages based on selected user */}
    //     {selectedUser && chats[selectedUser] ? (
    //       <ChatBox messages={chats[selectedUser]} selectedUser={selectedUser} />
    //     ) : (
    //       <div>No chats available.</div>
    //     )}

    //     {loading && <div>Loading chats...</div>}
    //     {error && <div>{error}</div>}
    //   </div>
    // </Layout>
  );
};

export default ChatApp;

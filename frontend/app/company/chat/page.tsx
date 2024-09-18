"use client";
import Layout from "@/components/company/Layout";
import ChatBox from "@/components/page/CompanyChat";
import ChatSidebar from "@/components/page/CompanySidebar";
import { useState } from "react";

const ChatApp = () => {
  // Usernames in the sidebar
  const users = ["Kiran", "Liston Fermi", "Sanooj", "Pranav"];

  // Initial messages (you can load from backend in a real app)
  const initialMessages: any = {
    Kiran: [
      { text: "Hello, Kiran!", sender: "me", time: "6:30 pm" },
      { text: "Hey, how are you?", sender: "other", time: "6:31 pm" },
    ],
    "Liston Fermi": [
      { text: "What is the plan for today?", sender: "me", time: "6:32 pm" },
      { text: "We can discuss at 8 pm.", sender: "other", time: "6:33 pm" },
    ],
    Sanooj: [
      { text: "When is the meeting?", sender: "me", time: "6:34 pm" },
      { text: "It’s tomorrow at 10 am.", sender: "other", time: "6:35 pm" },
    ],
    Pranav: [
      { text: "Have you completed the task?", sender: "me", time: "6:36 pm" },
      {
        text: "Yes, I sent it earlier today.",
        sender: "other",
        time: "6:37 pm",
      },
    ],
  };

  // State to manage the selected user and their chat
  const [selectedUser, setSelectedUser] = useState<string>(users[0]);

  return (
    <Layout>
      <div className="h-screen flex">
        {/* Sidebar with users */}
        <ChatSidebar
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        {/* Chatbox showing dynamic messages based on selected user */}
        <ChatBox
          messages={initialMessages[selectedUser]}
          selectedUser={selectedUser}
        />
      </div>
    </Layout>
  );
};

export default ChatApp;

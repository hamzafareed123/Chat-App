import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import BorderAnimation from "../Components/BorderAnimation.jsx";
import ProfileHeader from "../Components/ProfileHeader.jsx";
import ActiveTabSwitch from "../Components/ActiveTabSwitch.jsx";
import ChatList from "../Components/ChatList.jsx";
import ContactList from "../Components/ContactList.jsx";
import MessageContainer from "../Components/MessageContainer.jsx";
import NoMessageContainer from "../Components/NoMessageContainer.jsx";

const ChatPage = () => {
  const { getAllContacts, getChatPartners, activeTab, selectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
    getChatPartners();
  }, []);

  return (
    <div className="h-screen w-full p-4">
      <BorderAnimation className="h-full">
        <div className="flex h-full bg-slate-900 rounded-2xl overflow-hidden">

          {/* LEFT SIDEBAR */}
          <div className="w-[320px] flex flex-col bg-slate-800/50 backdrop-blur-sm border-r border-slate-700">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto px-1">
              {activeTab === "Chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT CHAT AREA */}
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-md">
            {selectedUser ? (
              <MessageContainer />
            ) : (
              <NoMessageContainer />
            )}
          </div>

        </div>
      </BorderAnimation>
    </div>
  );
};

export default ChatPage;

import React, { useEffect } from "react";
import avatar from "/avatar.png";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import NoMessageContainer from "./NoMessageContainer";
import NoChat from "./NoChat";
import AllChats from "./AllChats";
import InputBox from "./InputBox";
import { useAuthStore } from "../store/useAuthStore";

const MessageContainer = () => {
  const {
    selectedUser,
    setSelectedUser,
    getMessageByUserId,
    messages,
    subscribeToMessage,
    unSucribeFromMessage,
  } = useChatStore();
  const { onLineUser } = useAuthStore();

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessageByUserId(selectedUser._id);
    subscribeToMessage();

    return () => {
      unSucribeFromMessage();
    };
  }, [selectedUser]);

  if (!selectedUser) return null;

  const handleClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-700 bg-slate-800">
        <div
          className={`avatar ${
            onLineUser.includes(selectedUser._id?.toString())
              ? "avatar-online"
              : "avatar-offline"
          }`}
        >
          <img
            src={selectedUser.profilePic || avatar}
            alt="Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
        </div>
        {/*  */}

        <div className="flex flex-col min-w-0">
          <h4 className="font-semibold text-sm sm:text-base truncate text-slate-200">
            {selectedUser.fullName}
          </h4>
          <span className="text-slate-400 text-xs">{`${
            onLineUser.includes(selectedUser._id) ? "Online" : "Offline"
          }`}</span>
        </div>

        <X
          className="flex items-center justify-end ml-auto cursor-pointer"
          onClick={handleClick}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900">
        {/* messages */}

        {messages.length > 0 ? (
          <AllChats messages={messages} />
        ) : (
          <NoChat name={selectedUser.fullName} />
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <InputBox />
      </div>
    </div>
  );
};

export default MessageContainer;

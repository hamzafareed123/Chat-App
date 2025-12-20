import React, { useEffect } from "react";
import avatar from "/avatar.png";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const AllChats = ({ messages, currentUserId }) => {
  const {
    setSelectedUser,
    getChatPartners,
    chats,
    isUserLoading,
    getMessageByUserId,
  } = useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  console.log("All Messages",messages)

  return (
    <div className="flex flex-col space-y-3">
      {messages.map((message) => {
        const isMine = message.senderId === authUser._id;
       

        return (
          <div
            key={message._id}
            className={`chat ${isMine ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header">
              {/* {!isMine && (
                <span className="text-sm text-slate-400">
                  {message.senderName}
                </span>
              )} */}
              <time className="text-xs text-slate-500 ml-2 ">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>

            <div
              className={`chat-bubble ${
                isMine
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-700 text-slate-100"
              } max-w-xs sm:max-w-md wrap-break-words rounded-xs`}
            >
              {message.text}
              {message.image && (
                <img
                  src={message.imageUrl}
                  alt="Sent"
                  className="mt-2 rounded-md max-h-60 object-cover"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllChats;

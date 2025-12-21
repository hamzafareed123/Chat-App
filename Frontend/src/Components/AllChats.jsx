import React, { useEffect, useRef, useState } from "react";
import avatar from "/avatar.png";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const AllChats = ({ messages, currentUserId }) => {
  const {
    setSelectedUser,
    getChatPartners,
    chats,
    isUserLoading,
    getMessageByUserId,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(null);
  const useEndRef = useRef(null);

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  useEffect(() => {
    if (useEndRef.current) {
      useEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log("All Messages", messages);

  return (
    <>
      <div className="flex flex-col space-y-3">
        {messages.map((message) => {
          const isMine = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isMine ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">
                <time className="text-xs text-slate-500 ml-2">
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
                } max-w-xs sm:max-w-md wrap-break-words`}
              >
                {message.text}

                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Sent"
                    className="mt-2 rounded-md max-h-60 object-cover cursor-pointer"
                    onClick={() => setImagePreview(message.imageUrl)}
                  />
                )}
                <div ref={useEndRef} />
              </div>
            </div>
          );
        })}
      </div>
      {imagePreview && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setImagePreview(null)}
        >
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default AllChats;

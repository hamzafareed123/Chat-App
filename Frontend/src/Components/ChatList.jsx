import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import profileImage from "/avatar.png";

const ChatList = () => {
  const { getChatPartners, chats } = useChatStore();

  useEffect(() => {
    getChatPartners();
  }, []);

  return (
    <div className="flex flex-col">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center gap-3 p-3 mb-1 rounded-lg bg-slate-900 hover:bg-slate-700 cursor-pointer"
            >
             <div className='avatar avatar-online'>
               <img src={chat.profilePic || profileImage} alt='Profile'
              className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover'/>
             </div>
              <p className="text-slate-200 font-medium">
                {chat.fullName}
              </p>
            </div>
          ))}
        </div>
  );
};

export default ChatList;

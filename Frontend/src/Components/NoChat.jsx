import React from "react";
import { MessageCircle } from "lucide-react";

const NoChat = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-900 text-slate-200 space-y-4">
      <div className="text-slate-500">
        <MessageCircle className="w-16 h-16 sm:w-15 sm:h-15 mx-auto animate-bounce" />
      </div>
      <h2 className="text-md sm:text-lg font-semibold">
        {name
          ? `Start Conversation with ${name}`
          : "Select a contact to start chatting"}
      </h2>
      <p className="text-sm sm:text-base text-slate-400 max-w-xs">
        Say Hello👋
      </p>
    </div>
  );
};

export default NoChat;

import React from "react";
import { useChatStore } from "../store/useChatStore";
import { MessageCircle } from "lucide-react";

const NoChatFound = () => {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-gray-500">
      <MessageCircle size={48} className="text-gray-400" />

      <p className="text-lg font-semibold text-gray-600">
        No conversations yet
      </p>

      <p className="text-sm">
        Select a contact to start chatting
      </p>

      <button
        onClick={() => setActiveTab("Contacts")}
        className="contact-btn mt-2 px-5 py-2   transition"
      >
        Go to Contacts
      </button>
    </div>
  );
};

export default NoChatFound;

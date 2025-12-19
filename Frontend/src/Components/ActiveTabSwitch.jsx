import React from "react";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex justify-center px-3 py-2">
      <div className="flex bg-slate-700 rounded-lg p-1 w-full max-w-xs">
        {/* Chats */}
        <button
          onClick={() => setActiveTab("Chats")}
          className={`
            flex-1 py-2 text-sm font-medium rounded-md transition cursor-pointer
            ${
              activeTab === "Chats"
                ? "bg-slate-900 text-white"
                : "text-slate-300 hover:text-white"
            }
          `}
        >
          Chats
        </button>

        {/* Contacts */}
        <button
          onClick={() => setActiveTab("Contacts")}
          className={`
            flex-1 py-2 text-sm font-medium rounded-md transition cursor-pointer
            ${
              activeTab === "Contacts"
                ? "bg-slate-900 text-white"
                : "text-slate-300 hover:text-white"
            }
          `}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;

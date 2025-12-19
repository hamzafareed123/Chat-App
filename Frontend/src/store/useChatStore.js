import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  isSound: localStorage.getItem("isSound") === "true",

  toggleSound: () => {
    const newValue = !get().isSound;
    localStorage.setItem("isSound", String(newValue));
    set({ isSound: newValue });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      console.log("Error in fetching chats");
      toast.error(error.response.data);
    } finally {
      set({ isUserLoading: false });
    }
  },
}));

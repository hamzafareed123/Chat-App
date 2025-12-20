import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "Chats",
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
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getChatPartners: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      console.log("Error in fetching chats");
      toast.error(error.response.data);
    } finally {
      set({ isUserLoading: false });
    }
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

getMessageByUserId: async (id) => {
  try {
    set({ isMessageLoading: true });
    const response = await axiosInstance.get(`/message/${id}`);
    set({ messages: response.data });
  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error(error.response?.data || "Failed to load messages");
  } finally {
    set({ isMessageLoading: false });
  }
}

}));

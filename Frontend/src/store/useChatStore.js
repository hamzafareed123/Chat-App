import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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
  },

  send: async (data) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: data.text || "",
      imageUrl: data.image || null,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      const response = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        data
      );

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? response.data : msg
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));

      toast.error(error.response?.data || "Message failed to send");
    }
  },

  subscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage"); // prevent duplicates

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages, isSound } = get();
      const { authUser } = useAuthStore.getState();

      const isCurrentChat =
        (newMessage.senderId === selectedUser?._id &&
          newMessage.receiverId === authUser._id) ||
        (newMessage.senderId === authUser._id &&
          newMessage.receiverId === selectedUser?._id);

      if (!isCurrentChat) return;

      set({ messages: [...messages, newMessage] });

      if (isSound) {
      }
      const audio = new Audio("/Sound/notification.mp3");
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  },

  unSucribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

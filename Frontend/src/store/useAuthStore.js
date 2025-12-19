import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUp: false,
  isLoginIn: false,
  isUploading:false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log("error is:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  Signup: async (data) => {
    try {
      set({ isSignUp: true });
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSignUp: false });
    }
  },

  Login: async (data) => {
    try {
      set({ isLoginIn: true });
      const response = await axiosInstance.post("/auth/signin", data);
      set({ authUser: response.data });
      toast.success("Login Successfully");
    } catch (error) {
      set({ isLoginIn: false });
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoginIn: false });
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout Failed");
    }
  },

  updateProfile: async (data) => {
    set({isUploading:false})
    try {
      set({isUploading:true})
      const response = await axiosInstance.put("/auth/update-profile",{profilePic:data});
      set({ authUser: response.data });
      toast.success("Profile Picture Updated");
    } catch (error) {
      toast.error("Error in Updating Profile Picture");
      set({isUploading:false})
    }finally{
      set({isUploading:false})
    }
  },
}));

import React, { useEffect, useState } from "react";
import profileImage from "/avatar.png";
import { Loader2Icon, LogOutIcon, Volume2Icon, VolumeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import mousesound from "/Sound/mouse-click.mp3";

const ProfileHeader = () => {
  const { authUser, checkAuth, Logout, updateProfile, isUploading } =
    useAuthStore();
  const { isSound, toggleSound } = useChatStore();
  const [showVolume, setShowVolume] = useState(true);
  const [image, setImage] = useState();

  const fileRefrence = useRef();
  const mouseClickSound = new Audio(mousesound);

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const baseImage = reader.result;
      setImage(baseImage);
      await updateProfile(baseImage);
    };
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-slate-700 bg-slate-800">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="avatar avatar-online">
          <button
            onClick={() => fileRefrence.current.click()}
            className="relative group focus:outline-none cursor-pointer"
          >
            <img
              src={image || authUser?.profilePic || profileImage}
              alt="Profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />

            <div
              className="
                    absolute inset-0 rounded-full
                  bg-black/60
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                     "
            >
              {!isUploading ? (
                <span className="text-white text-[10px] sm:text-xs font-medium">
                  Change
                </span>
              ) : (
                <Loader2Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
              )}
            </div>
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileRefrence}
            onChange={handleImage}
            className="hidden"
          />
        </div>

        <div className="flex flex-col leading-tight min-w-0">
          <h4 className="font-medium text-sm sm:text-base truncate text-slate-200">
            {authUser.fullName}
          </h4>
          <span className="text-slate-400 text-xs sm:text-sm">Online</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
        <button
          className="relative group"
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound
              .play()
              .catch((error) => console.log("error in playing sound"));
            toggleSound();
          }}
        >
          {!isSound ? (
            <Volume2Icon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-white" />
          ) : (
            <VolumeOff className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-white" />
          )}

          <span
            className="absolute -top-7 left-1/2 -translate-x-1/2
                     text-xs bg-black text-white px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100 transition"
          >
            {!isSound ? <p>Off</p> : <p>On</p>}
          </span>
        </button>

        <div className="relative group">
          <LogOutIcon
            onClick={Logout}
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-red-400"
          />

          <span
            className="absolute -top-7 left-1/2 -translate-x-1/2
                     text-xs bg-black text-white px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100 transition"
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

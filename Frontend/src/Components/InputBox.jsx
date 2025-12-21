import React, { useRef, useState } from "react";
import { SendHorizonal, Image, X } from "lucide-react";
import useKeyboardSound from "../hooks.jsx/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";

const InputBox = ({ onSend }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);
  const { playRandomSound } = useKeyboardSound();
  const { messages, send,isSound } = useChatStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  const handleSend = () => {
    if (!text.trim() && !image) return;
    if(isSound) playRandomSound();

    onSend?.({ text, image });

    const payload = { text, image };
    send(payload);
    setText("");
    setImage(null);
  };

  return (
    <div className="bg-slate-800 p-3">
      {image && (
        <div className="relative mb-3 w-fit">
          <img
            src={image}
            alt="preview"
            className="max-w-55 max-h-55  rounded-xl object-cover"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute -top-2 -right-2 bg-black/80 text-white rounded-full p-1"
          >
            <X size={14} className="cursor-pointer" />
          </button>
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 input input-bordered bg-slate-900 text-slate-200 outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={() => fileRef.current.click()}
          className="btn btn-ghost rounded-lg text-slate-300"
        >
          <Image />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleImage}
          className="hidden"
        />

        <button onClick={handleSend} className="send-btn px-3">
          <SendHorizonal />
        </button>
      </div>
    </div>
  );
};

export default InputBox;

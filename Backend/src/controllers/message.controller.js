import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.io.js";
import { getReceiverSocketId } from "../lib/socket.io.js";


export const getAllContacts = async (req, res) => {
  try {
    const LoggedID = req.user._id;

    const contacts = await User.find({ _id: { $ne: LoggedID } }).select(
      "-password"
    );

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Serer Error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const myId = req.user._id;
    const { id: senderChatId } = req.params;

    if (!senderChatId)
      return res.status(400).json({ message: "User ID required" });

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: senderChatId },
        { senderId: senderChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("getMessageByUserId error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    let imageUrl;

    if (!image && !text) {
      return res.status(400).json({ message: "Image or text is required" });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot send message to yourself" });
    }

    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      imageUrl,
    });



    const receiverSocketId= getReceiverSocketId(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const LoggedInID = req.user._id;

    const message = await Message.find({
      $or: [{ senderId: LoggedInID }, { receiverId: LoggedInID }],
    });

    const chatPartnerId = [
      ...new Set(
        message.map((msg) => {
          return msg.senderId.toString() === LoggedInID.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString();
        })
      ),
    ];

    const chatPartner = await User.find({ _id: { $in: chatPartnerId } }).select(
      "-password"
    );

    res.status(200).json(chatPartner);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

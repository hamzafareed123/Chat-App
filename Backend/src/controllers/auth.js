import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { sendWelcomEmail } from "../email/emailHandler.js";
import { ENV } from "../lib/env.js";

const router = express.Router();


export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password Length must be greater than 4" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Email Pattern Should be valid " });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ message: "User Already exist with this Email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        sendWelcomEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.log("Error in Sendgin Email", error);
      }
    }
  } catch (error) {
    console.log("Eror in Server", error);
    res.status(500).json({ message: "Error in Server" });
  }
};

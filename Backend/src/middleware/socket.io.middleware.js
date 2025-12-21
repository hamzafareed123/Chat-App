import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Unauthorize No Token Provided"));
    }

    const decode = jwt.verify(token, ENV.JWT_SECRET);
    if (!decode) {
      return next(new Error("Unauthorize Invalid Token"));
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return next(new Error("No User Found"));
    }

    socket.user=user;
    socket.userId=user._id.toString();

    console.log("User connected",user.fullName)

    next()
  } catch (error) {
    return next(new Error("Unauthorize Authentication Failed"))
  }
};


export default socketAuthMiddleware;